import React, { Component } from 'react';
import {Button,} from 'reactstrap';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { thumbedService } from '_services/thumb.services.js';
import { connect } from 'react-redux';
import * as actions from '_reducers/actions.js';

const propTypes = {
	thumbedId: PropTypes.string.isRequired,
	canEdit: PropTypes.boolean,
	width: PropTypes.string,
	height: PropTypes.string,
	emptyImagePath:PropTypes.string,
}

const defaultProps = {
	width: '200',
	height: '210',
	canEdit: false,
}

const mapStateToProps = store => ({
	imagesCaches: store.imagesCaches,
})

const mapDispatchToProps = (disptach) => ({
	addBase64imageToCache: (e) => disptach(actions.addBase64imageToCache(e)),
	clearImagesCache: (e) => disptach(actions.clearImagesCache(e)),
})


/**
 * Displays/updates object thumbnail
 */
class ThumbInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
        	editing: false,
        	preview: null,
        	pictures: [],
        	imageLoaded: false,
        	isValidSrc:true,
        	thumbNail: null,
        }

        this.onDrop = this.onDrop.bind(this);
        this.editThumb = this.editThumb.bind(this);
        this._doCancelEdit = this._doCancelEdit.bind(this);
        this._doSave = this._doSave.bind(this);
        this._doRemove = this._doRemove.bind(this);
        this._doReEdit = this._doReEdit.bind(this);

    }
    setImageLoaded(){
    	this.setState({imageLoaded: true})
    }
    setIsValidSrc(value){
    	this.setState({imageLoaded: value})
    }
    editThumb(e){
    	e.preventDefault();
    	this.setState({
    		editing: true
        })
    }
    async onDrop(e) {
	  if (e.length == 0) {
		  this.setState({preview: null});
      }
	  else {
    	  var file = e[0];
    	  var base64img = await toBase64(file);
          this.setState({preview: base64img});
      }
    }
    componentDidUpdate(prevprops, prevstate){
    	if(this.props.thumbedId !== prevprops.thumbedId){
    		this.loadOrigThumb();
    	}
    }
    async componentDidMount(){
    	this.loadOrigThumb();
    }
    getImageCacheKey(){
    	var imageAdditionalKey = this.props.width + '__' + this.props.height;
    	var thumbedId = this.props.thumbedId;
    	var thumbed_cache_key = thumbedId + '__' + imageAdditionalKey;
    	return thumbed_cache_key;
    }
    async loadOrigThumb(){
		var thumbed_cache_key = this.getImageCacheKey();
		if(this.props.lazy !== true){
			var thumbNail = this.props.imagesCaches[thumbed_cache_key];
			if( thumbNail != null){
				this.setState({
					thumbNail: thumbNail,
					error:false,
					imageLoaded: true
				})
			}
			else {
				if(this.props.thumbedId){
					thumbedService
						.getBase64Thumb(this.props.thumbedId, this.props.width, this.props.height, this.props.containerId)
						.then(response => {
							if(response){
								var payload = {}
								payload.key = thumbed_cache_key;
								payload.image = response;
								this.props.addBase64imageToCache(payload);
								this.setState({
									thumbNail: response,
									error:false,
									imageLoaded: true
								})
							}
							else {
								this.setState({
									imageLoaded:false,
									error:true
								})
							}
						})
					}
				}
		}
		else {
			this.setState({
				imageLoaded:false,
				error:false
			})
		}
    }
    _doRemove(e){
    	if(e) e.preventDefault();

    	thumbedService
    	.deleteThumb(this.props.thumbedId, this.props.containerId)

    	var payload = {}
		payload.key = this.props.thumbedId;
		payload.image = null;
		this.props.addBase64imageToCache(payload);

    	this.setState({
    		preview: null,
    		imageLoaded: true,
    		editing: false,
    		pictures: [],
    		thumbNail: null,
    	})
    }
    _doSave(e){
    	if(e) e.preventDefault();
    	var thumbed = this.state.preview;

    	var formData = {}
    	formData.thumb = thumbed;
    	formData.format = "image/png";

    	thumbedService
    	.setBase64Thumb(this.props.thumbedId, formData, this.props.containerId)
    	.then(response => {
    		var payload = {}
			this.props.clearImagesCache(payload)
    		this.loadOrigThumb();
    	})

    	this.setState({
    		preview: null,
    		editing: false,
    		pictures: [],
    		imageLoaded:true,
    		thumbNail: thumbed
    	})
    }
    _doCancelEdit(e){
    	e.preventDefault()
    	this.setState({
    		preview: null,
    		editing: false,
    		pictures: []
    	})
    }
    _doReEdit(e){
    	e.preventDefault()
    	this.setState({
    		preview: null
    	})
    }
    editingView(){
    	if(this.state.preview !== null){
    		let empty = this.props.emptyImagePath
    		var thumbed = <img src={this.state.preview}
    			width={this.props.width}
    			height={this.props.height}
  				onError={(e)=>{e.target.onerror = null;}}/>

    		return (
				<div className={'thum-editing-view'}>
					{thumbed}
		    		<div className='btn-toolbar'>
							<Button size="sm" className="jsoagger-btn" color="primary" onClick={this._doSave}><i className="fa fa-md fa-save" ></i> SAVE</Button>
							<Button size="sm" className="jsoagger-btn" color="primary" onClick={this._doReEdit}><i className="fa fa-md fa-edit"></i> EDIT</Button>
							<Button size="sm" className="jsoagger-btn" color="danger" onClick={this._doCancelEdit}><i className="fa fa-md fa-undo"></i></Button>
					</div>
				</div>
			)
    	}
    	else {
    		return <div className={'thum-viewing-view'}>
				<ImageUploader
			        withIcon={true}
					withPreview={false}
			        buttonText='Choose image'
			        onChange={this.onDrop}
			        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
			        maxFileSize={15242880}/>

					<div className="btn-toolbar">
							<Button onClick={this._doRemove}><i className="fa fa-md fa-times"></i> REMOVE</Button>
							<Button onClick={this._doCancelEdit}>CANCEL <i className="fa fa-md fa-undo"></i></Button>
					</div>
			</div>
    	}
    }
    view(){
    	var image;
    	var imageLoaded = this.state;
    	var isValidSrc = this.state;

    	var minHeight, minWidth;
    	if(this.props.height){
    		minHeight = this.props.height + 'px';
    	}

    	var editButton;
    	if(this.props.canEdit){
    		editButton = <>
				<Button onClick={this.editThumb}>EDIT <i className="fa fa-md fa-edit"></i></Button>
			</>
    	}

    	var overlayError = this.props.overlayError !== null
    		&& this.props.overlayError !== undefined
    		&& this.state.error === true ? this.props.overlayError() :  ''

    	if(imageLoaded === true){
    		if(this.props.resize == true){
		  		image  = <img
		          className={this.props.imageClassName}
		          src={this.state.thumbNail}
		          width={this.props.width}
		    	  height={this.props.height}
		          onLoad={() => this.setImageLoaded(true)}
		          onError={() => this.setIsValidSrc(false)}/>
	    	}
	    	else {
	    		image = <img src={this.state.thumbNail}
	    			className={this.props.imageClassName}
	    			roundedCircle={this.props.roundedCircle === true}
	    			thumbnail={this.props.thumbnail === true}/>
	    	}
    	}
    	else {
    		//image = <RiImageLine size="8em" color="white"/>

    		var picsum = this.props.imgPicsum ? this.props.imgPicsum : '493';

    		var width = this.props.width ? this.props.width : 1200
    		var height = this.props.height ? this.props.height : 400
    		var url ="https://picsum.photos/id/" + picsum + "/" + width + "/" + height + "/";
    		image = <img
					className={this.props.imageClassName}
    			src={url}/>
    	}

		var final  = <div id="cardimg-wrapper" className="thumb-info">
				{image}
				{overlayError}
			<center>{editButton}</center>
		</div>

    	return final;
    }

    getContent(){
    	if(this.state.editing){
    		return this.editingView();
    	}
    	else {
    		return this.view();
    	}
    }

	render() {
		return (
			<React.Fragment>
			    {this.getContent()}
			</React.Fragment>
		)
	}
}

ThumbInfo.propTypes = propTypes;
ThumbInfo.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (ThumbInfo);

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
