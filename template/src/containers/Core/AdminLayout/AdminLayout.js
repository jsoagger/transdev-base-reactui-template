import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {DefaultFooter} from '_components';
import { commons } from '_helpers/commons.js';
import routes from '../../../routes/allRoutes.js';

const DefaultHeader = React.lazy(() => import('./AdminLayoutHeader'));

const mapStateToProps = store => ({
	userContextRX: store.userContextStore.userContext
});

const mapDispatchToProps = (disptach) => ({
})

class AdminLayout extends Component {
	
	constructor(props){
		super(props)
	}

   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

   signOut(e) {
	   e.preventDefault()
	   this.props.history.push('#/login');
   }
   
   render() {
	  
	  if(!commons.jsoagger_core_isUserConnected(this.props.userContextRX)){
		return <Redirect to={{ pathname: '/login'}} />
	  }
	  
	  if(!commons.hasRoleAdmin(this.props.userContextRX) && !commons.hasRoleSuperAdmin(this.props.userContextRX)){
		return <Redirect to={{ pathname: '/home'}} />
	  }
	  
	  let mainContent = (
		  <div id="admin-main-content" className="admin-main-content">
	         	<Suspense fallback={this.loading()}>
	                 <Switch>
	                   {routes.map((route, idx) => {
	                 	  return  <Route
	 			                        key={idx}
	 			                        path={route.path}
	 			                        exact={route.exact}
	 			                        name={route.name}
	 			                        render={props => (
	 			                          <route.component {...props}
														   containerId={this.props.userContextRX.workingContainer.id}
														   userContext={this.props.userContextRX}/>
	 			                        )} />
	 			                   
	                   		})
	                   }
	                 </Switch>
	            </Suspense>
	     </div>
	)
	
    return (
		<div className="app admin-app">
			<div className="app-header">
				<DefaultHeader onLogout={e => this.signOut(e)}
							   {...this.props}
							   containerId={this.props.userContextRX.workingContainer.id}
							   userContext={this.props.userContextRX}/>
			</div>

			<div className="app-body">
				{mainContent}
			</div>

			<DefaultFooter  {...this.props}
							containerId={this.props.userContextRX.workingContainer.id}
							userContext={this.props.userContextRX}/>

			<ToastContainer autoClose={3000}
					hideProgressBar={true}
					position="top-right"
					newestOnTop={false}
					draggable
					closeOnClick/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminLayout);

