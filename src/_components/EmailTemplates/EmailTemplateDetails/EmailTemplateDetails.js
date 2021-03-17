import React  from 'react';
import {ButtonToolbar} from 'reactstrap';
import { commons } from '_helpers/commons.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	AttributeListGroup,
	PersistenceInfo,
	ContentHolderAction,
	WizardConfirm,
	WaitingPane
} from '_components';
import { enTemplateService } from '_services/entemplates.services.js';
import {contentHolderService} from '_services/contentHolder.services.js'
import * as actions from '_reducers/actions.js';
import Button from 'react-bootstrap/Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import queryString from 'query-string';

const mapStateToProps = store => ({

});
const mapDispatchToProps = (disptach) => ({

})

const propTypes = {
    item: PropTypes.object,
    subviewMode: PropTypes.string
};

const defaultProps = {
    subviewMode: 'editor'
};

/**
 * Email Template details page
 */
class EmailTemplateDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        	loading:true,
        	item: {},
            subviewMode: 'editor',
            editorMode: 'html',
            messageTitle:'',
            errors: [],
            emailTemplateId: this.props.emailTemplateId ? this.props.emailTemplateId :
				this.props.match ? this.props.match.params.id : null,
        };

        this.saveEditorContent = this.saveEditorContent.bind(this);
        this.showSource = this.showSource.bind(this);
        this.showHtml = this.showHtml.bind(this);
				this.onEditorStateChange = this.onEditorStateChange.bind(this);
				this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this);
    }

    showSource(){
     	this.setState({editorMode: 'source'})
    }

    showHtml(){
    	this.setState({editorMode: 'html'})
    }

    saveEditorContent(){
    	this.setState({
    		loading: true
    	})

    	var title = this.state.messageTitle;
    	if(!title || 0 === title.length){
    		this.setState({
    			errors: ['Message title is mandatory! Please provide one.']
    		})
    		return;
    	}

    	var rawcontent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    	var id = this.state.item.data.attributes.id;
    	var file = new Blob([rawcontent], {type: 'text/plain'});
		var formData = new FormData();
		formData.append('file', file);

		contentHolderService
		.setPrimaryContentFile(this.state.emailTemplateId, formData, this.props.containerId)
		.then( response => {
			var form = {};
	    	form.displayName = this.state.item.data.attributes.displayName;
	    	form.messageTitle = this.state.messageTitle;
	    	form.description = this.state.item.data.attributes.description;
	    	form.contentType = this.state.item.data.attributes.contentType;

	    	var id = this.state.item.data.attributes.id;
	    	enTemplateService
	    	.updateTemplate(id, form, this.props.containerId)
	    	.then(res => {
	    		if(res.status === 200){
	    			toast.success('Content updated.')
	    			this.setState({
	    				errors: [],
	    			})

	    			this.loadItem(id, false);
	    		}
	    		else {
		    		if(commons.hasRESTErrorMessages(res)){
		    			this.setState({
		    				errors: commons.getRESTErrorMessages(res),
		    				loading: false
		    			})
		    		}

		    		toast.error('Update template error');
	    			this.loadItem(id, false);
	    		}
	    	})
		})
    }

    onEditorStateChange (editorState) {
	    this.setState({editorState});
	};

	onMessageTitleChange(e) {
		this.setState({messageTitle: e.target.value});
	};

	switchToSubView(subview) {
		this.setState({subviewMode: subview});
	};

    deleteItem(e){
    	e.preventDefault();
    	var id = this.state.emailTemplateId

    	enTemplateService
    	.deleteTemplate(id, this.props.containerId)
    	.then(response => {
    		if(response.status === 200){
    			this.props.history.goBack();
    		}
    		else {
    			if(commons.hasRESTErrorMessages()){
    				var errors = commons.getRESTErrorMessages();
    				this.setState({
    					errors: errors
    				})
    			}
    		}
    	})
    }

    componentDidUpdate(prevprops, prevstate){
				const prevQueryUrlParams = queryString.parse(prevprops.location.search);
				const queryUrlParams = queryString.parse(this.props.location.search);
				let rootId = queryUrlParams.rootId;
				let prevId = prevQueryUrlParams.rootId;
				if(prevId !== rootId && rootId){
					this.loadItem(rootId, false)
				}
    }

    componentDidMount(){
			let rootId = this.getRootObjectForDetailsId()
			this.loadItem(rootId, true);
		}

		getRootObjectForDetailsId(){
			const queryUrlParams = queryString.parse(this.props.location.search);
			let objectforDetailsId = queryUrlParams.rootId;
			return objectforDetailsId
		}

    loadItem(templateId, updateBread){
    	if(templateId){
			enTemplateService
			.getById(templateId, this.props.containerId)
			.then(json => {

				this.setState({
					loading:false,
	                item: json,
	                errors: [],
	                emailTemplateId: templateId,
	                messageTitle: json.data.attributes.messageTitle
	            });
	        })

	        contentHolderService
	        .downloadPrimaryContent(templateId, this.props.containerId)
			.then( response => {
				var blob = new Blob([response], { type: 'text/plain' });
				const reader = new FileReader();

				// This fires after the blob has been read/loaded.
				reader.addEventListener('loadend', (e) => {
				  const text = e.srcElement.result;
				  //console.log(text);

				  //const contentBlock = htmlToDraft(text);
				  const contentBlock = htmlToDraft(text);
				  if(contentBlock){
				  	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      			  	const editorState = EditorState.createWithContent(contentState);
      			  	this.setState({editorState})
				  }

				});

				// Start reading the blob as text.
				reader.readAsText(blob);
			})
    	}
    }
    updateTemplate(formData){
    	this.setState({
			loading: true
		})

    	var form = {};
    	form.displayName = formData.attributes.displayName;
    	form.messageTitle = formData.attributes.messageTitle;
    	form.description = formData.attributes.description;
    	form.contentType = formData.attributes.contentType;

    	var id = this.state.item.data.attributes.id;
    	enTemplateService
    	.updateTemplate(id, form, this.props.containerId)
    	.then(res => {
    		if(commons.hasRESTErrorMessages(res)){
    			this.setState({
    				errors: commons.getRESTErrorMessages(res),
    				loading: false
    			})
    		}
    		else {
    			this.loadItem(id, false);
    		}
    	})
    }
    headerActions(){
    	if(this.state.item && this.state.item.data){
    		var data = this.state.item.data;
    		var deleteButton =	<WizardConfirm
				buttonColor="danger"
				buttonTitle="DELETE"
				onConfirm={() => this.deleteItem()}
				dialogMessage="Do you really want to delete this mail template?"
				dialogTitle="Delete template"/>
			var chActions = <ContentHolderAction
								canUpload={false}
								rawDownload={false}
								contentHolderId={data.attributes.id}/>

			return <ButtonToolbar>
				{this.state.subviewMode === 'editor' &&
					<Button onClick={()=>this.switchToSubView('admin')}>INFOS</Button>
				}
				{this.state.subviewMode === 'admin' &&
					<Button onClick={()=>this.switchToSubView('editor')}>EDITOR</Button>
				}
				{chActions}
				{deleteButton}
			</ButtonToolbar>
    	}

    	return <></>
    }
    userView(){
    	var content;
    	if(this.state.item && this.state.item.data){

    		if(this.state.editorMode === 'source'){
    			var source = this.state.editorState ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) : 'ERROR';
    			content = <div className="btn-toolbar">
    				<div className="html-editor">{source}</div>
    				<Button className="float-left action-button" onClick={e=>this.showHtml()}>HTML VIEW</Button>
    			</div>
    		}

    		else if(this.state.editorMode === 'html'){
	    		const data = this.state.item.data;
	    		const { editorState } = this.state;

	    		content = <>
					<strong className="form-error">{this.state.errors}</strong>

	    			<div className="panel bordered-panel admin-filters ">
						<Form.Control size="md" type="text"
								className="admin-input"
								placeholder="Email object" value={this.state.messageTitle} onChange={this.onMessageTitleChange}/>
					</div>

					<div className="panel bordered-panel html-editor">
						<Editor localization={{ locale: 'fr' }}
							wrapperClassName="html-editor-wrapper"
							editorClassName=""
							onEditorStateChange={this.onEditorStateChange}
							editorState={editorState}/>
					</div>

					<ButtonToolbar className={'footer-btn-toolbar'}>
						<Button onClick={e=>this.saveEditorContent()}>SAVE CONTENT</Button>
						<Button onClick={e=>this.showSource()}>SOURCE VIEW</Button>
					</ButtonToolbar>
	    		</>
	    	}
    	}

    	return content
    }
    adminView(){
    	if(this.state.item && this.state.item.data){
    	 const d = commons.toJSONObject(this.state.item.data);
    	 const summaryAttributesList = {
            onSubmit: (formData) => this.updateTemplate(formData),
            attributes: [
                {name: 'Nom', dataField: 'attributes.displayName'},
                {name: 'Description', dataField: 'attributes.description', type: 'textarea'},
                {name: 'Titre du message', dataField: 'attributes.messageTitle'},
                {name: 'Type du contenu', dataField: 'attributes.contentType'},
                {name: 'Nom interne', dataField: 'attributes.internalName', readOnly: true},
                {name: 'Type', dataField: 'attributes.type', readOnly: true},
            ]
        };

    	return <div>
				<AttributeListGroup {...this.props}
					attributesListConfig={summaryAttributesList}
					canEdit={true}
					standardFooterActions="true"
					data={d}
					displayHeader={true}
					addHeaderMargin='true'/>
				<PersistenceInfo  {...this.props}
					data={d}
					displayHeader={true}
					addHeaderMargin='true'/>
			</div>
		}

		return <></>
    }
	render() {
		var hasDatas = this.state.item && this.state.item.data;
		if(!hasDatas && this.state.loading === true){
			return <WaitingPane />
		}

        if(this.state.item && this.state.item.data) {
            const data = this.state.item.data;

            var view;
            if(this.state.loading === true){
            	view = <WaitingPane />
            }
            else {
            	view = this.state.subviewMode === 'editor' ? this.userView() : this.adminView();
            }

            return (<>
					<div className="admin-details-header">
						<p className="page-title">{data.attributes.displayName}</p>
						{this.headerActions()}
					</div>
					<div>{view}</div>

            </>);
        }
    }
}

EmailTemplateDetails.propTypes = propTypes;
EmailTemplateDetails.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (EmailTemplateDetails);
