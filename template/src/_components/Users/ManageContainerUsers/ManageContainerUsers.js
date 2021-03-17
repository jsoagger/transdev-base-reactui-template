import React, { Component } from 'react';
import {Input,} from 'reactstrap';
import {commons} from '_helpers/commons.js';
import { searchService } from '_services/search.services.js';
import { lifecycleService } from '_services/lifecycle.services.js';
import * as actions from '_actions/actions.js';
import { connect } from 'react-redux';
import { PeopleCard, DataTable, Wizard, AddPeople, PeopleDetails, EmptyPane, WaitingPane } from '_components';
import { HashRouter,  Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { RiUserLine, RiRefreshLine, RiUser6Line } from "react-icons/ri";
import queryString from 'query-string';
import {coreUri} from '_helpers/CoreUri.js'


const mapStateToProps = store => ({
	searchTerm: store.searchMembers.searchTerm,
	searchBusinessClass: store.searchMembers.searchBusinessClass,
	searchBusinessType: store.searchMembers.searchBusinessType,
	results: store.searchMembers.searchResults,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchTerm: (e) => disptach(actions.updateSearchMembersTerm(e)),
	updateSearchResults: (e) => disptach(actions.updateSearchResults(e)),
})

/**
 * Container registered users
 */
class ManageContainerUsers extends Component {

	constructor(props){
		super(props)
		this.state ={
			totalMembers: 0,
			members: [],

			loadingMembers: false,
			statesFilter: [],
			reachableStates:[],

			queryFilters: {
				page: 0,
				pageSize:20,
				includeParentItems: false,
				login: '',
				state: '',
			},

			viewMode: 'viewList'
		}

		this.manageMembers = this.manageMembers.bind(this)
		this.unsubscribe = this.unsubscribe.bind(this)
		this.blockUser = this.blockUser.bind(this)
		this.goToPage = this.goToPage.bind(this)
		this.setLinkState = this.setLinkState.bind(this)
		this.switchToView = this.switchToView.bind(this)
		this.onPeopleDetailsChange = this.onPeopleDetailsChange.bind(this);
		this.moreActions = this.moreActions.bind(this);
		this.getRootObjectForDetailsId = this.getRootObjectForDetailsId.bind(this)
	}

	switchToView(e, name){
		if(e) e.preventDefault()
		this.setState({
			viewMode: name
		})
	}

	unsubscribe(userAccountId){
		var members = [...this.state.members],
		newMembers = [];
		this.state.members.map(m => {
			if(m.attributes.id !== userAccountId){
				newMembers.push(m)
			}
		})

		this.setState({
			members: newMembers
		})
	}

	blockUser(userAccountId){
		var members = [...this.state.members],
		newMembers = [];
		this.state.members.map(m => {
			if(m.attributes.id !== userAccountId){
				newMembers.push(m)
			}
		})

		this.setState({members: newMembers})
	}

	newPeople(wizardCloseFunction){
		return <AddPeople
				{...this.props}
				fromConnectedUser={true}
				onCreatePeopleSuccess={(id) => this.onCreatePeopleSuccess(wizardCloseFunction, id)}/>
	}

	onCreatePeopleSuccess(wizardCloseFunction, id){
		if(wizardCloseFunction){
			wizardCloseFunction()
		}

		setTimeout(() => {
			  this.setState({ showSuccessAlert: false });
		}, 5000);

		// reload list data and
		//select newly created catalog
		this.setState({
			selectedAccountId: id,
			showSuccessAlert: true
		})
		this.componentDidMount()
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.viewMode !== this.props.viewMode){
			this.setState({viewMode: this.props.viewMode})
		}
	}

	getRootObjectForDetailsId(currentItemIdParam){
		const queryUrlParams = queryString.parse(this.props.location.search);
		let objectforDetailsId = queryUrlParams.rootId;
		return objectforDetailsId
	}

	refreshView(){
		this.setState({loadingMembers: true})
		var queryFilters = {...this.state.queryFilters};
		queryFilters.login = '';
		this.loadDatas(queryFilters)
	}

	manageMembers(e){
		e.preventDefault()
	}

	componentDidMount(){
		var wc = this.props.containerId;

		var queryFilters = {...this.state.queryFilters}
		//queryFilters.state = 'VALID_MEMBER'
		queryFilters.state = 'REQUEST_IN_PROGRESS'
		this.setState({
			queryFilters: queryFilters,
			loadingMembers: true,
		})

		this.loadDatas(queryFilters)
	}

	onPeopleDetailsChange(id, wasRemoved){
		var queryFilters = {...this.state.queryFilters}
		if(wasRemoved === true){
			this.setState({selectedAccountId: null})
		}

		this.loadDatas(queryFilters)
	}

	showDetailsView(){
		return <div className="jsoagger-container">
				<PeopleDetails
					{...this.props}
					pushBreadCrumb={this.props.pushBreadCrumb}
					updatePeopleCallBack={(id, wasRemoved) => this.onPeopleDetailsChange(id, wasRemoved)}
					accountId={this.state.selectedAccountId} />
			</div>
	}

	loadDatas(queryFilters){
		searchService
		.searchContainerMemberByLoginLike2(queryFilters, this.props.containerId)
		.then(response => {
			if(response && response.data){
				this.setState({
					results: response.data,
					metaData:response.metaData,
					loadingMembers: false,
				})
			}
			else {
				this.setState({
					results: [],
					metaData: null,
					loadingMembers: false,
					reachableStates: []
				})
			}
		})
		.catch(error => {
			console.log(error)
		})
	}
	goToPage(i){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.page = i

		this.setState({queryFilters: queryFilters})
		this.loadDatas(queryFilters)
	}

	nameOf(res, item){
		var owner = item.attributes.ownerSummary
		var type = item.businessType.type
		if(type === 'person'){
			return this.LinkToPeople(item.attributes, owner, "person")
		}
		else {
			return this.LinkToPeople(item.attributes, owner, "org")
		}
	}

	moreActions(val,item){
		return <td className="dt-center">
			<div className="btn-toolbar">
				<Button onClick={e=>this.selectPerson(e, val.id)}>
					<i className="fa fa-lg fa-eye"></i>
				</Button>
			</div>
		</td>
	}

	lifecycleActions(v, i){
		var actions = [], roleAid, roleBid,
		id = i.attributes.id;

		roleAid = this.props.containerId;
		roleBid = i.attributes.id;
		if(this.state.reachableStates.length > 0){
			this.state.reachableStates.map(state => {
				if(state !== ''){
					actions.push(
						<div className="float-right">
							<Button size="sm" variant="outline-primary"
								onClick={e =>this.setLinkState(roleAid, roleBid, state)}>{state}</Button>
						</div>
					)
				}
			})
		}

		return <td className="dt-center">
			{actions}
		</td>
	}
	setLinkState(roleAid, roleBid, state){
		var linkClass = 'io.github.jsoagger.core.api.composite.ContainerMembershipLink'
		this.setState({
			loadingMembers: true
		})

		if(roleAid == undefined || roleBid == undefined ){
			return;
		}

		lifecycleService
		.setLinkState(roleAid, roleBid, state, linkClass, this.props.containerId)
		.then(response => {
			var queryFilters = {...this.state.queryFilters}
			this.loadDatas(queryFilters)
		})
	}
	LinkToPeople(item, owner, type){
		var route
		if(type !== "org"){
			route = <Link className="table-link" onClick={e=>this.selectPerson(e, item.id)}>
				{owner}
			</Link>
		} else {
			route = <Link className="table-link" onClick={e=>this.selectPerson(e, item.id)}>
				{owner}
			</Link>
		}

		return (
			<td className="dt-center" width="30%">
				<HashRouter >
					{route}
				</HashRouter>
			</td>
		)
	}

	selectPerson(e, id){
		if(e) e.preventDefault()
		this.props.history.push(coreUri.profileAdminUri(id))
	}

	membersDatatable(){
		const tableConfig = {
				columnsConfig: [
					//{ displayComponent: (v) => enIcon(v) },
					{name:'Summary', dataField: 'attributes', displayComponent: (v, i) => this.nameOf(v, i)},
					{name:'Email', dataField: 'attributes.login'},
					{name:'Password expired', dataField: 'attributes.passwordExpirationDate', dateFormat: 'DD/MM/YYYY HH:mm'},
					//{name:'Created', dataField: 'attributes.createDate', dateFormat: 'DD/MM/YYYY HH:mm'},
					{name:'Last Updated', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD/MM/YYYY'},
					//{ displayComponent: (v,i) => this.moreActions(v,i), dataField: 'attributes'},
				],
		}

		return 	<DataTable
						tableClassName="data-table"
						items={JSON.stringify(this.state.results)}
		            	metaData={JSON.stringify(this.state.metaData)}
		                tableConfig={tableConfig}
		                displayTotalElements={true}
		                goToPage={this.goToPage}
		            	paginate={true}/>
	}

	searchTermUpdated(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.login = e.target.value
		this.loadDatas(queryFilters)
		this.setState({
			queryFilters: queryFilters,
			loadingMembers: true,
			viewMode: 'viewList'
		})
	}

	searchHeader(){
		return <div className="admin-filters">
            	<Input type="text"
            		className="admin-hover-input"
            		name="input1-group2"
            		placeholder="Member email or nickname"
            		autocomplete="off"
            		defaultValue={this.state.searchTerm}
            		onChange={(e) => this.searchTermUpdated(e)}/>
         </div>
	}

	updateStates(e){
		var queryFilters = {...this.state.queryFilters}
		queryFilters.state = e.target.value
		this.setState({
			queryFilters: queryFilters,
			loadingMembers: true
		})

		this.loadDatas(queryFilters)
	}

	getStateFilterDisplay(){
		var datas = []
		this.state.statesFilter.map(m => {
			var id = "defaultCheck__" + m;
			var val = m.split(';')[0];
			var key = m.split(';')[0]
			var checked = this.state.queryFilters.state === key
			datas.push(
				<div className="">
				  <input class="form-check-input" checked={checked} type="radio" value={key} id={id} onChange={e => this.updateStates(e)}/>
				  <label class="form-check-label" for={id}>
				    {val}
				  </label>
				</div>
			)
		})
		return <div className="mx-4">{datas}</div>
	}

  render() {

				var rootObjectForDetailsId = this.getRootObjectForDetailsId()
	    	if(!rootObjectForDetailsId){
		    	var datatable, currentContainerName = commons.getWorkingContainerName(this.props.userContext),
		    	total = this.state.metaData !== null && this.state.metaData !== undefined ? this.state.metaData.totalElements : 0;

		    	if(this.state.loadingMembers == true){
  					datatable = <WaitingPane waitingMessage='Loading members...'/>
		    	}
		    	else if(total > 0){
		    		datatable = this.membersDatatable();
		    	}
		    	else {
  		    		datatable = <EmptyPane mainMessage='No members found' secondaryMessage='No members found with given criterias' />
		    	}

		    	var buttonIconComp = <RiUserLine size="1.2em"/>
		    	var headerActions = <>
							<Wizard buttonColor="secondary"
  								buttonIconComp={buttonIconComp}
  								dialogTitle="New member"
  								buttonTitle="NEW MEMBER"
  								hideFooter={true}
  								dialogSize="md"
  								dialogContentProvider={(wizardCloseFunction)=>this.newPeople(wizardCloseFunction)}/>
							<Button className="" size="sm"
								variant="link"
								onClick={e=>this.refreshView()}>
								<RiRefreshLine size="1.2em"/>
								&nbsp;REFRESH
							</Button>
				</>

						return <div className="portlet-box">
								<div className="portlet-header">
									{this.searchHeader()}
									<div className="btn-toolbar footer-btn-toolbar">{headerActions}</div>
								</div>
								<div className="portlet-content table-list-admin-root">{datatable}</div>
						</div>
	    	}
	    return this.showDetailsView()
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageContainerUsers);


class SearchMembersResult extends Component {
	constructor(props){
		super(props)
		this.orgDetailsLink = this.orgDetailsLink.bind(this)
		this.personDetailsLink = this.personDetailsLink.bind(this)
	}

	searchMembersResult(results){
		if(results && results.length > 0){
			return this.populateResult(results);
		}
	}

	orgDetailsLink(people, owner){
		return LinkToOrg(people, owner)
	}

	personDetailsLink(people, owner){
		return LinkToOrg(people, owner)
	}

	populateResult(results){
		var views = []
		results.map(res => {
			var owner = res.links.owner
			views.push(
				<PeopleCard
					unsubscribe={e => this.props.unsubscribe(e)}
					blockUser={e => this.props.blockUser(e)}
					peopleType={res.businessType}
					people={res.links.owner}
					account={res.attributes}
					orgDetailsLink={e => this.orgDetailsLink(res.attributes, owner)}
					personDetailsLink={e => this.personDetailsLink(res.attributes, owner)}
			/>
			)
		})

		return <div>
			{views}
		</div>
	}
	render(){
		return this.searchMembersResult(this.props.results);
	}
}

const LinkToPerson2 = (item, owner) => {
	const link = `/admin/home/users/${item.id}`
	return (
		<td className="dt-center" width="50%">
			<div className="half-opacity">
				{item.login}
			</div>

			<p align="left">
				<HashRouter >
					<Link to={link} className="btn-square">{owner.firstName} {owner.lastName}</Link>
				</HashRouter>
			</p>
		</td>
	)
}
const LinkToOrg = (item, owner) => {
	const link = `/admin/home/users/${item.id}`
	return (
			<td className="dt-center" width="50%">
				<div className="half-opacity">
					{item.login}
				</div>
				<p align="left">
					<HashRouter >
						<Link to={link} className="btn-square">{owner.name}</Link>
					</HashRouter>
				</p>
			</td>
	)
}

const enIcon = (val) => {
	if(val) return <td  className="dt-center">
		<RiUser6Line color="#EEEE" size="1.3em"/></td>
	return <td></td>
}
