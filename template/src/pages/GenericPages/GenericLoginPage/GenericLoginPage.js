import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from "react-jsonschema-form";
import Button from 'react-bootstrap/Button';
import { loginService } from '_services/login.services.js';
import { commons } from '_helpers/commons';
import ApplicationVersion  from '_components/ApplicationVersion/ApplicationVersion.js';
import ApplicationCopyright  from '_components/ApplicationVersion/ApplicationCopyright.js';
import * as actions from '_actions/actions.js';

/**
 * Format is 'store.reducer.state'
 */
const mapStateToProps = store => ({
	userContextRX: store.userContextStore.userContext
});

const mapDispatchToProps = (disptach) => ({
});

const rootUrl = 'home';
const LOGIN_JSON_UISCHEMA = {
   "login": {
        "ui:autofocus": "true",
        "ui:emptyValue": "",
        "ui:help": "Email or nickname",
        "ui:placeholder": "me@me.com"
   },
   "password": {
       "ui:widget": "password",
        "ui:emptyValue": ""
   }
}

const LOGIN_JSON_SCHEMA = {
	  "required": ["login", "password"],  
	  "type": "object",
	  "properties": {
	    "login": {
	        "type": "string", 
	        "title": "Login"
	    },
	    "password": {
	        "type": "string", 
	        "title": "Password",
	        "minLength": 3
	    }
	  }
}

const LOGIN_JSON_SCHEMA_NAME = "login_view_jsonschema";

/**
 * ClientLoginPage component
 */
class GenericLoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            loading: false,
            error: '',
            uischema: LOGIN_JSON_UISCHEMA,
            jsonschema: LOGIN_JSON_SCHEMA
        }
        
        this.handleResponseError = this.handleResponseError.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.logout = this.logout.bind(this);
        this.lostPass = this.lostPass.bind(this);
    }
    /**
     * Submit the form
     * 
     * @param {*} formdata 
     * @param {*} e 
     */
    async onSubmit(form, e){
        try {
        	
        	this.setState({processing: true})
        
            if(e) e.preventDefault();
            var jsonstring = JSON.stringify(form);
            var jsonobject = JSON.parse(jsonstring);
            var formData = jsonobject.formData;

            var response = await loginService
            .login(formData)
            .then(response => {
            	if(response.status !== 200){
            		this.handleResponseError(response);
            		return null;
            	}
            	else {
                    return response;
            	}
            })
            .catch(error => {
            	this.handleResponseError(error);
            });
            
            if(response){
	            var authorization = await response.text();
	            commons.setSessionId(authorization)
				this.props.history.push('/home')
	        }
	        else {
	        	this.setState({
	        		processing: false,
    				error: 'Login error, not authorized'
	        	})
	        }
        } catch(error){
            alert(error);
        }
    }
    
    logout(){
    	this.props.onlogout();
    	commons.jsoagger_core_logout();
    	loginService.logout();
    }
    
    handleResponseError(json){
    	this.setState({
    		processing: false,
    		error: 'Login error: Bad credentials.'
    	})
    }

    componentDidMount(){
    	commons.jsoagger_core_logout();
    	if(this.props.userToLogin) {
    		this.onSubmit(this.props.userToLogin);
    		this.setState({formRegister: true})
    		return;
    	}
    }
    /**
     * Redirect to lostPass
     */
    lostPass(e){
    	if(e) e.preventDefault()
    	window.location.href = '#/lostPass';
    }
    redirectHome(e){
    	if(e) e.preventDefault()
    	window.location.href = '#/' + rootUrl;
    }
    /**
     * Render the view
     */
    render () {
    	var buildVersion = process.env.REACT_APP_BUILD_VERSION,
    	buildDate = process.env.REACT_APP_BUILD_DATETIME;
    	
    	if(this.state.formRegister === true){
    		return <center>Loading...</center>
    	}

		var message;
    	
        return (<div id={'loginpage'} className={'login-page_root'}>
			<div className="loginpage-root">
				<h2 className="main-title">Connexion</h2>
				<div className="new-filter">
					<center>
						<p className="form-error">{this.state.error}</p>
						<p style={{color: 'red','font-size':'0.9rem','font-weight':'bold'}}>{message}</p>
					</center>

					{!this.state.loading && <>
						<Form schema={this.state.jsonschema}
							  uiSchema={this.state.uischema}
							  onSubmit={this.onSubmit}
							  formData={formData}
							  onError={onerror} >

							<Button className="login-button" type="submit">Se connecter&nbsp;<i class="fa fa-lock"></i></Button>
						</Form>

						<div className="footer-links">
							<Button onClick={e=>this.props.history.push('/register/an')}>Créer un compte</Button>
							<Button onClick={this.lostPass}>Mot de passe oublié?</Button>
							<Button onClick={e=>this.props.history.push('/home')}>Page d'accueil</Button>
						</div>
					</>
					}

					{ this.state.loading && <div>
						<i class="fa fa-spinner"></i>
					</div>
					}
				</div>
			</div>
			<div className={'footer-app-version'}>
				<ApplicationCopyright />
				<ApplicationVersion />
			</div>
        </div>);
    }
}

const formData = {login: "", password: ""};
const onerror = ({formData}, e) => {
	console.debug(e);
}


export default connect(mapStateToProps, mapDispatchToProps) (GenericLoginPage);



