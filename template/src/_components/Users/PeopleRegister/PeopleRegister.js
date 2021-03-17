import React, { Component } from 'react';
import { AttributeListGroup, WaitingPane} from '_components';
import { accountService } from '_services/account.services.js'
import Page500  from 'pages/CommonPages/Page500'
import './PeopleRegister.css'
import * as actions from '_actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
});

const mapDispatchToProps = (disptach) => ({
	dologin: (e) => disptach(actions.doLoginUser(e)),
});

/**
 * Register new people.
 * Be aware set a default container if register from login page.
 * When in login page, the container in not set on backing storage 
 */
class PeopleRegister extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			formData: {
				'container': this.props.containerId,
				'peopleType': 'io.github.jsoagger.people.Party/Person',
				'withAccount': true,
				'simpleUserForm': 'true',
				'accountPassword':'',
				'source':'',
				'accountRepeatPassword':'',
				'accountEmail': ''
			},
			errors:[]
		}
		
		this.registerAttributesList = this.registerAttributesList.bind(this);
		this.registerUser = this.registerUser.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
		this.processing = this.processing.bind(this);
		this.endProcessing = this.endProcessing.bind(this);
	}
	processing(){
		this.setState({
			processing:true,
			done: false // must be false
		})
	}
	endProcessing(){
		this.setState({
			processing:false,
			done: false // must be false
		})
	}
	registerUser(formData) {
		formData.accountSource = this.state.source;
		this.processing();
		
		accountService
		.registerPersonWithAccount(formData)
		.then(response => {
			this.endProcessing();
			var json = response.json()
			return json
		})
		.then(json => {
			this.endProcessing();
			this.handleResponse(json, formData)
		})
		.catch(error => {
			this.endProcessing();
			console.error(error)
		});
	}
	/**
	 * Handle save response.
	 * 1. If register from login => autologin and redirect to profile page
	 * 2. If register from logged user => redirect to profile 
	 */
	handleResponse(json, formData){
		let errorMessages = json.messages
		let errorStates = []
		if(errorMessages && errorMessages.length > 0){
			errorMessages.map(mes => {
				if(mes.detail !== undefined && mes.detail !== null && mes.detail !== 'null'){
					errorStates.push(mes.detail)
				}
			})
		}
		// user was added by a connected user
		else if(this.state.source === 'cu') {
			let userAccountId = json.data.links.account.id
			window.location.href = '#/admin/p/containerMembers/details/' + userAccountId + '/?welcome=true';
		}
		// user was created from login view
		// new account created by the user itself
		else if(this.state.source === 'an') {
			let userAccountId = json.data.links.account.id
			this.setState({
				done: true
			})
			
			var form = {
				formData: {
					login: formData.accountEmail,
					password: formData.accountPassword,	
				}
			}
			
			this.props.dologin(form);
			// window.location.href is mandatory
			// it will load login page, bu, as we did this.props.dologin
			// in the line above, the login page willnot be displayed
			// but a login to remove server will be called.
			window.location.href = '#/login/?welcome=true';
		}

		this.setState({
			errors: errorStates,
			formData: formData
		})
	}
	/**
	 * Attributes list
	 */
	registerAttributesList(){
        const profileAttributesList = {
            title: 'Summary',
			icon: 'fa fa-info float-right',
			formId: 'profileAttributesList_form',
			addHeaderMargin: true,
			onSubmit: (formData) => this.registerUser(formData),
			saveButtonTitle: "Create account",
			processing: () => this.processing(),
			endProcessing: () => this.endProcessing(),
            attributes: [
                {name: 'Gender', dataField: 'gender', type:'select', enumProvider: () => this.gendersEnums()},
                {name: 'Lastname', dataField: 'lastName', type:'string'},
                //{name: 'Middlename', dataField: 'middleName', type:'string'},
                {name: 'Firstname', dataField: 'firstName', type:'string'},
                //{name: 'Birth date', dataField: 'birthDate', type:'date'},
                //{name: 'Birth place', dataField: 'birthPlace', type:'string'},
                {
                	dataField: 'account', type:'object',
            		items: [
            			{name: 'Email', dataField: 'accountEmail', type:'string'},
            			{name: 'Password', dataField: 'accountPassword', type:'password'},
            			{name: 'Repeat password', dataField: 'accountRepeatPassword', type:'password'},
                    ]
                }
            ]
        }
        
        return profileAttributesList;
    }
	
	gendersEnums(){
		return genderEnum;
	}
	
	componentDidMount(){
		// 2 sources for registering:
	   // 1. from login page (anonymous: an)
	   // 2. user created by admin (connected user: cu)
	   var source = this.props.match.params.source
	   this.setState({
		   source: source ? source : 'an' 
	   })
	}
	
   render() {
	   if(this.state.source === undefined){
		   return <Page500 />
	   }
	   
	   if(this.state.source !== 'an' && this.state.source !== 'cu') {
		   return <Page500 />
	   }
		   
	   let errors = []
	   if(this.state.errors.length > 0) {
		   this.state.errors.map(error => {
			   errors.push(<p>{error}</p>)
		   })
	   }
	   
	   var header, content;
	   if(this.state.source === 'an'){
		   header = <h3>Register</h3>
	   }
	   
	   if(this.state.processing === true){
			content = <WaitingPane />   
	   }
	   else {
		   content = (
		   		<AttributeListGroup 
					attributesListConfig={this.registerAttributesList()} 
					data={this.state.formData}
					standardFooterActions="true"
					formMode='create_object'/>
		   )
	   }
	     
	   var buildVersion = process.env.REACT_APP_BUILD_VERSION,
	   buildDate = process.env.REACT_APP_BUILD_DATETIME;

	   var template = (<>
				<div>
					{header}
					<div id="form-errors-section" className="form-error">{errors}</div>
					<div>{content}</div>
				 </div>
		   </>
		)
		
	  return template
  }
}


const genderEnum = [{'key':'0', 'value':'M'}, {'key':'1', 'value':'F'}]

export default connect(mapStateToProps, mapDispatchToProps) (PeopleRegister);

