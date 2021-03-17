import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import{
	AppVersions,
	BusinessRules,
	Lifecycles,
	ManageContainerUsers,
	EmailTemplates,
	FolderTemplates,
	TeamTemplates,
	Enumerations,
	Types,
	DataLoaderHistory,
	ContainerSwitcher,
	AppBreadcrumb,
	WaitingPane,
}
from '_components';
import { connect } from 'react-redux';
import { commons } from '_helpers/commons.js';
import Sidebar from "react-sidebar";
import {DefaultFooter} from '_components';
import queryString from 'query-string';
import { FcUpLeft } from "react-icons/fc";

const mapStateToProps = store => ({
	managementPageSelectedTab: store.navigationConfig.config,
})

const mapDispatchToProps = (disptach) => ({
	setManagementPageSelectedTab: (e) => disptach(setManagementPageSelectedTab(e)),
})


class GenericManagementPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	loading: false,
			sidebarOpen: true,
        }

		this.setManagementPageSelectedTab = this.props.setManagementPageSelectedTab.bind(this);
        this.setDisplayedView = this.setDisplayedView.bind(this);
        this.provideBusinessRuleDetailsUri = this.provideBusinessRuleDetailsUri.bind(this);
        this.provideLifecycleDetailsUri = this.provideLifecycleDetailsUri.bind(this);
        this.provideEmailTemplatesDetailsUri = this.provideEmailTemplatesDetailsUri.bind(this);
        this.getSuperAdministratorMenu = this.getSuperAdministratorMenu.bind(this);
 	  	this.pushBreadCrumb = this.pushBreadCrumb.bind(this);
 	  	this.popBreadCrumb = this.popBreadCrumb.bind(this);
 	  	this.popView = this.popView.bind(this);
 	  	this.selectHomePage = this.selectHomePage.bind(this);
 	  	this.popBreadCrumbAt = this.popBreadCrumbAt.bind(this);
    }

    selectHomePage(){
    	this.setState({
    		viewName: 'emailTemplates',
    		location: 'Templates de mail',
            breadItems:[{href:'#', title:'Templates de mail'}],
            viewMode: 'viewList',
            menuGroup: 'platformAdministration'
    	})
    }

    componentDidMount(){
    	this.selectHomePage()
	}

    componentDidUpdate(prevProps, prevState){
		let params = queryString.parse(this.props.location.search)
		if(params.v && this.state.viewName && this.state.viewName !== params.v){
			var payload = this.getMenuContent(params.v)
			this.setState({
				viewName: payload.viewName,
				breadItems: payload.breadItems,
				location: payload.location,
				viewMode: payload.viewMode,
				menuGroup: payload.menuGroup
			})
		}
    }

    popView(viewMode){
    	this.setState({
    		viewMode: viewMode
    	})
    }

    setDisplayedView(e, viewName){
    	e.preventDefault();
			this.props.history.push('/admin?v=' + viewName)
    }

    loading(){
		return <WaitingPane />
	}
    provideBusinessRuleDetailsUri(id){
    	return '/admin/home/businessRules/' + id
    }
    provideLifecycleDetailsUri(id){
    	return '/admin/home/lifecycles/' + id
    }
    provideEmailTemplatesDetailsUri(id){
    	return '/admin/home/emailTemplates/' + id
    }
    pushBreadCrumb(item){
    	var breadItems = this.state.breadItems ? this.state.breadItems.slice() : [];
    	breadItems.push(item);
    	this.setState({
    		breadItems: breadItems,
    		viewMode: 'viewDetails'
    	})
    }
   popBreadCrumb(item){
    	var index = this.state.breadItems.indexOf(item);
    	if(index === 0 && this.state.breadItems.length > 1){
    		var items = this.state.breadItems.slice();
			items.pop();
			this.setState({
				breadItems: items,
				viewMode: 'viewList'
			})
		}
    }
    popBreadCrumbAt(index){
    	if(index === 0 && this.state.breadItems.length > 1){
    		var items = this.state.breadItems.slice();
			items.pop();
			this.setState({
				breadItems: items,
				viewMode: 'viewList'
			})
		}
    }
    onBreadCrumbLinkClick(items){
    	this.popBreadCrumb();
    }
    businessRules(){
    	var comp = <BusinessRules
    		{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}
    		popBreadCrumb={this.popBreadCrumbAt}
    		detailsViewUriProvider={e => this.provideBusinessRuleDetailsUri(e)}/>
    	return this.strechedPage(comp);
	}
    lifecycles(){
    	var comp = <Lifecycles
    		{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}
    		detailsViewUriProvider={e => this.provideLifecycleDetailsUri(e)}/>
    	return this.strechedPage(comp);
    }
    types(){
    	var comp = <Types {...this.props}/>
    	return this.strechedPage(comp);
    }
    mailTemplates(){
    	var comp = <EmailTemplates
    		 {...this.props}
    		 viewMode={this.state.viewMode}
    		 pushBreadCrumb={this.pushBreadCrumb}
    		 detailsViewUriProvider={e => this.provideEmailTemplatesDetailsUri(e)}
    		 />
    	return this.strechedPage(comp);
    }
    members(){
    	var comp = <ManageContainerUsers
    		{...this.props}
    		pathToDetails='#'
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}
    		orientation="horizontal"  {...this.props}/>
    	return this.strechedPage(comp);
    }
    switchContainer(){
    	var comp = <ContainerSwitcher
			{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}
    		adminPageUrl ='/admin'/>
    	return this.strechedPage(comp);
    }
    folderTemplates(){
    	var comp =  <FolderTemplates
    		{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}/>
    	return this.strechedPage(comp);
    }
    teamTemplates(){
    	var comp =  <TeamTemplates
    		{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb}/>
    	return this.strechedPage(comp);
    }
    dataLoader(){
    	var comp = <DataLoaderHistory
    		{...this.props}
    		viewMode={this.state.viewMode}
    		pushBreadCrumb={this.pushBreadCrumb} />
    	return this.strechedPage(comp);
    }
    enumerations(){
    	var comp =  <Enumerations
					{...this.props}
    				viewMode={this.state.viewMode}
    				pushBreadCrumb={this.pushBreadCrumb} />
    	return this.strechedPage(comp);
    }
    about() {
		var comp = <AppVersions
			{...this.props}
			viewMode={this.state.viewMode}
			pushBreadCrumb={this.pushBreadCrumb}/>
		return this.strechedPage(comp);
	}

	getMenuContent(viewName){
    	let menuConfig, adminMenuConfig = this.getSuperAdministratorMenu();
		adminMenuConfig.map(config => {
			if(config.key === viewName){
				menuConfig = config;
			}
		})

		if(!menuConfig){
			const getHiddenMenu = this.getHiddenMenu();
			getHiddenMenu.map(config => {
				if(config.key === viewName){
					menuConfig = config;
				}
			})
		}

		var payload ={}
		payload.breadItems = menuConfig.breadItems
		payload.viewName = menuConfig.key;
		payload.viewMode = 'viewList';
		payload.menuGroup = menuConfig.menuGroup;
		payload.location = menuConfig.name
		return payload;
	}

    getSuperAdministratorMenu(){
    	const adminMenuconfig = [
    		{name:"Template de mail", key:"emailTemplates", comp: this.mailTemplates(), visible: true, className:'fa-envelope-o', breadItems:[{href:'#/admin?v=emt&u=va', title:'Email templates'}], menuGroup: 'platformAdministration'},
 		  	{name:"Types métiers", key:"types", comp: this.types(), visible: true, className:'fa-cubes', breadItems:[{href:'#', title:'Business types'}], menuGroup: 'platformAdministration'},
 		  	{name:"Règles métiers", key:"businessRules", comp: this.businessRules(), visible: true, className:'fa-briefcase', breadItems:[{href:'#', title:'Business rules'}], menuGroup: 'platformAdministration'},
 			{name:"Cycles de vie", key:"lifecycles", comp: this.lifecycles(), visible: true, className:'fa-retweet', breadItems:[{href:'#', title:'Lifecycles'}], menuGroup: 'platformAdministration'},
 			//{name:"Folder templates", key:"folderTemplates", comp: this.folderTemplates(), visible: true, className:'fa-folder', breadItems:[{href:'#', title:'Folder templates'}], menuGroup: 'platformAdministration'},
 			{name:"Templates d'équipe", key:"teamTemplates", comp: this.teamTemplates(), visible: true, className:'fa-users', breadItems:[{href:'#', title:'Team templates'}], menuGroup: 'platformAdministration'},
 			{name:"Enumerations", key:"enumerations", comp: this.enumerations(), visible: true, className:'fa-list', breadItems:[{href:'#', title:'Enumerations'}], menuGroup: 'platformAdministration'},
 			{name:"Historique des batchs", key:"dataLoader", comp: this.dataLoader(), visible: true, className:'fa-exchange', breadItems:[{href:'#', title:'Jobs history'}], menuGroup: 'platformAdministration'},
 			{name:"Modules", key:"about", comp: this.about(), visible: true, className:'fa-info-circle', dividerAfter:true, breadItems:[{href:'#', title:'Installed modules'}], menuGroup: 'platformAdministration'},
 	  	];
 	  	return adminMenuconfig;
    }

    getHiddenMenu(){
    	const hiddenMenuConfig = [
    		{name:"Membres", key:"members", comp: this.members(), visible: true, className:'fa-users', breadItems:[{href:'#/admin?v=emailTemplates&u=va', title:'Members'}]},
 			{name:"Conteneurs", key:"manageContainers", comp: this.switchContainer(), visible: true, className:'fa-map-signs', breadItems:[{href:'#', title:'Containers'}]},
 	  	];
 	  	return hiddenMenuConfig;
    }

    strechedPage(comp){
    	return comp
    }

		goBackToListView(e){
    	e.preventDefault();
			let pathname = window.location.href.split('?')[0]

			const queryUrlParams = queryString.parse(this.props.location.search);
			let viewName = queryUrlParams.v;

			this.props.history.push(pathname.split('#')[1] + '?v=' + viewName);
		}

    render (){
        if(this.state.loading === true){
 		   return this.loading()
 	   }

 	   let errors = [];
 	   if(this.state.errors && this.state.errors.length > 0) {
 		   this.state.errors.map(error => {
 			   errors.push(<p>{error}</p>)
 		   })
 	   }

 	  var content, superAdministratorMenu = this.getSuperAdministratorMenu();
	  superAdministratorMenu.map(c => {if(c.key === this.state.viewName){content = c.comp}})
	  this.getHiddenMenu().map(c => {if(c.key === this.state.viewName){content = c.comp}})

 	  var configs = [], rows = [];
 	  if(this.state.menuGroup){
 	  	superAdministratorMenu.map(row => {
 	  		if(row.menuGroup === this.state.menuGroup){
 	  			configs.push(row);
 	  		}
 	  	})
 	  }

 	  configs.map(c => {
 		  var className ='fa fa-md ' + c.className;
 		  var t = (
 		  	<ListGroup.Item action active={this.state.viewName === c.key}
 		  			className="jsoagger-lgi-menu no-border"
 		  			onClick={e=>this.setDisplayedView(e, c.key)}>
 		  			<i className={className}></i>{c.name}
 		  	</ListGroup.Item>
 		  );

 		  rows.push(t);
 		  if(c.dividerAfter){
 			 rows.push(<div className="">&nbsp;</div>)
 		  }
 	  })

 	  var containerName = commons.getWorkingContainerName(this.props.userContext);
 	  var hasLeftMenu = configs && configs.length > 0;
 	  var lefttMenu = <div className={'admin-main-left-menu'}>
			  <div className={'main-left-child-fixed '}>
				  <div className={'secondary-context-menu'}>
					  {rows}

					  <DefaultFooter {...this.props} minimal={true}/>
				  </div>
			  </div>
		  </div>

			const queryUrlParams = queryString.parse(this.props.location.search);
	  	let rootId = queryUrlParams.rootId;

 	  return (<div className="admin-content-root">
			{hasLeftMenu && <div className="admin-content-left-root">
					<Sidebar
						rootClassName="root-sidebar"
						sidebarClassName="sidebar-content"
						overlayClassName="sidebar-overlay"
						sidebar={lefttMenu}
						open={this.state.sidebarOpen}
						onSetOpen={this.onSetSidebarOpen}
						docked={true}>
					</Sidebar>
				</div>
			 }

			  <div className="admin-content-right-root">
				 	<div className="admin-breadcrumb">
						<h2>
								<a href={'#'} onClick={(e)=>this.goBackToListView(e)}>
											{this.state.location}
											{rootId ? <FcUpLeft size={'1.5rem'}/> : <></>}
										</a>
								</h2>
						<div className="admin-breadcrumb-table">
							<AppBreadcrumb
								popBreadCrumb={(item)=>this.popBreadCrumb(item)}
								items={this.state.breadItems}
								homeUrlAction={(arg)=>this.selectHomePage(arg)}
								homeUrl="#/admin"
								homeLabel={containerName}/>
						</div>
					</div>
					{content}
				</div>
	      </div>
	    )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (GenericManagementPage)

export const setManagementPageSelectedTab = (payload) => ({
    type: 'SET_ADMIN_HOME_ACTIVE_TAB',
    payload: payload
});
