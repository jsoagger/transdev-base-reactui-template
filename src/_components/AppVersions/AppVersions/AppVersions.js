import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, AppVersion, WaitingPane } from '_components';
import { installationService } from '_services/installation.services.js';
import { RiFocus3Line } from "react-icons/ri";
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'

/**
 * AppVersion management page
 */
class AppVersions extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],
			metaData: '',
			selectedVersionId: null,
			loading: true
		}

		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	selectId(e, id){
		if(e) e.preventDefault()
		this.props.history.push(coreUri.batchHistoryAdminUri(id))
	}

	/**
	 * Generates href with link to details view
	 */
	LinkTo = (val, item) => {
		var id = item.attributes.id
		return <td>
			<Link className={'table-link'} to='#' onClick={e=>this.selectId(e, id)}>{val}</Link>
		</td>
	}

	componentDidMount(){
		installationService
		.getHistories(this.props.containerId)
        .then(json => {
            return json;
        })
        .then(json => {
        	this.setState({
        		loading: false,
        		items: json.data,
        		metaData: json.metaData
        	})
        })
        .catch(error => {
        	console.error(error);
        	this.setState({
        		loading: false,
        	})
        });
	}

	getRootObjectForDetailsId(){
		const queryUrlParams = queryString.parse(this.props.location.search);
		let objectforDetailsId = queryUrlParams.rootId;
		return objectforDetailsId
	}

	render() {

		if(this.state.loading){
			return <div className="portlet-content">
				<WaitingPane />
			</div>
		}

		let objectforDetailsId = this.getRootObjectForDetailsId()
		if(!objectforDetailsId){
			var headerActions, items = this.state.items;
			const metaData = this.state.metaData;
			const tableConfig = {
				columnsConfig: [
			        {name:'Module', displayComponent: (v, i) => this.LinkTo(v,i), dataField: 'attributes.moduleName', defaultSortOrder: 'asc' },
				    {name:'Version', dataField: 'attributes.moduleVersion'},
				    {name:'Type', dataField: 'attributes.moduleType'},
				    {name:'Installation debut', dataField: 'attributes.installationStartTime', dateFormat: 'DD/MMM/YYYY HH:mm', type: 'date'},
				    {name:'Installation fin', dataField: 'attributes.installationEndTime', dateFormat: 'DD/MMM/YYYY HH:mm', type: 'date'},
				    {name:'Statut', dataField: 'attributes.status'},
				],
			}

			return <>
				<div className={'header-btn-toolbar'}></div>
				<DataTable items={JSON.stringify(items)}
	      					hover={true}
                        	metaData={JSON.stringify(metaData)}
                            tableConfig={tableConfig}
		      				paginate="false"/>
		     </>
	     }

	     	return <AppVersion
									{...this.props}
	     						pushBreadCrumb={this.props.pushBreadCrumb}/>

	}
}

export default AppVersions;


const enIcon = (val) => {
	if(val) return <td  className="dt-center">
			<RiFocus3Line color="#EEEE" size="1.3em"/>
		</td>
	return <td></td>
}
