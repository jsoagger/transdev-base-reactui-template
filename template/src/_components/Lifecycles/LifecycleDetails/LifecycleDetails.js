import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ButtonToolbar} from 'reactstrap';
import { AllIterations } from '_components';
import { lifecycleService } from '_services/lifecycle.services.js';
import { contentHolderService } from '_services/contentHolder.services.js';
import { commons } from '_helpers/commons.js';
import {
	AttributeListGroup,
	WorkInfo,
	PersistenceInfo,
	WorkableAction,
	RevControlledAction,
	WaitingPane,
	RevControlledDetailsHeader
}
from '_components';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-dark.css';
import queryString from 'query-string';

const mapStateToProps = store => ({

});

const mapDispatchToProps = (disptach) => ({

})

class LifecycleDetails extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: true,
			item: {},
			subviewMode: 'details',
			xml: '<PleaseWait>Loading...</PleaseWait>',
			itemId: this.getRootObjectForDetailsId(),
		}

		this.doRefreshListView = this.doRefreshListView.bind(this)
		this.updateMasterDatas = this.updateMasterDatas.bind(this)
		this.loadDatas = this.loadDatas.bind(this)
		this.renderItemActions = this.renderItemActions.bind(this)
		this.saveEditorContent = this.saveEditorContent.bind(this)
		this.setXMLContent = this.setXMLContent.bind(this)
		this.setLoading = this.setLoading.bind(this)
		this.onAllIterationsSelected = this.onAllIterationsSelected.bind(this)
		this.onDetailsSelected = this.onDetailsSelected.bind(this)
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
		this.switchOriginFromToWorkingCopy = this.switchOriginFromToWorkingCopy.bind(this)
	}

	onDetailsSelected(){
		this.setState({subviewMode: 'details'})
	}

	onAllIterationsSelected(){
		this.setState({subviewMode: 'allIterations'})
	}

	onAfterUndoCheckout(response){

	}
	getBreadCrumbLabel(responseJson){
		return responseJson.data.masterAttributes.name;
	}
	componentDidUpdate(prevProps, prevstate){
				const prevQueryUrlParams = queryString.parse(prevProps.location.search);
				const queryUrlParams = queryString.parse(this.props.location.search);
				let rootId = queryUrlParams.rootId;
				let prevId = prevQueryUrlParams.rootId;
				if(prevId !== rootId && rootId){
					this.loadDatas(rootId, false)
				}
	}

	componentDidMount(){
		var itemId = this.getRootObjectForDetailsId();
		this.loadDatas(itemId, false);
	}

	loadDatas(itemId, updateBreadCrumb){

		if(itemId){
			this.setState({loading: true});

			lifecycleService
			.details(itemId, this.props.containerId)
			.then(responseJson => {

				if(updateBreadCrumb === true){
					let location = responseJson.data.masterAttributes.name;
					if(this.props.pushBreadCrumb){
						var item = {'href': '#', title: location}
						this.props.pushBreadCrumb(item)
					}
				}

				this.setState({
					item: responseJson,
					loading: false
				});
	        }).catch(error => {
	        	console.error(error);
	        	this.setState({loading: false});
	        });

	        contentHolderService
			.downloadPrimaryContent(itemId, this.props.containerId)
			.then(blob => {
				this.setState({xml: blob})
			});
		}
	}

	updateMasterDatas(formData){
		lifecycleService
		.updateMasterAttributes(formData.attributes.id, formData, this.props.containerId)
		.then(response => {
			this.loadDatas(this.getRootObjectForDetailsId(), false)
		})
	}
	setLoading(){
		this.setState({loading: true})
	}
	renderItemSummary(data){
		return <RevControlledDetailsHeader
			containerid={this.props.containerId}
			displayName={data.masterAttributes.name}
			description={data.masterAttributes.description}
			lifecycleCurrentState="VALID"
			businessTypeDisplayName="Standard Lifecycle"
			versionInfo={data.attributes.versionInfo}
			iterationInfo={data.attributes.iterationInfo}
			workInfo={data.attributes.workInfo}
			headerActionsProvider={() => this.renderItemActions(data)}
			headerClassName="admin-details-header"
		/>
	}

	doRefreshListView(){
		//this.props.refreshListView('viewDetails')
	}

	switchOriginFromToWorkingCopy(currentItemIdParam){
    	this.props.history.replace('/admin?v=lifecycles&rootId=' + currentItemIdParam)
	}

	renderItemActions(data){
		if(this.state.subviewMode === 'details'){
			return <>
				<WorkableAction
					containerId={this.props.containerId}
					workInfo={data.attributes.workInfo}
					iterationInfo={data.attributes.iterationInfo}
					workableId={data.attributes.id}
					loadDatas={this.switchOriginFromToWorkingCopy}
					refreshListView={this.doRefreshListView}
					originalItemId={this.props.itemId}/>
				<RevControlledAction
					containerId={this.props.containerId}
					loadDatas={this.loadDatas}
					onAllIterationsSelected={() => this.onAllIterationsSelected()}
					revControlledId={data.attributes.id}
					iterationInfo={data.attributes.iterationInfo}
					revControlledId={data.attributes.id}/>
			</>
		}

		return <>
			<Button onClick={this.onDetailsSelected}>
				<i className="fa fa-arrow-left fa-sm"></i>&nbsp;BACK</Button>
		</>
	}
	renderAttributes(){
		const lifecycleStatusAttributesList = {
			    title: 'Summary',
			    icon: 'fa fa-info float-right',
			    onSubmit: (formData) => this.updateMasterDatas(formData),
			    attributes: [
			    	{name: 'Name', dataField: 'masterAttributes.name'},
			        {name: 'Number', dataField: 'masterAttributes.number', readOnly: true},
			        {name: 'Description', dataField: 'masterAttributes.description'},
			        {name: 'Initial state',  dataField: 'attributes.initialState', readOnly: true},
			        {name: 'Terminal state',  dataField: 'attributes.terminalState', readOnly: true},
			    ]
		}
		const data = this.state.item.data;
		const d = commons.toJSONObject(data);
		var canUpload = d.attributes.workInfo.isWorkingCopy === true;
		return <div className={'lifecycle-details'}>
					<div className="bordered-panel">
						<AttributeListGroup
							containerId={this.props.containerId}
							attributesListConfig={lifecycleStatusAttributesList}
							data={d}
							canEdit={canUpload}
							addHeaderMargin="true"
							standardFooterActions={canUpload}
							displayHeader={true}/>
				   </div>

					<div className="bordered-panel">
						<WorkInfo {...this.props} data={d}
							containerId={this.props.containerId}
							displayHeader={true}
							addHeaderMargin='true'
							displayActions='false'/>
					</div>

					<div className="bordered-panel">
						<PersistenceInfo
							{...this.props} data={d}
							containerId={this.props.containerId}
							displayHeader={true}
							addHeaderMargin="true"/>
				   </div>
		</div>
	}
	saveEditorContent(){
    	var rawcontent = this.state.xml;
    	//console.log(rawcontent);

    	var contentHolderId = this.state.item.data.attributes.id;
    	var file = new Blob([rawcontent], {type: 'text/plain'});
		var formData = new FormData();
		formData.append('file', file);

		contentHolderService
		.setPrimaryContentFile(contentHolderId, formData, this.props.containerId)
		.then( response => {

			var errors = [];
			if(commons.hasRESTErrorMessages(response)){
	    		errors.push(commons.getRESTErrorMessages(response));
	    		toast.error('Update template error');
	    		this.setState({
    				errors: errors,
    				loading: false
    			})
	    	}
	    	else {
	    		toast.success('Content updated.')
    				this.setState({
    				errors: [],
    				loading: false,
    			})
	    	}
    	})
    }
    setXMLContent(contentXml){
    	this.setState({
    		xml: contentXml
    	})
    }

	getRootObjectForDetailsId(){
			const queryUrlParams = queryString.parse(this.props.location.search);
			let objectforDetailsId = queryUrlParams.rootId;
			return objectforDetailsId
	}

	render() {

		if(this.state.loading === true){
			return <WaitingPane />
		}

		const data = this.state.item.data;
		if(data){
			var content;
			if(this.state.subviewMode === 'allIterations'){
				content =  <AllIterations
					containerId={this.props.containerId}
					name={data.masterAttributes.name}
					description={data.masterAttributes.description}
					revControlledId={data.attributes.id}/>
			}

			else if(this.state.subviewMode === 'details'){

				const lifecycleStatusAttributesList = {
				    title: 'Summary',
				    icon: 'fa fa-info float-right',
				    onSubmit: (formData) => this.updateMasterDatas(formData),
				    attributes: [
				    	{name: 'Number', dataField: 'masterAttributes.number', readOnly: true},
				    	{name: 'Name', dataField: 'masterAttributes.name'},
				        {name: 'Description', dataField: 'masterAttributes.description'},
				        {name: 'Initial state',  dataField: 'attributes.initialState', readOnly: true},
				        {name: 'Terminal state',  dataField: 'attributes.terminalState', readOnly: true},
				    ]
				};

				const d = commons.toJSONObject(data);
				var canUpload = d.attributes.workInfo.isWorkingCopy === true

				content = <>
					{this.renderAttributes()}

					<div className="bordered-panel">
						<Editor onValueChange={this.setXMLContent}
						        value={this.state.xml}
						        highlight={code => highlight(code, languages.markup, 'markup')}
						        padding={10}
						        style={{
						          fontFamily: '"Fira code", "Fira Mono", monospace',
						          fontSize: 12,
						        }}/>
					</div>

					{ canUpload && <ButtonToolbar>
								<Button onClick={this.saveEditorContent}>SAVE CONTENT</Button>
							</ButtonToolbar>
					}
				</>
			}

			return (<>
					{this.renderItemSummary(data)}
					{content}
			</>);
		}

		return <></>
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (LifecycleDetails);
