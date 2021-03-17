import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ButtonToolbar,} from 'reactstrap';
import moment from 'moment'
import {commons} from '_helpers/commons.js';
import { DataTable, DataLoaderHistoryDetails, EmptyPane, WaitingPane } from '_components';
import {batchService} from '_services/batch.services.js'
import { RiFocus3Line } from "react-icons/ri";
import Button from 'react-bootstrap/Button'
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'

/**
 * DataLoader history
 */
class DataLoaderHistory extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: true,
			items: [],
			metaData: '',
			query:{
				page:0,
				pageSize:10,
				sort:''
			},
		}

		this.goToPage = this.goToPage.bind(this);
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	componentDidUpdate(prevProps, prevState){

	}

	componentDidMount(){
		this.refreshView();
	}

	dateTime(val){
		if(val){
			var time = moment(val, 'YYYY-MM-DD hh:mm:ss S').format('DD/MM/YY hh:mm');
			return time;
		}
		return '-';
	}

	getStatusDisplay(status){
		var content = <i className="fa fa-2x fa-warning"></i>
		if(status === 'RUNNING'){
			content = <i className="fa fa-2x fa-spinner fa-spin primary-icon-color"></i>
		}
		else if(status === 'SUCCESS'){
			content = <i className="fa fa-2x fa-check-circle-o green"></i>
		}
		else if(status === 'ERROR'){
			content = <i className="fa fa-2x fa-exclamation-triangle red"></i>
		}
		else if(status === 'CANCELED'){
			content = <i className="fa fa-2x fa-stop red"></i>
		}

		return content
	}

	selectHistory(e, val){
		if(e) e.preventDefault()
		this.props.history.push(coreUri.dataLoadersAdminUri(val.attributes.id))
	}

	cancelJob(e, id){
		if(e) e.preventDefault()
		batchService
		.cancel(id, this.props.containerId)
		.then(response => {
			this.refreshView()
		})
	}
	refreshView() {
		var query = {...this.state.query},
		containerId = this.props.containerId
		batchService
		.getAllJobs(query, containerId)
		.then(json => {
			if(json && json.data){
				this.setState({
					query: query,
					items: json.data,
					metaData: json.metaData,
					loading:false
				})
			}
		})
	}

	goToPage(i){
		var query = {...this.state.query},
		containerId = this.props.containerId;
		query.page = i

		batchService
		.getAllJobs(query, containerId)
		.then(json => {
			this.setState({
				query: query,
				items: json.data,
				metaData: json.metaData
			})
		})
	}

	itemActions(val){
		return <td>
			<div className={'btn-toolbar'}>
				<Button disabled={val.status !== 'RUNNING'} onClick={e=>this.cancelJob(e, val.id)}>
					<i className="fa fa-stop primary"></i></Button>
			</div>
		</td>
	}
	moreActions = (val,item) => {
		return <td className="dt-center">
			<div className={'btn-toolbar'}>
				<Button onClick={e=>this.selectHistory(e,item)}>
					<i className={'fa fa-lg fa-angle-right'}></i>
				</Button>
			</div>
		</td>
	}
	linkTo = (val, item) => {
		return <td>
				<Link className={'table-link'} onClick={e=>this.selectHistory(e,item)}>{val.jobType}</Link>
		</td>
	}

	getRootObjectForDetailsId(){
		const queryUrlParams = queryString.parse(this.props.location.search);
		let objectforDetailsId = queryUrlParams.rootId;
		return objectforDetailsId
	}

	render() {
		const items = this.state.items;
		const metaData = this.state.metaData;

		let objectforDetailsId = this.getRootObjectForDetailsId()
		if(!objectforDetailsId){

				const tableConfig = {
					columnsConfig: [
					      { name:'Job name', displayComponent: (v, i) => this.linkTo(v,i), dataField: 'attributes'},
					      { name:'Status', dataField: 'attributes.status'},
					      { name:'Start time', dataField: 'attributes.startTime', dateFormat: 'DD/MM/YYYY HH:mm', type: 'date'},
					      { name:'End time', dataField: 'attributes.endTime', dateFormat: 'DD/MM/YYYY HH:mm', type: 'date'},
					      { displayComponent: (v, i) => this.itemActions(v,i), dataField: 'attributes'},
					      { displayComponent: (v, i) => this.moreActions(v,i), dataField: 'attributes'},

					],
				}

					var leftContent;
	        if(this.state.metaData && this.state.metaData.totalElements > 0){
	        	leftContent = <DataTable items={JSON.stringify(items)}
	        			tableClassName="data-table"
						goToPage={this.goToPage}
						pagination={true}
						displayTotalElements={true}
						metaData={JSON.stringify(metaData)}
						tableConfig={tableConfig}/>
	        }
	        else {
	        	leftContent = <EmptyPane mainMessage="No load history" secondaryMessage="No load history in current container"/>
	        }

			var headerActions = <ButtonToolbar>
				<Button onClick={e=>this.refreshView()}>
					<i className="fa fa-lg fa-refresh"></i>
				</Button>
			</ButtonToolbar>

	        return (<>
						<div className="portlet-content">
						      	{this.state.loading ? <WaitingPane /> : leftContent}
			      		</div>
					</>)
		}


			return	<DataLoaderHistoryDetails
								{...this.props}
								pushBreadCrumb={this.props.pushBreadCrumb}/>
		}

}

export default DataLoaderHistory;

const enIcon = (val) => {
	if(val) return <td  className="dt-center">
			<RiFocus3Line  color="#EEEE" size="1.3em"/>
		</td>
	return <td></td>
}
