import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { contentHolderService } from '_services/contentHolder.services.js';
import ContentHolderPrimaryAction  from '_components/ContentHolder/ContentHolderAction/ContentHolderPrimaryAction.js'

const propTypes = {
	contentHolderId: PropTypes.string.isRequired
}

const defaultProps = {
}
/**
 * Displays primary content infos
 */
class ContentHolderPrimaryInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
        	primaryContent: [],
        }
    }
    
    componentDidMount(){
		if(this.props.containerId){
			let contentHolderId = this.props.contentHolderId
			contentHolderService.contentInfos(contentHolderId, 'primary', this.props.containerId)
				.then(ci => {
					this.setState({
						primaryContent: ci ? ci.data : null
					})
				})
		}
    }

    componentDidUpdate(prevProps, prevState){
    	if(this.props.containerId !== prevProps.containerId){
			let contentHolderId = this.props.contentHolderId
			contentHolderService.contentInfos(contentHolderId, 'primary', this.props.containerId)
				.then(ci => {
					this.setState({
						primaryContent: ci ? ci.data : null
					})
				})
		}
	}
    
    /*componentWillReceiveProps(nextProps){
    	let contentHolderId = nextProps.contentHolderId
    	contentHolderService
		.contentInfos(contentHolderId, 'primary', this.props.containerId)
    	.then(ci => {
    		this.setState({
    			primaryContent: ci.data
    		})
    	}).catch(error => {
    		this.setState({
    			primaryContent: null
    		})
        });
    }*/

	render() {
		var header  = "";
		var noContentMessage  = "No content";
		if(this.props.noContentMessage){
			noContentMessage = this.props.noContentMessage;
		}
		
		if(this.props.displayHeader){
			header = (
	    		<React.Fragment>
					<label className="jsoagger-form-title-level-1">Primary content</label>
				</React.Fragment>
		    )
		}

	    if(!this.state.primaryContent || this.state.primaryContent.length === 0) {
			return (
				<React.Fragment>
	    			<div>
	    				{header}
	    				<strong>{noContentMessage}</strong>
	    			</div>
				</React.Fragment>
			)
	    }
	    else {
	    	let item = this.state.primaryContent[0]
	    	if(item && item.attributes){
	    		let displayContentSize = this.props.displayContentSize ? this.props.displayContentSize : false
	    		if(displayContentSize){
	    			return (
							<div className="content-holder-primary-info">
				    			<div>{header}</div>
				    			<table className="fullWidth"  width="100%">
				    				<tr className="fullWidth">
				    					<td width="40%">{item.attributes.contentFormat.mimeType} </td>
				    					<td width="20%">{item.attributes.contentSize} octet(s)</td>
				    					<td width="40%"><ContentHolderPrimaryAction
															containerId={this.props.containerId}
															contentHolderId={this.props.contentHolderId}
															canUpload={this.props.canUpload}/>
				    					</td>
				    				</tr>
				    			</table>
			    			</div>
			    	)
	    		}
	    		else {
	    			var mime = item && item.aatributes && item.attributes.contentFormat ? item.attributes.contentFormat.mimeType : '',
	    			fileName = this.props.contentHolderFileName ? this.props.contentHolderFileName : 'Primary content'
	    			return (
			    			<div className="content-holder-primary-info">
				    			<div>{header}</div>
				    			<table className="fullWidth" width="100%">
				    				<tr className="fullWidth">
				    					<td width="40%">{fileName}</td>
				    					<td width="20%">{mime}</td>
				    					<td width="40%"><ContentHolderPrimaryAction
															containerId={this.props.containerId}
															contentHolderId={this.props.contentHolderId}
															canUpload={this.props.canUpload}/>
				    					</td>
				    				</tr>
				    			</table>
			    			</div>
			    	)
	    		}
	    	}
	    	else {
	    		return (<div><p><strong>No content format</strong></p></div>)
	    	}
	    }
	}
}

ContentHolderPrimaryInfo.propTypes = propTypes;
ContentHolderPrimaryInfo.defaultProps = defaultProps;

export default ContentHolderPrimaryInfo;

