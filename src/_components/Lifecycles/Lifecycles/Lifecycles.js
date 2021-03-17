import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ButtonToolbar, ButtonGroup, Input} from 'reactstrap';
import { DataTable, LifecycleDetails, EmptyPane, WaitingPane } from '_components';
import { containerService } from '_services/container.services.js';
import { connect } from 'react-redux';
import {commons} from '_helpers/commons.js';
import { workableService } from '_services/workable.services.js';
import {contentHolderService} from '_services/contentHolder.services.js'
import { Form } from 'react-bootstrap'
import { RiLock2Line, RiLockUnlockLine } from "react-icons/ri";
import Button from 'react-bootstrap/Button'
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'

const mapStateToProps = store => ({
	lifecycleNavCriterias: store.applicationConfig.lifecycleNavCriterias,
})

const mapDispatchToProps = (disptach) => ({
	updateLifecyclesCriteriasRX: (e) => disptach(updateLifecyclesCriterias(e)),
})

/**
 * Generates inherited from parent icon
 */
const inheritedIcon = (container) => {
	var currentCont = commons.getWorkingContainerName(this.props.userContext),
	objCont = container.name

	if(currentCont !== objCont){
			return <td className="dt-center">
			<center><i className='fa fa-lg fa-arrow-circle-o-up'></i></center></td>
		return <td></td>
	}

	return <td></td>
}
/**
 * Locked or not
 */
const lockedIcon = (val) => {
	if(val !== null && val !== '') return <td className="dt-center"><RiLock2Line color="#EEEE" size="1.3em"/></td>
	else return <td className="dt-center"><RiLockUnlockLine color="#EEEE" size="1.3em"/></td>
}
/**
 * Lifecycles management page
 */
class Lifecycles extends Component {

	constructor(props){
		super(props);

		var page = 0;
		var includeParentsItem = false;

		if(this.props.lifecycleNavCriterias){
			page = this.props.lifecycleNavCriterias.page
			//includeParentsItem = this.props.lifecycleNavCriterias.includeParentsItem
		}

		this.state = {
			loading: true,
			items: [],
			metaData: '',

			queryFilters:{
				rowPerPage: 20,
				page: page,
				includeParentsItem: includeParentsItem,
			},
		}

		this.loadData = this.loadData.bind(this)
		this.goToPage = this.goToPage.bind(this)
		this.edit = this.edit.bind(this)
		this.includeParentsItemCheck = this.includeParentsItemCheck.bind(this)
		this.switchToView = this.switchToView.bind(this)
		this.refreshView = this.refreshView.bind(this)
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	refreshView(viewMode){
		this.loadData(viewMode)
	}

	switchToView(e, name){
		e.preventDefault()
		this.setState({
			viewMode: name
		})
	}

	setNavCriteriasPage(i){
		var payload = {}
		payload.page = i
		payload.includeParentsItem = this.state.includeParentsItem
		this.props.updateLifecyclesCriteriasRX(payload)
	}

	edit(e, lifecycleId){
		e.preventDefault();
		workableService.workingCopy(lifecycleId)
		.then(response => {
			if(response && response.data){
				var wcId = response.data.attributes.id, link;
				if(this.props.detailsViewUriProvider){
					link = this.props.detailsViewUriProvider(wcId);
				}
				else {
					const uri = this.props.location.pathname
					link = uri + wcId
				}

				this.props.history.push(link)
			}
		})
	}

	moreActions = (val) => {
		return (
			<td className="dt-center">
				<div className={'btn-toolbar'}>
					<Button onClick={e => this.selectLifecycle(e, val.id)}>
						<i className={'fa fa-lg fa-angle-right'}></i>
					</Button>
				</div>
			</td>
		)
	}

	/**
	 * Generates context menu
	 */
	editAction = (val) => {
		if(val.workInfo.lockedSince !== null && val.workInfo.lockedSince !== ''){
			return (
					<td className="dt-center">
						<Button onClick={e => this.edit(e, val.id)}><i className="fa fa-edit"></i>&nbsp;EDIT</Button>
					</td>
			)
		}
		return <td></td>
	}

	selectLifecycle(e, id){
		if(e) e.preventDefault()
		this.props.history.push(coreUri.lifecyclesAdminUri(id))
	}

	/**
	 * Generates href with link to details view
	 */
	linkTo = (val, item) => {
		var link = this.url(item.attributes.id)
		return <td>
				<Link className={'table-link'} onClick={e=>this.selectLifecycle(e,item.attributes.id)}>{val.name}</Link>
		</td>
	}

	url(itemId){
		var link = null
		if(this.props.detailsViewUriProvider){
			link = this.props.detailsViewUriProvider(itemId);
		}
		else {
			const uri = this.props.location.pathname
			link = uri + itemId
		}
		return link
	}

	goToPage(i){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.page = i
		this.setNavCriteriasPage(i)
		this.setState({
			queryFilters: queryFilters
		})
	}

	viewPrimaryContent(e, item){
		e.preventDefault()
		contentHolderService
		.downloadPrimaryContent(item.id, this.props.containerId)
		.then( response => {
			var blob = new Blob([response], { type: 'text/plain' });
			var blobUrl = URL.createObjectURL(blob);
			var w = window.open(blobUrl)
		})
	}

	loadData(viewMode){

		let currentViewMode = this.state.viewMode;
		this.setState({
			loading: true,
			viewMode: viewMode ? viewMode : currentViewMode
		})

		var queryFilters = {...this.state.queryFilters}
			containerService
			.getAllLifecycles(this.props.containerId, queryFilters.page, queryFilters.rowPerPage, queryFilters.includeParentsItem)
			.then(json => {
				this.setState({
					items: json && json.data ? json.data : [],
					metaData:  json && json.data ? json.metaData : {},
					loading: false,
					viewMode: viewMode ? viewMode : currentViewMode
				})
			})
			.catch(error => {
				console.error(error);
				this.setState({loading: false,})
			})
	}

	includeParentsItemCheck(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.includeParentsItem = e.target.checked
		this.setState({
			queryFilters: queryFilters
		})
	}

	componentDidUpdate(prevprops, prevState){
		if(prevState.queryFilters !== this.state.queryFilters){
			this.loadData()
		}

		if(prevState.viewMode !== this.props.viewMode){
			this.setState({
				viewMode: this.props.viewMode
			})
		}
	}

	componentDidMount(){
		this.setNavCriteriasPage(0)
		this.loadData()
	}

	commonHeader(){
		return ( <div className="jsoagger-admin-header shadowed-pane">
			<div>
			    <ButtonToolbar  className="justify-content-between">
					<ButtonGroup>
						<Button  onClick={e=>this.switchToView(e, 'synch')}><i className="fa fa-md fa-cloud-upload"></i> Upload</Button>
						<Button  onClick={e=>this.refreshView()}><i className="fa fa-md fa-refresh"></i> Refresh</Button>
						<Button  onClick={e=>this.switchToView(e, 'viewList')}><i className="fa fa-md fa-th-list"></i> Navigate</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Form.Check
			        		type="switch"
			        		id="custom-switch"
			        		checked={this.state.includeParentsItem}
			        		value={this.state.includeParentsItem}
			        		onChange={this.includeParentsItemCheck}
			        		label="Parent items"/>
				   </ButtonGroup>
				</ButtonToolbar>
			</div>
		</div>
	 )
	}

	getRootObjectForDetailsId(){
			const queryUrlParams = queryString.parse(this.props.location.search);
			let objectforDetailsId = queryUrlParams.rootId;
			return objectforDetailsId
	}

	render() {
		var content,headerActions, header = this.commonHeader();

		let objectforDetailsId = this.getRootObjectForDetailsId()
		if(!objectforDetailsId){
				const items = this.state.items;
				const metaData = this.state.metaData;
				const tableConfig = {
						columnsConfig: [
						  { name: 'Name', displayComponent: (v, i) => this.linkTo(v,i), dataField: 'masterAttributes', defaultSortOrder: 'asc' },
						  { name:'Description', dataField: 'masterAttributes.description'},
						    //{ displayComponent: (v) => this.editAction(v), dataField: 'attributes'},
						  { name: 'Version', dataField: 'attributes.iterationInfo.iterationNumber', defaultSortOrder: 'asc' },
						    //{name:'Created', dataField: 'attributes.createDate', dateFormat: 'DD/MMM/YYYY' },
		        		    {name:'Last updated', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD/MMM/YYYY' },
						  { name: 'Content', displayComponent: (e, v) => this.moreActions(e, v.id), dataField: 'attributes'},
						],
				}

				if(items !== null && items.length > 0){
					content = <DataTable items={JSON.stringify(items)}
								tableClassName="data-table"
								goToPage={this.goToPage}
								pagination={true}
								displayTotalElements={true}
								metaData={JSON.stringify(metaData)}
								tableConfig={tableConfig}/>
				}
				else if(this.state.loading === true){
					content = <WaitingPane />
				}
				else {
					content = <EmptyPane hideMainMessage={true}
							secondaryMessage="Current container has no lifecycles" />
				}

			return <div className="portlet-box lifecycles">
					 <div className="portlet-header">
	  					<div className="admin-filters">
					    	<Input type="text"
					    		className="admin-hover-input"
					    		name="input1-group2"
					    		placeholder="Search for lifecycle"
					    		autocomplete="off"
					    		defaultValue={this.state.searchTerm}/>
					    	<div className="">{headerActions}</div>
				       </div>
				     </div>
    			  <div className="portlet-content">{content}</div>
    		</div>
		}

			return <LifecycleDetails
						{...this.props}
  						refreshListView={this.refreshView}
  						pushBreadCrumb={this.props.pushBreadCrumb}/>

	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Lifecycles)

export const updateLifecyclesCriterias = (payload) => ({
    type: 'APPLICATION_UPDATE_LIFECYCLE_NAV_CRITERIAS',
    payload: payload
});
