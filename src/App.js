import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import {WaitingPane } from '_components';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const AdminLayout = React.lazy(() => import('./containers/Core/AdminLayout/AdminLayout'));
const GenericHomeLayout = React.lazy(() => import('./containers/Core/GenericHomeLayout/GenericHomeLayout'));
const LoginLayout = React.lazy(() => import('./containers/Core/LoginLayout'));

// history
export const browserHistory = createBrowserHistory();
const rootUrl = 'home';
const loading = () => <div className="animated fadeIn pt-3 text-center"><WaitingPane /></div>;

/**
 * This is the first component displayed in the application.
 *
 * Following pages are public (not auth required): login, register, lostpass,404,500.
 *
 * Other pages are private
 */
class App extends Component {

	constructor(props) {
        super(props);
    }

    componentDidMount(){
    	window.addEventListener('storage', e => {
   			if(e.key === 'session_id') {
   				setTimeout(window.location.reload(), 1000);
    		}
		});
    }

  	render() {
	    return (
	      <HashRouter history={browserHistory}>
	          <React.Suspense fallback={loading()}>
	            <Switch>
	            	<Route exact path="/login" name="Login" render={props => <LoginLayout {...props}/>} />
	            	<Route exact path="/logout" name="Logout" render={props => <LoginLayout {...props}/>} />
					<Route exact path="/register/:source" name="Logout" render={props => <LoginLayout {...props}/>} />
	            	<Route path={'/lostPass'} name="Lost password" component={LoginLayout} />
					<Route path={'/lostPassword'} name="Lost password" component={LoginLayout} />
	            	<Route path={'/' + rootUrl} name="Accueil" component={GenericHomeLayout} />
	            	<Route path={'/' + rootUrl + '/desktop'} exact name="Desktop" component={GenericHomeLayout} />
	            	<Route path={'/' + rootUrl + '/mobile'} exact name="Mobile" component={GenericHomeLayout} />
	            	<Route path={'/' + rootUrl + '/profile'} name="Profile" component={GenericHomeLayout} />

					<Route path={'/admin'}  name="Admin" component={AdminLayout} />
	            	<Route path='*' name="Unkown" component={GenericHomeLayout} >
						<Redirect to={{ pathname: '/home' }} />
					</Route>
	            </Switch>
	          </React.Suspense>
	      </HashRouter>
	    );
  }
}

export default App;
