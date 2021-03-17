import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// routes config
import routes from '../../../routes/allRoutes';
const Page404 = React.lazy(() => import('pages/CommonPages/Page404/Page404'));

const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
	searchResults: store.headerSearchComp.searchResults,
	userContextRX: store.userContextStore.userContext
});

class LoginLayout extends Component {
	
   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

   signOut(e) {
	   e.preventDefault()
	   this.props.history.push('/login');
   }
   
  render() {
	let mainContent = (
		<div id="jsoagger-main-content">
			<Suspense fallback={this.loading()}>
					<Switch>
					  {routes.map((route, idx) => {
						return route.component ? (
							  <Route
								key={idx}
								path={route.path}
								exact={route.exact}
								name={route.name}
								render={props => (
								  <route.component {...props} userContext={this.props.userContextRX}/>
								)} />
							) : (<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									render={props => (
									  <Page404 {...props} />
									)}
								 />)
						})
					  }
					</Switch>
			</Suspense>
	     </div>
	)
	
    return (
      <div className="app">
		  {mainContent}
      </div>
    );
  }
}

export default connect(mapStateToProps) (LoginLayout);

