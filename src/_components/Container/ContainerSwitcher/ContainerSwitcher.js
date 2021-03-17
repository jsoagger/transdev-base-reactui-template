import React, { Component } from 'react';
import {  ButtonToolbar, Button} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { containerService } from '_services/container.services.js';
import { DataTable, EmptyPane, Wizard, WaitingPane } from '_components';
import { commons } from '_helpers/commons.js';
import { toast } from 'react-toastify';
import ContainerCreate from '_components/Container/ContainerCreate/ContainerCreate';
import ContainerDetails from '_components/Container/ContainerDetails/ContainerDetails';
import { loginService } from '_services/login.services.js';
import {updateUserContext} from '_reducers/coreUserContextReducer.js'

const mapStateToProps = store => ({

})

const mapDispatchToProps = (disptach) => ({
	updateUserContextRX: (e) => disptach(updateUserContext(e)),
})

/**
 * Containers list/Switch container view
 */
class ContainerSwitcher extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],
			metaData: '',
			currentContainerName: '',
			viewMode: 'viewList',
		}

		this.switchToParent = this.switchToParent.bind(this)
		this.switchTo = this.switchTo.bind(this)
		this.emptyTableActions = this.emptyTableActions.bind(this)
		this.newContainerWizardContent = this.newContainerWizardContent.bind(this)
		this.onCreateSuccess = this.onCreateSuccess.bind(this)
		this.switchToRoot = this.switchToRoot.bind(this)
	}

	async switchToRoot(){
		var rootContainerId =  this.props.userContext.applicationContainer.id
		this.loadChildrenContainer(rootContainerId)
	}

	async toChild(e, container){
		this.setState({loading: true})

		if(e) e.preventDefault()
			containerService
			.getChildrenContainers(container.id)
			.then(json => {
				this.setState({
					currentNavigatingContainer: container.id,
					currentContainerName: container.name,
					items: json.data,
					metaData: json.metaData,
					viewMode: 'viewList',
					loading: false
				})
			})
			.catch(error => {
				console.error(error);
			});
	}

	async switchTo(e, container) {
		if(e) e.preventDefault()
		this.switchUserContext(container.id)
		this.setState({loading: false})
	}

	async manageApplication(e){
		if(e) e.preventDefault();
		this.setState({loading: true})
		var rootContainerId = commons.getRootContainerId(this.props.userContext);
		this.switchUserContext(rootContainerId)
	}

	switchUserContext(containerId){
		loginService
		.postLogin(commons.sessionId(), containerId)
		.then(response => {
			if(response && response.data){
				let userContext = commons.jsoagger_core_loginSuccess(response)
				this.props.updateUserContextRX(userContext);
				this.setState({loading: false})

				var message = 'Your working container is now: ' + this.props.userContext.workingContainer.name;
				toast.success(message);
			}
		});
	}

	onCreateSuccess(wizardCloseFunction){
		if(wizardCloseFunction) wizardCloseFunction();
		this.componentDidMount();
	}

	newContainerWizardContent(wizardCloseFunction){
		return <ContainerCreate parentContainerId={this.state.currentNavigatingContainer}
								containerId={this.props.containerId}
								userContext={this.props.userContext}
					onCreateContainerSuccess={()=>this.onCreateSuccess(wizardCloseFunction)}
					parentContainerPath={this.state.currentContainerPath}
					parentContainerName={this.state.currentContainerName}/>
	}

	switchToParent(e){
		if(e) e.preventDefault();
		this.setState({loading: true})

		containerService
		.getParentContainer(this.state.currentNavigatingContainer)
        .then(json => {

        	let parentId = json.data.attributes.id,
        	path = json.data.attributes.name,
        	name = json.data.attributes.name;

        	containerService
        	.getChildrenContainers(parentId)
	        .then(json => {

	        	this.setState({
	        		currentNavigatingContainer: parentId,
	        		currentContainerName:  name,
	        		currentContainerPath: path,
	        		items: json.data,
	        		metaData: json.metaData,
	        		viewMode: 'viewList',
					loading: false
	        	})
	        })
        })
        .catch(error => {
        	console.error(error);
        });
	}

	emptyTableActions(){
		return (
			<React.Fragment>
					<button onClick={e => this.switchToParent(e)}>Parent</button>
			</React.Fragment>
		)
	}

	componentDidUpdate(prevprops, prevState){
		if(prevState.viewMode !== this.props.viewMode){
			this.setState({viewMode: this.props.viewMode})
		}
	}

	componentDidMount(){
		this.loadChildrenContainer(this.props.containerId)
	}

	async loadChildrenContainer(containerId){
		this.setState({loading: true})

		containerService
		.getChildrenContainers(containerId)
		.then(json => {
			return json;
		})
		.then(json => {
			this.setState({
				currentNavigatingContainer: this.props.containerId,
				currentContainerName: commons.getWorkingContainerName(this.props.userContext),
				items: json.data,
				metaData: json.metaData,
				viewMode: 'viewList',
				loading: false
			})
		})
		.catch(error => {
			console.error(error);
		});
	}

	manageLink(val){
		return <td>
			<Button onClick={() => this.switchTo(null, val)}>MANAGE</Button>
		</td>
	}

	switchToLink(val){
		return <td>
			<Button onClick={e => this.toChild(e, val)}><i className="fa fa-angle-right fa-lg"></i></Button>
		</td>
	}
	nameOf(container){
		return <td>
			<Link className={'table-link'} href="#" onClick={()=>{}}>{container.name}</Link>
		</td>
	}
	details(val){
		var url = '#/admin/containers/' + val.id
		return <td>
			<Button href={url}><i className="fa fa-info-circle"></i></Button>
		</td>
	}

	table(){
		const items = this.state.items;
		const metaData = this.state.metaData;

		const tableConfig = {
				columnsConfig: [
				    { name:'Name', displayComponent: (v) => this.nameOf(v), dataField: 'attributes' },
						{ displayComponent: (v) => this.switchToLink(v), dataField: 'attributes' },
					{ displayComponent: (v) => this.manageLink(v), dataField: 'attributes' },
				    { name:'Description', dataField: 'attributes.description' },
				    { name:'Path', dataField: 'attributes.path' },
				    { name:'Created', dataField: 'attributes.createDate', dateFormat: 'DD MMM YYYY'},
		        	{ name:'Last updated', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD MMM YYYY' },
				    { displayComponent: (v) => this.switchToLink(v), dataField: 'attributes' },
				],
		}

		return  <DataTable items={JSON.stringify(items)}
	            	hover={true}
								bordered={false} striped={false}
	            	metaData={JSON.stringify(metaData)}
	              tableConfig={tableConfig}
	              pagination={true}
								displayTotalElements={true}
		            paginate={true}/>
	}

	render() {

		if(this.state.viewMode === 'viewDetails'){
			return <ContainerDetails
						pushBreadCrumb={this.props.pushBreadCrumb}
						containerId={this.state.selectedContainerId}/>
		}

		const items = this.state.items;
		var tableContent;
		if(items && items.length > 0){
			tableContent = this.table()
		}
		else {
			tableContent = <EmptyPane mainMessage="No containers"
												secondaryMessage="Current container has no children container."/>
		}

		let isRootContainer = this.state.currentNavigatingContainer === undefined ||
				this.state.currentNavigatingContainer === null ||
				this.state.currentNavigatingContainer === commons.getRootContainerId(this.props.userContext)

        return (<>
						<ButtonToolbar>
								<Wizard
										hideFooter={true}
										dialogSize="md"
										buttonIcon="fa fa-sm fa-plus"
										buttonTitle='NEW CONTAINER'
										dialogTitle='NEW CONTAINER'
										dialogContentProvider={(wizardCloseFunction)=>this.newContainerWizardContent(wizardCloseFunction)}/>

										<button onClick={e => this.manageApplication(e)}>
												<i className="fa fa-hand-o-right"></i>&nbsp;MANAGE APPLICATION
										</button>
						</ButtonToolbar>

						<table width="100%">
								<tr>
										<td with="40%">
											<div className="btn-toolbar">
												<button onClick={e => this.switchToRoot(e)}><i className="fa fa-home fa-md"></i></button>
												<button onClick={e => this.switchToParent(e)}
														disabled={isRootContainer}><i className="fa fa-chevron-left fa-md"></i>&nbsp;BACK</button>
											</div>
										</td>
										<td with="40%">
											<div className="float-right">
											</div>
										</td>
								</tr>
						</table>

						{this.state.loading  && <WaitingPane ldsgrid={true}/>}
						{!this.state.loading  && tableContent}
        </>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainerSwitcher)
