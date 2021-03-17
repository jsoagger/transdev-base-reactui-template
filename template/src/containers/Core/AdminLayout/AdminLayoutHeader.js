import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThumbInfo} from '_components';
import { connect } from 'react-redux';
import {Nav, Navbar} from 'react-bootstrap'
import { RiExternalLinkLine, RiLogoutBoxLine, RiUserLine } from "react-icons/ri";
import logo from '../../../assets/img/brand/logo_blanc.svg'
import * as actions from '_actions/actions.js';
import queryString from 'query-string';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const mapStateToProps = store => ({
	searchCriterias: store.headerSearchComp.criterias,
	managementPageSelectedTab: store.navigationConfig.config,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchResults: (e) => disptach(actions.updateHeaderSearchCompSearchResults(e)),
	setManagementPageSelectedTab: (e) => disptach(setManagementPageSelectedTab(e)),
})

class DefaultHeader extends Component {

	constructor(props){
		super(props);

		var activeMenu;
		if(this.props.managementPageSelectedTab){
			activeMenu = this.props.managementPageSelectedTab.menuGroup !== null
				? this.props.managementPageSelectedTab.menuGroup : this.props.managementPageSelectedTab.viewName
		}
		else {
			activeMenu = 'platformAdministration';
		}

		this.state = {
			dataLoaded: false,
			activeMenu: activeMenu
		}

		this.updateSearchResults = this.props.updateSearchResults.bind(this)
		this.doNothing = this.doNothing.bind(this)
	}

	componentDidUpdate(){
		if(this.props.managementPageSelectedTab){
			if(this.props.managementPageSelectedTab.menuGroup !==  null &&
				this.props.managementPageSelectedTab.menuGroup !== this.state.activeMenu){

				this.setState({
					activeMenu: this.props.managementPageSelectedTab.menuGroup
				})
			}
			else if(this.props.managementPageSelectedTab.menuGroup == null &&
				this.props.managementPageSelectedTab.viewName !== this.state.activeMenu){
					this.setState({
						activeMenu: this.props.managementPageSelectedTab.viewName
					})
			}
		}
	}

    componentDidMount(){
    	this.setState({dataLoaded: true})

    	// default search type
    	// set default search type for application
    	const defaultType = {
                displayName: 'Product',
                businessClass: 'io.github.jsoagger.core.shop.ProductInstance',
                rootType: 'io.github.jsoagger.product.ProductInstance',
                headerMessage: 'Search for products...'
        }

    	// if not set only
    	localStorage.setItem('adminSearchType', JSON.stringify(defaultType))
    }

    doNothing(e){
    	e.preventDefault();
    	return false;
    }

    selectMenuContainers(activeMenu){
		this.props.history.push('/admin?v=manageContainers')
    }

    selectMenuPlatformAdmin(activeMenu){
		this.props.history.push('/admin?v=emailTemplates')
    }

    selectMembers(activeMenu){
		this.props.history.push('/admin?v=members')
    }

    render() {
    	if(this.state.dataLoaded === true){
    		var workingContainer = this.props.containerId
        	var searchType = JSON.parse(localStorage.getItem('adminSearchType'));
    	    	var	wc = workingContainer.id,
    	        	picart = this.props.productsInCartRX ? this.props.productsInCartRX.length : 0;

    	    	var badge;
    	    	if(picart > 0){
    	    		badge = <span class="badge badge-danger jsoagger-cart-badge">{picart}</span>
    	    	}

    	    	var placeHolder = searchType.headerMessage,
    	    	t = this.props.searchCriterias;

    	    	var id = this.props.userWorkingContainer
    	    		&& this.props.userWorkingContainer.container
    				? this.props.userWorkingContainer.container.id : this.props.containerId;

    	    	var thumb = <ThumbInfo thumbedId={id}
    				resize={true}
    				width="40" height="40"/>

    			// superadmin can switch container
    	    	// admin manages his container
    	    	var hiddenStyle, superadminurl ="";
    	    	if(this.state.isSuperAdmin){
    	    		hiddenStyle = 'display:none'
    	    	    superadminurl = <Nav.Link className="mr-1">
        				<NavLink to="/admin/switchContainers" className="white-color">Switch</NavLink>
        			</Nav.Link>
    	    	}

				let params = queryString.parse(this.props.location.search)

    	    	var platformAdminSelected = params.v !== 'manageContainers' &&  params.v !== 'members';
    	    	var containersAdminSelected = params.v === 'manageContainers';
    	    	var membersAdminSelected = params.v === 'members';

    	        return (
    	       		<div className={'admin-header-main'}>
						<div className={'admin-header-left'}>
							<div className={'logo-container'}>
								 <Navbar.Brand href="#/home" >
									<img src={logo} height="" className="d-inline-block align-top" alt="JSOAGGER.tech"/>
								</Navbar.Brand>
							</div>
							<div className={'admin-header-links admin-header-links-left'}>
								<Nav.Link href="#/admin" onClick={e=>this.selectMenuPlatformAdmin('platformAdministration')} className={platformAdminSelected ? 'admin-header-link header-menu-active' : 'admin-header-link'}>
									<span>{this.props.userContext.workingContainer.name}</span>
								</Nav.Link>

								<Nav.Link onClick={e=>this.selectMembers('members')} className={membersAdminSelected ? 'admin-header-link admin-header-link-user header-menu-active' : 'admin-header-link admin-header-link-user'}>
									<span>MEMBRES</span>
								</Nav.Link>
								<Nav.Link onClick={e=>this.selectMenuContainers('manageContainers')} className={containersAdminSelected ? 'admin-header-link admin-header-link-user header-menu-active' : 'admin-header-link admin-header-link-user'}>
									<span>CONTENEURS</span>
								</Nav.Link>
							</div>
						</div>
    	                <div className="admin-header-links admin-header-links-right">
							<Nav.Link className="admin-header-link nav-link">
								<RiUserLine size={'2em'}/>
							</Nav.Link>

							<Nav.Link href="#/home" className="admin-header-link nav-link">
    	                		<div style={{transform: 'rotate(-90deg)'}}>
			    	    			<RiExternalLinkLine size="2em"/>
			    	    		</div>
    	                	</Nav.Link>
    	                	<Nav.Link href="#/login" className="admin-header-link nav-link">
	                			<RiLogoutBoxLine size="2em"/>
	                		</Nav.Link>
    	                </div>
    	           </div>
    	    );
    	}

    	return(
    			<div>Loading...</div>
    	)
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (DefaultHeader);

export const setManagementPageSelectedTab = (payload) => ({
    type: 'SET_ADMIN_HOME_ACTIVE_TAB',
    payload: payload
});
