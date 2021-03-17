
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button,
	ButtonGroup,
	ButtonToolbar,
	Input, Col
} from 'reactstrap';
import {
	DataTable,
	BusinessRuleDetails ,
	BusinessClassAndTypeSelect,
	WaitingPane,
	EmptyPane
}
from '_components';
import { businessRulesService } from '_services/business.rule.services.js';
import * as actions from '_actions/actions.js';
import { commons } from '_helpers/commons.js';
import { Form, } from 'react-bootstrap'
import { RiBriefcase4Line } from "react-icons/ri";
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'


const mapStateToProps = store => ({
	searchBusinessRules: store.searchBusinessRules,
	businessType: store.searchBusinessRules.businessType,
	businessClass: store.searchBusinessRules.businessClass,
	vetoable: store.searchBusinessRules.vetoable,
	eventKey: store.searchBusinessRules.eventKey,
	phase: store.searchBusinessRules.phase,
	rules: store.searchBusinessRules.rules,
	includeParentRules: store.searchBusinessRules.includeParentRules,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchCriterias: (e) => disptach(actions.updateBusinessRulesSearchCriterias(e)),
})

/**
 *
 * Business rules
 */
class BusinessRules extends Component {

	constructor(props){
		super(props)

		var includeParentRules = commons.hasRoleSuperAdmin(this.props.userContext) ? true : false
		if(this.props.searchBusinessRules && this.props.searchBusinessRules.includeParentRules != undefined){
			includeParentRules = this.props.searchBusinessRules.includeParentRules
		}

		this.state = {
			queryFilters :{
				businessType: props.businessType ? props.businessType : '',
				businessClass: props.businessClass ? props.businessClass : '',
				vetoable: props.vetoable ? props.vetoable : true,
				includeParentRules: false,
				eventKey: props.eventKey ? props.eventKey : '',
				phase: props.phase ? props.phase : '0',
			},

			rules: props.rules ? props.rules : {},
			errors: '',
			processing: false,

			viewMode: 'viewList',
			selectedRuleId : null,
		}

		this.updateBusinessTypeFunction = this.updateBusinessTypeFunction.bind(this)
		this.businessEventChange = this.businessEventChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.disactivateRule = this.disactivateRule.bind(this)
		this.activateRule = this.activateRule.bind(this)
		this.switchToView = this.switchToView.bind(this)
		this.refreshView = this.refreshView.bind(this)
		this.displayListView = this.displayListView.bind(this)
		this.loadDatas = this.loadDatas.bind(this)
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	displayListView(update){
		this.setState({
			viewMode: 'viewList',
		});

		if(update){
			this.refreshView();
		}
	}
	refreshView(){
		let curformqueryFilters = {...this.state.queryFilters};
		this.loadDatas(curformqueryFilters);
	}
	switchToView(e, name){
		e.preventDefault()
		this.setState({
			viewMode: name
		})
	}
	disactivateRule(e, i){
		e.preventDefault()
		var id = i.attributes.id

		businessRulesService
		.desactivate(id, this.props.containerId)
		.then(response => {
			let curformqueryFilters = {...this.state.queryFilters}
			this.loadDatas(curformqueryFilters);
        }).catch(error => {
        	console.error(error);
        })
	}
	activateRule(e, i){
		e.preventDefault()
		var id = i.attributes.id

		businessRulesService
		.activate(id, this.props.containerId)
		.then(response => {
			let curformqueryFilters = {...this.state.queryFilters}
			this.loadDatas(curformqueryFilters);
        }).catch(error => {
        	console.error(error);
        })
	}
	componentDidUpdate(prevProps, prevState){
		let prevformqueryFilters = {...prevState.queryFilters}
		let curformqueryFilters = {...this.state.queryFilters}

		if(JSON.stringify(prevformqueryFilters) !== JSON.stringify(curformqueryFilters)){
			if(this.state.queryFilters.businessClass === undefined ||
					(this.state.queryFilters.businessClass === ''
						&& this.state.queryFilters.businessType === '')){
				this.setState({
					errors: true,
					processing: false
				})
			}
			else {
				this.loadDatas(curformqueryFilters)
			}
		}

		if(prevState.viewMode !== this.props.viewMode){
			this.setState({
				viewMode: this.props.viewMode
			})
		}
	}

	componentDidMount(){
		let curformqueryFilters = {...this.state.queryFilters}
		//this.loadDatas(curformqueryFilters)
	}

	loadDatas(params){
		if(params.phase !== '0'){
			params.vetoable = false
		}

		this.setState({processing: true})

		businessRulesService
		.getApplicableRules(params, this.props.containerId)
		.then(e => {
			this.props.updateSearchCriterias(params)
			this.setState({
				rules: e,
				errors: '',
				processing: false,
				queryFilters: params
			})
		})
		.catch(error =>{
			this.setState({processing: false})
		})
	}
	handleChange(e){
		let value = e.target.value
		var queryFilters = {...this.state.queryFilters}
		if(e.target.name === 'vetoable'){
			let vet = !this.state.queryFilters.vetoable
			queryFilters.vetoable = vet
		}
		else if(e.target.name === 'phase'){
			if(value === '1' || value === '2'){
				queryFilters.phase = value
				queryFilters.vetoable = false
			}
			else {
				queryFilters.phase = value
			}
		}
		else if(e.target.name === 'includeParentRules'){
			queryFilters.includeParentRules = e.target.checked
		}

		this.props.updateSearchCriterias(queryFilters)
		this.setState({queryFilters: queryFilters})
	}
	businessEventChange(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.eventKey = e.target.value
		this.setState({
			queryFilters: queryFilters,
		})
	}
	updateBusinessTypeFunction(businessClass, businessType){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.businessClass = businessClass
		queryFilters.businessType = businessType
		this.loadDatas(queryFilters);
	}
    displaySelectFunction(businessClass, businessTypes){
    	// in same row mode (2 columns)
        return (
        	<Form.Row>
                <Form.Group as={Col} md="6">
                    <div>{businessClass}</div>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <div>{businessTypes}</div>
                </Form.Group>
             </Form.Row>
        )
    }

    selectRule(e, id){
    	if(e) e.preventDefault()
			this.props.history.push(coreUri.businessRulesAdminUri(id))
    }

    name(v, i){
    	return (
    		<td>
				<Link className={'table-link'} onClick={e=>this.selectRule(e, i.attributes.id)}>
					{v.identifier}
				</Link>
    		</td>
    	)
    }
    actions(v,i){
    	var link;
    	if(this.props.detailsViewUriProvider){
    		link = this.props.detailsViewUriProvider(i.attributes.id)
    	}
    	else {
    		link = window.href.location + `/${i.attributes.id}`
    	}

    	var currentContaineName = commons.getWorkingContainerName(this.props.userContext),
    	objContainerName = i.container.name,
    	inherited = currentContaineName !== objContainerName;

    	var actions;
    	if(inherited === true){
    		actions = <i className='fa fa-lg fa-arrow-circle-o-up'></i>;
    	}

    	if(!inherited){
    		actions = <ButtonGroup>
				<Button color="primary" size="sm" active={i.attributes.active === true} onClick={e => this.activateRule(e, i)}>ON</Button>
				<Button color="primary" size="sm" active={i.attributes.active === false} onClick={e => this.disactivateRule(e, i)}>OFF</Button>
			</ButtonGroup>
    	}

    	return <td className="dt-center">{actions}</td>;
    }
    getBusinessTypeAndClassSelect(){
    	const comp = <BusinessClassAndTypeSelect
			{...this.props}
      	displayFunction = {this.displaySelectFunction}
      	updateFunction = {this.updateBusinessTypeFunction}
      	defaultBusinessClass = {this.state.queryFilters.businessClass}
      	defaultBusinessType = {this.state.queryFilters.businessType}
      	mandatorySubType = {false}/>

      	return comp;
    }
    getVetoable(){
    	var vetoable
    	if(this.state.queryFilters.phase === '0'){
    		vetoable = <Form.Check
	        	id="vetoable_check"
	        	name="vetoable"
	        	onChange={this.handleChange}
    			value={this.state.queryFilters.vetoable}
	        	checked={this.state.queryFilters.vetoable}
	        	label="Vetoable rules only"
	    	/>
    	}
    	return vetoable
    }
    includeParentItems(){
    	return <Form.Check
    		type="switch"
    		id="parent_items_check"
    		name="includeParentRules"
        	onChange={this.handleChange}
    		value={this.state.queryFilters.includeParentRules}
        	checked={this.state.queryFilters.includeParentRules}
        	label="Parent items"
    	/>
    }
    lifecyclePhase(){
    	return  (
			<Input value={this.state.queryFilters.phase} type="select" name="phase" id="phase" onChange={this.handleChange}>
		        	<option value="0">Before commit</option>
		        	<option value="1">After success commit</option>
		        	<option value="2">After rollback (commit error)</option>
		    </Input>
		 )
    }
    buildHForm(){
    	return <div>
	    	{this.getBusinessTypeAndClassSelect()}
	    	<Form.Row>
	    		<Form.Group as={Col} md="6">
	    			{this.lifecyclePhase()}
	    		</Form.Group>
	    		<Form.Group as={Col} md="6">
	    			{this.getVetoable()}
	    		</Form.Group>
	        </Form.Row>
    	</div>
    }
    buildResultDatatable(){
    	const items = this.state.rules ? this.state.rules.data : [];
		const metaData = this.state.rules ? this.state.rules.metaData : {};
		const tableConfig = {
				columnsConfig: [
					{name:'Order', dataField: 'attributes.order'},
					{displayComponent: (v, i) => this.actions(v,i)},
					{name:'Identification', dataField: 'attributes',  displayComponent: (v, i) => this.name(v, i)},
					{name:'Evenement', dataField: 'attributes.event'},
					//{name:'Created', dataField: 'attributes.createDate', dateFormat: 'DD/MM/YYYY'},
		        	{name:'Modification', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD/MM/YYYY' },
				],
		}

    	var datatable, currentContainerName = commons.getWorkingContainerName(this.props.userContext);
		if(this.state.processing == true){
			datatable = <div className="mt-5"><WaitingPane /></div>
		}
		else {
			if(items && items.length > 0) {
				datatable = <DataTable
                			items={JSON.stringify(this.state.rules.data)}
                			tableClassName="data-table"
                			metaData={JSON.stringify(metaData)}
                    		tableConfig={tableConfig}
                    		displayTotalElements={true}
                			paginate={true}/>
			}
			else {
		    	return this.state.processing ?
		    		<WaitingPane /> :
		    		<EmptyPane hideMainMessage={true} secondaryMessage="No business rules found"/>
			}
		}
		return datatable;
    }
    header(){
    	return <div className="">
		    	<ButtonToolbar  className="justify-content-between">
		    		<ButtonGroup>
		    			<Button className="jsoagger-btn" onClick={e=>this.switchToView(e, 'synch')}><i className="fa fa-md fa-cloud-upload"></i> Upload</Button>
		    			<Button className="jsoagger-btn"  onClick={e=>this.switchToView(e, 'viewList')}><i className="fa fa-md fa-th-list"></i> Navigate</Button>
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
				</ButtonToolbar>
		</div>
    }

		getRootObjectForDetailsId(){
				const queryUrlParams = queryString.parse(this.props.location.search);
				let objectforDetailsId = queryUrlParams.rootId;
				return objectforDetailsId
			}

    render() {
    	var errors;
			if(this.state.errors !== ''){
				errors = <center><h6>Please select a business class</h6></center>
			}

			let objectforDetailsId = this.getRootObjectForDetailsId()
			if(!objectforDetailsId){
				var resultDatatable = this.buildResultDatatable(),
				form = this.buildHForm();

						return (
							<div className="portlet-box">
								<div className="portlet-header">
									<div className="admin-filters">{form}</div>
								</div>
								<div className="portlet-content">
							<div>{resultDatatable}</div>
						</div>
					</div>
					)
			}

	     	return <div>
	  					<BusinessRuleDetails
							{...this.props}
	  						refreshListView={this.refreshView}
	  						displayListView={this.displayListView}
	  						pushBreadCrumb={this.props.pushBreadCrumb}
	  						popBreadCrumb={this.props.popBreadCrumb} />
	  		</div>

   }
}


export default connect(mapStateToProps, mapDispatchToProps) (BusinessRules);

function activeOrNot(v){
	if(v){
		return <td> <i className="fa">.</i></td>
	}
	else {
		return <td> <i className="fa fa-ban fa-lg icon-red"></i></td>
	}
}

const icon = () => {
	return <td className="dt-center">
		<RiBriefcase4Line color="#EEEE" size="1.3em"/>
	</td>
}
