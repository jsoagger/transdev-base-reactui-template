import React, { Component} from 'react';
import { connect } from 'react-redux';
import {ButtonToolbar, Button,} from 'reactstrap';
import {WizardConfirm} from '_components';
import * as actions from '_reducers/actions.js';
import { businessRulesService } from '_services/business.rule.services.js';
import { commons } from '_helpers/commons.js';
import {
	AttributeListGroup,
	PersistenceInfo,
	WaitingPane
}
from '_components';
import { toast } from 'react-toastify';
import UpdateOrder from './UpdateOrder.js';
import queryString from 'query-string';

const mapStateToProps = store => ({
	applicationConfig: store.applicationConfig,
});
const mapDispatchToProps = (disptach) => ({
	updateApplicationConfigRX: (e) => disptach(actions.updateApplicationConfig(e)),
})


/**
 * Business rule details page
 */
class BusinessRuleDetails extends Component {

	constructor(props){
		super(props);
		this.state = {
			item: {},
			loading: true,
			businessRuleId: this.getRootObjectForDetailsId(),
			errors: []
		}

		this.activate = this.activate.bind(this)
		this.deactivate = this.deactivate.bind(this)
		this.deleteRule = this.deleteRule.bind(this)
		this.onUpdateSuccess = this.onUpdateSuccess.bind(this)
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	deleteRule(){
		businessRulesService
		.deleteRule(this.getRootObjectForDetailsId())
		.then(response => {
			if(response.status === 200){
				toast.success('Business rule is deleted');
				if(this.props.displayListView){
					this.props.popBreadCrumb(0);
					this.props.displayListView(true);
				}
			}
			return response.json();
		})
		.then(json => {
			if(commons.hasRESTErrorMessages(json)){
				var errors = commons.getRESTErrorMessages(json)
				this.setState({
					errors: errors
				})
			}
		})
	}

	activate(e){
		if(e) e.preventDefault()
		const businessRuleId = this.getRootObjectForDetailsId()
		const d = businessRulesService
		.activate(businessRuleId, this.props.containerId)
		.then(response => {
			if(response.status == 200){
				if(this.props.refreshListView){
					this.props.refreshListView();
					toast.success('Business rule is now active')
				}
			}

	        var json = response.json();
	        return json;
	    })
		.then(json => {
			this.onUpdateSuccess();
        }).catch(error => {
        	console.error(error);
        })
	}

	deactivate(e){
		e.preventDefault()
		const businessRuleId = this.getRootObjectForDetailsId()
		const d = businessRulesService
		.desactivate(businessRuleId, this.props.containerId)
		.then(response => {
			if(response.status == 200){
				if(this.props.refreshListView){
					this.props.refreshListView();
					toast.success('Business rule is now deactive')
				}
			}

	        var json = response.json();
	        return json;
	    })
		.then(json => {
			this.onUpdateSuccess();
        }).catch(error => {
        	console.error(error);
        })
	}
	onUpdateSuccess(reloadListView){
		this.loadData(this.getRootObjectForDetailsId(), false);
		if(reloadListView && this.props.refreshListView){
			this.props.refreshListView();
		}
	}
	headerActions() {
		var canDoAction = true;
		if(canDoAction === true){
		    return (
					<ButtonToolbar>
						<WizardConfirm
								buttonClassName="action-button"
						    		buttonTitle={"Delete rule".toUpperCase()}
						    		buttonIcon="fa fa-archive fa-sm"
						    		buttonColor="danger"
									onConfirm={() => this.deleteRule()}
									dialogMessage="Delete this business rule. This can lead to unstable backend system."
									dialogTitle={"Delete rule".toUpperCase()}/>
	                	<Button hidden={this.state.item.data.attributes.active} onClick={this.activate}>ACTIVATE</Button>
	                	<Button hidden={!this.state.item.data.attributes.active} onClick={this.deactivate}>DEACTIVATE</Button>
	                	<UpdateOrder
											{...this.props}
											businessRuleId={this.getRootObjectForDetailsId()}
	                		onUpdateSuccess={this.onUpdateSuccess}
	                		oldOrder={this.state.item.data.attributes.order}/>
	                </ButtonToolbar>
			)
		}
		else {
			return <div></div>
		}
	}

	componentDidMount(){
		this.loadData(this.getRootObjectForDetailsId(), false)
	}

	componentDidUpdate(prevProps, prevtstate){
		const prevQueryUrlParams = queryString.parse(prevProps.location.search);
		const queryUrlParams = queryString.parse(this.props.location.search);
		let rootId = queryUrlParams.rootId;
		let prevId = prevQueryUrlParams.rootId;
		if(prevId !== rootId && rootId){
			this.loadData(rootId)
		}
	}

	loadData(businessRuleId, updateBread){

		this.setState({
			loading:true,
			item:null,
		})

		if(businessRuleId){
			const d = businessRulesService
			.getById(businessRuleId, this.props.containerId)
			.then(json => {

				let location = json && json.data ? json.data.attributes.rule : '';
				if(updateBread && this.props.pushBreadCrumb){
					var item = {'href': '#', title: location}
					this.props.pushBreadCrumb(item)
				}

				this.props.updateApplicationConfigRX(location);
				this.setState({
					item: json,
					loading:false
				});

	        }).catch(error => {
	        	console.error(error);
	        })
		}
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

		const attributesList = {
		    title: 'Summary',
		    icon: 'fa fa-info float-right',
		    //headerActions: (v) => this.headerActions(v),
		    attributes: [
		    	{name: 'Name', dataField: 'attributes.rule'},
		    	{name: 'Event', dataField: 'attributes.event'},
		        {name: 'Applicable on type', dataField: 'attributes.businessType'},
		        {name: 'Description', dataField: 'attributes.description'},
		        {name: 'Order', dataField: 'attributes.order'},
		        {name: 'Phase', dataField: 'attributes.transactionPhase'},
		        {name: 'Vetoable',  dataField: 'attributes.vetoable', type: 'bool'},
		        {name: 'Active',  dataField: 'attributes.active', type: 'bool'},
		        {name: 'Container',  dataField: 'container.name'},
		    ]
		};

		const data = this.state.item.data;
		if(data){
			const d = commons.toJSONObject(data);
			return (<div className={'business-rules-details'}>
					<div className="admin-details-header">
						<p className="page-title">{d.attributes.rule}</p>
						{this.headerActions()}
					</div>

					<div className="bordered-panel">
						<p className=" form-error">{this.state.errors}</p>
						<AttributeListGroup
							attributesListConfig={attributesList}
							data={d}
							displayHeader={true}
							addHeaderMargin="true" />
					</div>

					<div className="bordered-panel">
						<p className=" form-error">{this.state.errors}</p>
					 	<PersistenceInfo
							{...this.props} data={d}
							displayHeader={true}
							addHeaderMargin="true"/>
					</div>
			</div>);
		}

		return (<div></div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (BusinessRuleDetails);
