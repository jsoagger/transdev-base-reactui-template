import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { commons } from '_helpers/commons.js';
import {Nav} from 'react-bootstrap';
import { RiExternalLinkLine, RiLogoutBoxLine, RiUserLine,RiLoginBoxLine,} from "react-icons/ri";
import {coreUri} from '_helpers/CoreUri.js'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
const rootUrl = 'home';

/**
 * Header navigation bar definition client layout
 */
class GenericHomeLayoutHeader extends Component {

	constructor(props){
		super(props)
		this.state = {
			dataLoaded: true,
			activeMenu: 'home'
		}

		this.toHome = this.toHome.bind(this)
		this.toHomeDesktop = this.toHomeDesktop.bind(this)
		this.toHomeMobile = this.toHomeMobile.bind(this)
	}

    toHome(){
    	this.setState({activeMenu: 'home'})
    }

    toHomeDesktop(){
    	this.setState({activeMenu: 'homeDesktop'})
    }

    toHomeMobile(){
    	this.setState({activeMenu: 'homeMobile'})
    }

    toProfile(e){
    	if(e) e.preventDefault();
      this.props.history.push(coreUri.profileHomeUri(commons.getCurrentUserAccountId(this.props.userContext)))
    }

    render() {

    	var homeUrl = "#/" + rootUrl;
		var adminUrl = "#/admin";

		var user = commons.hasRoleUser(this.props.userContext);
		var reader = commons.hasRoleReader(this.props.userContext);

		var profileMenu, profileMenuClass;
    	if(user || reader || commons.hasRoleAdmin(this.props.userContext)) {
	    	profileMenu =  <Nav.Link className='admin-header-link' onClick={() => this.toProfile()}>
	    			<RiUserLine size="2em"/>
            </Nav.Link>
    	}

		var isWorkingContainerAdmin = commons.hasRoleAdmin(this.props.userContext) || commons.hasRoleSuperAdmin(this.props.userContext)
	    var adminMenu;
	    if(isWorkingContainerAdmin){
	    	adminMenu = <Nav.Link href={adminUrl} className="admin-header-link">
	    			<RiExternalLinkLine size="2em"/>
			</Nav.Link>
	    }

	    var loginLogoutMenu;
	    if(!user && !reader && !isWorkingContainerAdmin) {
	    	loginLogoutMenu = <Nav.Link href="#/login" className="admin-header-link">
                <RiLoginBoxLine size="2em"/>
            </Nav.Link>
	    }
	    else {
	    	loginLogoutMenu = <Nav.Link href="#/login" className='admin-header-link'>
	    		<RiLogoutBoxLine size="2em"/>
            </Nav.Link>
	    }

		var location = window.location.href
    	var desktopMenuActive = location.includes('/desktop') ? 'admin-header-link active' : 'admin-header-link'
    	var mobileMenuActive = location.includes('/mobile') ? 'admin-header-link active' : 'admin-header-link'
		var homeActive = location.endsWith('/home') ? 'admin-header-link active' : 'admin-header-link'

        return (
			<div className="admin-header-main">
				<div className="admin-header-left">
					<div className="logo-container">
						<img src={process.env.PUBLIC_URL + '/assets/logo_blanc.png'} alt="JSOAGGER"/>
	            	</div>

					<div className="admin-header-links admin-header-links-left">
						<Nav.Link href={homeUrl} className={homeActive} onClick={this.toHome}>
							HOME
						</Nav.Link>

						<Nav.Link href="#/home/desktop" className={desktopMenuActive} onClick={this.toHomeDesktop}>
								DESKTOP APP
						</Nav.Link>

						<Nav.Link href="#/home/mobile" className={mobileMenuActive} onClick={this.toHomeMobile}>
								MOBILE APP
						</Nav.Link>
					</div>
				</div>

				<div  className="admin-header-links admin-header-links-right">
					{profileMenu}
					{adminMenu}
					{loginLogoutMenu}
				</div>
			</div>
	    );

		return <div className="header-main"></div>
    }
}

GenericHomeLayoutHeader.propTypes = propTypes;
GenericHomeLayoutHeader.defaultProps = defaultProps;

export default GenericHomeLayoutHeader;
