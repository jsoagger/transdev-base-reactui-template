import React, { Component } from 'react';
import { AttributeListGroup} from '_components';
import { accountService } from '_services/account.services.js'
import { loginService } from '_services/login.services.js';
import { commons } from '_helpers/commons.js';

/**
 * Register new people.
 */
class AddPerson extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			formData: {
				container: this.getRegisteringContainer(),
				gender: this.props.gender,
				lastName: '',
				firstName: '',
				withAccount: true,
				simpleUserForm: true,
				accountEmail:'',
				accountPassword: '',
				peopleType: 'io.github.jsoagger.people.Party/Person',
			},
			
			loading:false,
			errors:[]
		}
		
		this.registerAttributesList = this.registerAttributesList.bind(this)
		this.registerUser = this.registerUser.bind(this);
		this.handleResponse = this.handleResponse.bind(this)
		this.setPropsProcessing = this.setPropsProcessing.bind(this)
		this.onFormChange = this.onFormChange.bind(this)
	}
	
	onFormChange(form){
		this.setState({formData: form})
	}
	
	getRegisteringContainer(){
		return this.props.containerId;
	}
	
	registerUser(formData) {
		this.setState({
			loading: true,
			formData: formData
		})
		
		formData.container = this.getRegisteringContainer();
		formData.gender = this.props.gender;
		
		this.setPropsProcessing(true)
		
		if(!this.props.fromConnectedUser){
			accountService
			.registerPersonWithAccountAnon(formData)
			.then(response => {
				var json = response.json()
				return json
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
			.registerPersonWithAccount(formData)
			.then(response => {
				var json = response.json()
				return json;
			})
			.then(json => {
				this.handleResponse(json, formData)
			})
			.catch(error => {
				this.setState({
					loading: false,
					errors: ['Erreur interne']
				})
				this.setPropsProcessing(false)
			});
		
		}
	}
	
	setPropsProcessing(value){
		if(this.props.onProcessing){
			this.props.onProcessing(value)
		}
	}
	
	/**
	 * Handle save response.
	 */
	async handleResponse(json, formData){
		let errorStates = []
		
		if(commons.hasRESTErrorMessages(json) || (json.status && json.status === 500)){
			this.setPropsProcessing(false);
			if((json.status && json.status === 500)){
				if(this.props.onError){
					this.props.onError(json.message)
					this.setState({
						loading: false,
						formData: formData
					})
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
	
	handleLoginSuccess(authorization){
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
		        	this.props.history.replace('/home')  
		        }
		        else {
		        	let login = account.nickName;
		        	window.location.href = '#/activateAccount';
		        }
   			});
   		}
	}
	
	/**
	 * Attributes list
	 */
	registerAttributesList(){
        const profileAttributesList = {
            title: 'Summary',
			saveButtonTitle: 'CREATE ACCOUNT',
			onSubmit: (formData) => this.registerUser(formData),
            attributes: [
                {name: 'Lastname', dataField: 'lastName', required: true, placeHolder: 'Last name'},
                {name: 'Firstname', dataField: 'firstName', required: true, placeHolder: 'First name'},
    			{name: 'Email', dataField: 'accountEmail', type:'email', required: true, placeHolder: 'Email'},
    			{name: 'Password', dataField: 'accountPassword', type:'password', required: true, placeHolder: 'Password'},
            ]
        }
        
        return profileAttributesList;
    }
	
   render() {
	   
	   var form = {...this.state.formData}
	   return (<>
			{this.state.loading !== true &&  <AttributeListGroup
				attributesListConfig={this.registerAttributesList()}
				data={form}
				onFormChange={this.onFormChange}
				standardFooterActions="true"
				formMode='create_object'/>
			}
	   </>)
  }
}

export default AddPerson;


