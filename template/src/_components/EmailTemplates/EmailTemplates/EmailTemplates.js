import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {Input, ButtonToolbar, ButtonGroup,} from 'reactstrap';
import {AutoScrollDataTable,
	EmailTemplateDetails,
	EmptyPane, WaitingPane,
	DataTable
}
from '_components';
import { connect } from 'react-redux';
import { enTemplateService } from '_services/entemplates.services.js';
import { containerService } from '_services/container.services.js';
import {commons} from '_helpers/commons.js';
import { Form } from 'react-bootstrap'
import {contentHolderService} from '_services/contentHolder.services.js'
import { RiMailLine } from "react-icons/ri";
import Button from 'react-bootstrap/Button'
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'

const mapStateToProps = store => ({
	emailTemplatesNavCriterias: store.applicationConfig.emailTemplatesNavCriterias,
})

const mapDispatchToProps = (disptach) => ({
	updateEmailTemplatesNavCriteriasRX: (e) => disptach(updateEmailTemplatesNavCriterias(e)),
})


/**
 * Generates folder icon
 */
const enIcon = (val) => {
	if(val) return <td  className="dt-center">
		<RiMailLine color="#EEEE" size="1.3em"/>
		</td>
	return <td></td>
}
/**
 * Generates inherited from parent icon
 */
const inheritedIcon = (container) => {
	var currentCont = commons.getWorkingContainerName(this.props.userContext),
	objCont = container.name;

	if(currentCont !== objCont){
			return <td className="dt-center">
			<center><i className='fa fa-lg fa-arrow-circle-o-up'></i></center></td>
		return <td></td>
	}

	return <td></td>
}
/**
 * Email templates page
 */
class EmailTemplates extends Component {

	constructor(props){
		super(props);

		var page = 0, includeParentsItem = false;
		if(this.props.emailTemplatesNavCriterias){
			page = this.props.emailTemplatesNavCriterias.page
		}

		this.state = {
			items: [],
			metaData: '',
			loading: true,
			queryFilters:{
				rowPerPage: 20,
				page: 0,
				includeParentsItem: includeParentsItem,
				name: ''
			},

			viewMode: 'viewList'
		}

		this.goToPage = this.goToPage.bind(this)
		this.loadDatas = this.loadDatas.bind(this)
		this.includeParentsItemCheck = this.includeParentsItemCheck.bind(this)
		this.viewPrimaryContent = this.viewPrimaryContent.bind(this)
		this.switchToView = this.switchToView.bind(this)
		this.refreshView = this.refreshView.bind(this)
	}
	refreshView(){
		this.componentDidMount()
	}
	switchToView(e, name){
		if(e) e.preventDefault()
		this.setState({viewMode: name})
	}
	setNavCriteriasPage(page, name){
		var payload = {};
		payload.page = page;
		payload.name = name;
		this.props.updateEmailTemplatesNavCriteriasRX(payload)
	}
	goToPage(i){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.page = i
		this.setNavCriteriasPage(i, queryFilters.name)
		this.setState({queryFilters: queryFilters})
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
	moreActions = (val,item) => {
			return <td className="dt-center">
				<div className={'btn-toolbar'}>
					<Button onClick={e=>this.selectTemplate(e, item.attributes.id)}>
						<i className={'fa fa-lg fa-angle-right'}></i>
					</Button>
				</div>
			</td>
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.emailTemplatesNavCriterias.name
			&& this.props.emailTemplatesNavCriterias.name.length > 0){
			if(this.props.emailTemplatesNavCriterias.name !== this.state.searchTerm){
				this.setState({searchTerm: this.props.emailTemplatesNavCriterias.name})
			}
		}

		if(prevState.queryFilters !== this.state.queryFilters){
			var queryFilters = {...this.state.queryFilters};
			//this.loadDatas(queryFilters);
		}

		if(prevState.viewMode !== this.props.viewMode){
			this.setState({viewMode: this.props.viewMode})
		}
	}

	componentDidMount(){
		this.setNavCriteriasPage(0, '');
		var queryFilters = {...this.state.queryFilters};
		this.loadDatas(queryFilters)
  }

	getRootObjectForDetailsId(){
			const queryUrlParams = queryString.parse(this.props.location.search);
			let objectforDetailsId = queryUrlParams.rootId;
			return objectforDetailsId
	}

	loadDatas(queryFilters){
		var containerId = this.props.containerId;
		var params = {name: queryFilters.name,
			page: queryFilters.page,
			containerId: containerId,
			pageSize: queryFilters.rowPerPage,
			includeParentItems: false
		};

		this.setNavCriteriasPage(queryFilters.page, queryFilters.name);
		this.setState({loading: true});

		enTemplateService
		.seartTemplateByNameLike(containerId, params)
        .then(json => {
        	this.setState({
        		items: json.data,
        		loading:false,
        		metaData: json.metaData,
        		queryFilters: queryFilters,
        		viewMode: 'viewList'
        	})
        })
        .catch(error => {
        	console.error(error);
        	this.setState({
        		loading:false,
        		viewMode: 'viewList'
        	})
        });
	}
	getAllEnTemplates(){
		var queryFilters = {...this.state.queryFilters}
		containerService
		.getAllEmailTemplates(queryFilters.page, queryFilters.rowPerPage, queryFilters.includeParentsItem, this.props.containerId)
        .then(json => {
        	this.setState({
        		items: json.data,
        		loading:false,
        		metaData: json.metaData,
        		viewMode: 'viewList',
        		searchTerm: queryFilters.name
        	})
        })
        .catch(error => {
        	console.error(error);
        	this.setState({
        		loading:false,
        		viewMode: 'viewList'
        	})
        });
	}

	includeParentsItemCheck(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.includeParentsItem = e.target.checked
		this.setState({
			queryFilters: queryFilters
		})
	}

	tableHeader(){
		return(
			<div>
				{this.commonHeader()}
				<div className={'btn-toolbar'}>
						<ButtonGroup>
							<Button className="jsoagger-btn" onClick={e=>this.switchToView(e, 'synch')}><i className="fa fa-md fa-cloud-upload"></i> Upload</Button>
							<Button className="jsoagger-btn" onClick={e=>this.switchToView(e, 'viewList')}><i className="fa fa-md fa-th-list"></i> Navigate</Button>
							<Button className="jsoagger-btn" onClick={e=>this.refreshView()}><i className="fa fa-md fa-refresh"></i> Refresh</Button>
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
				</div>
		    </div>
		)
	}

	commonHeader(){
		return <h1 className="jsoagger-h1">Email templates</h1>
	}

	getDetailsViewsUrl(id){
		var link
		if(this.props.detailsViewUriProvider){
			link = this.props.detailsViewUriProvider(id)
		}
		else {
			const uri = this.props.location.pathname
			link = uri + '/' + id
		}
		return link
	}

	selectTemplate(e, id){
		if(e) e.preventDefault()
		this.props.history.push(coreUri.mailTemplatesAdminUri(id));
	}

	/**
	 * Generates href with link to details view
	 */
	linkTo = (val, item) => {
		return <td>
				<Link className={'table-link'} onClick={e=>this.selectTemplate(e, item.attributes.id)}>
					{val.displayName}
				</Link>
		</td>
	}

	searchTermUpdated(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.name = e.target.value;
		this.loadDatas(queryFilters)
		this.setState({
			queryFilters: queryFilters,
			loading: true,
			viewMode: 'viewList',
			searchTerm: e.target.value
		})
	}

	render() {
		var items = this.state.items,
        metaData = this.state.metaData,
        content, headerActions;

		var rootObjectForDetailsId = this.getRootObjectForDetailsId()
		if(!rootObjectForDetailsId){
					if(this.state.loading){
							content = <WaitingPane />
					}
					else if(items !== null && items.length > 0) {
			        const tableConfig = {
			        		columnsConfig: [
			        		    {name:'Name', displayComponent: (v, i) => this.linkTo(v,i), dataField: 'attributes', defaultSortOrder: 'asc' },
			        		    {name:'Description', dataField: 'attributes.description' },
			        		    //{name:'Created', dataField: 'attributes.createDate', dateFormat: 'DD/MM/YYYY hh:mm'},
			        		    {name:'Last updated', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD/MM/YYYY hh:mm' },
			        		    { displayComponent: (v, i) => this.moreActions(v, i) },
			        		],
			        };

			        if(this.state.queryFilters.name === null || this.state.queryFilters.name === undefined
			        	|| this.state.queryFilters.name.length < 1){
			        	content =	<AutoScrollDataTable items={JSON.stringify(items)}
		        					tableClassName="data-table"
									pagination={true}
									displayTotalElements={true}
									goToPage={this.goToPage}
									metaData={JSON.stringify(metaData)}
									tableConfig={tableConfig}/>
			        }
			        else {
			        	content =	<DataTable items={JSON.stringify(items)}
		        					tableClassName="data-table"
									pagination={true}
									displayTotalElements={true}
									goToPage={this.goToPage}
									metaData={JSON.stringify(metaData)}
									tableConfig={tableConfig}/>
			        }
	        }
	        else {
	        		content = <EmptyPane hideMainMessage={true}
    											secondaryMessage='No email templates in current container' />
	        }
		}
		else {
			content = <EmailTemplateDetails {...this.props}/>
		}

    return <div className="portlet-box">
        		<div className="portlet-header">
		        		<div className="admin-filters">
						    	<Input type="text"
						    		className="admin-hover-input"
						    		name="search-input"
						    		placeholder="Email template name"
						    		autocomplete="off"
						    		onChange={(e) => this.searchTermUpdated(e)}
						    		defaultValue={this.state.searchTerm}/>
					     </div>
					</div>
			    <div className="portlet-content">
							<div className="main-data-table ">{content}</div>
					</div>
  		</div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (EmailTemplates)

export const updateEmailTemplatesNavCriterias = (payload) => ({
    type: 'APPLICATION_UPDATE_EMAIL_TEMPLATES_NAV_CRITERIAS',
    payload: payload
});
