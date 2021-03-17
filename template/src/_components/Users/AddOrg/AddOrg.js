import React, { Component } from 'react';
import { AttributeListGroup} from '_components';
import { accountService } from '_services/account.services.js';
import { loginService } from '_services/login.services.js';
import { commons } from '_helpers/commons.js';

/**
 * Register new org.
 */
class AddOrg extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			formData: {
				container: this.getRegisteringContainer(),
				withAccount: true,
				simpleUserForm: true,
				name: '',
				orgType: "io.github.jsoagger.people.Party/Organisation",
			},
			loading: false,
			errors:[]
		}
		
		this.registerAttributesList = this.registerAttributesList.bind(this)
		this.registerUser = this.registerUser.bind(this);
		this.handleResponse = this.handleResponse.bind(this)
		this.onFormChange = this.onFormChange.bind(this)
	}
	
	onFormChange(form){
		this.setState({formData: form})
	}
	
	getRegisteringContainer(){
		if(this.props.registeringContainer){
			return this.props.registeringContainer;
		}
		return this.props.containerId;
	}
	
	registerUser(formData) {
		this.setState({
			loading:true,
			formData: formData
		})
		
		formData.container = this.getRegisteringContainer();
		
		this.setPropsProcessing(true)
		
		if(!this.props.fromConnectedUser){
			accountService
			.registerOrgWithAccountAnon(formData)
			.then(response => {
				var json = response.json()
				return json;
			})
			.then(json => {
				this.handleResponse(json, formData)
			})
			.catch(error => {
				this.setState({loading: false})
				this.setPropsProcessing(false)
			});
		}
		else {
			accountService
			.registerOrgWithAccount(formData)
			.then(response => {
				var json = response.json()
				return json;
			})
			.then(json => {
				this.handleResponse(json, formData)
			})
			.catch(error => {
				console.error(error);
				this.setState({loading: false})
				this.setPropsProcessing(false)
			});
		}
	}
	
	setPropsProcessing(value){
		if(this.props.onProcessing){
			this.props.onProcessing(true)
		}
	}
	
	/**
	 * Handle save response.
	 */
	async handleResponse(json, formData){	
		let errorMessages = json.messages
		var errorStates = [];
		
		this.setPropsProcessing(false);
		
		if(commons.hasRESTErrorMessages(json) || (json.status && json.status === 500)){
			if((json.status && json.status === 500)){
				if(this.props.onError){
					this.props.onError(json.message)
					this.setState({loading: false})
				}
				else {
					this.setState({
						loading: false,
						errors: [json.message],
					})				
				}
			}
			else {
				errorStates = commons.getRESTErrorMessages(json)
				if(this.props.onError){
					this.props.onError(json.message)
					this.setState({loading: false})
				}
				else {
					this.setState({
						loading: false,
						errors: errorStates,
					})				
				}
			}
		}
		else {
			if(!this.props.fromConnectedUser){
				var loginForm = {};
				loginForm.login = formData.accountEmail;
				loginForm.password = formData.accountPassword;
				
				var response = await loginService
				.login(loginForm)
	            .then(response => {
	        		if(response.status !== 200){
	            		return null;
	            	}
	                
	                return response;
	            })
	            
	            var authorization = await response.text();
				commons.setSessionId(authorization)
	        	if(authorization) this.handleLoginSuccess(authorization);
	        }
	        else {
	        	this.setPropsProcessing(false)
				if(this.props.onCreatePeopleSuccess){
					this.props.onCreatePeopleSuccess()
				}
	        }
		}
	}
	
	async handleLoginSuccess(authorization){
		if(authorization){
   			loginService
   			.postLogin(authorization)
   			.then(json => {
   				return json;
   			})
   			.then(json => {	
   				commons.jsoagger_core_loginSuccess(json);

		        var account = JSON.parse(json.data.links.account)
		        var active = account.active;
		        if(active) {
		        	this.props.history.push('/home')  
		        }
		        else {
		        	let login = account.nickName;
		        	window.location.href = '#/activateAccount';
		        }
   			});
   		}
	}
	
	registerAttributesList(){
        const profileAttributesList = {
            title: 'Summary',
			formId: 'org_profileAttributesList_form',
			saveButtonTitle: 'CREATE ACCOUNT',
			addHeaderMargin: true,
			onSubmit: (formData) => this.registerUser(formData),
            attributes: [
                {name: 'Name', dataField: 'name',required:true,  placeHolder: 'Organization name'},
    			{name: 'Email', dataField: 'accountEmail', type:'email', required: true, placeHolder: 'Email'},
    			{name: 'Password', dataField: 'accountPassword', type:'password', required: true, placeHolder: 'Password'},
            ]
        }
        
        return profileAttributesList;
    }
	
   render() {
	   
	   return (<div className={'add-people'}>
			{this.state.loading !== true && <AttributeListGroup
				attributesListConfig={this.registerAttributesList()}
				data={this.state.formData}
				standardFooterActions="true"
				formMode='create_object'/>
			}
	   </div>)
  }
}

export default AddOrg;


