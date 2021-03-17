import React, { Component } from 'react';
import {AttributeListGroup,} from '_components';
import { Button, ButtonToolbar}from 'reactstrap' ;
import PropTypes from 'prop-types';
import {commons} from '../../_helpers/commons.js';
import { contactableService } from '_services/contactable.services.js';
import { toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge'

const propTypes = {
  businessId: PropTypes.string.isRequired,
};
const defaultProps = {
  businessId: ''
};
/**
 * Contactable component
 */
class Contactable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contacts:{},
			contactMecId: '',
			allContacts: []
		}
		
		this.updateWebContactsSuccess = this.updateWebContactsSuccess.bind(this)
		this.reloadContacts = this.reloadContacts.bind(this)
	}
	/**
	 * Update the web contacts array
	 */
	updateWebContacts(formData) {
		var form = "{\"webAddresses\":".concat(JSON.stringify(formData)).concat('}')
		contactableService
		.updateWebContacts(this.props.businessId, 
				this.state.contactMecId, 
				JSON.parse(form), this.props.containerId)
		.then(response => {
			this.updateWebContactsSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updateWebContactsSuccess(){}
	/**
	 * Update telecom contacts array
	 */
	updateTelecomContacts(formData){
		var form = "{\"telecomAddresses\":".concat(JSON.stringify(formData)).concat('}')
		contactableService
		.updateTelecomContacts(this.props.businessId, 
				this.state.contactMecId, 
				JSON.parse(form), this.props.containerId)
		.then(response => {
			this.updateTelecomContactsSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updateTelecomContactsSuccess(){}
	/**
	 * Update of postal address
	 */
	updatePostalContact(formData){
		contactableService
		.updatePostalContacts(this.props.businessId, 
				this.state.contactMecId, 
				formData, this.props.containerId)
		.then(response => {
			this.updatePostalContactSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updatePostalContactSuccess(){
		this.reloadContacts()
	}
	/**
	 * Title of postal address section
	 */
	postalAddressTitle = (data, config) => {
		var value = commons.getPropByString(data, 'label');
		return value;
	}
	
	async componentDidMount() {
		this.reloadContacts()
    }
	
	async reloadContacts(){
		contactableService
		.getAllContacts(this.props.businessId, this.props.containerId)
		.then(response => {
			
			if(response && response.metaData && response.metaData.totalElements > 0){
				this.setState({
					metaData: response.metaData,
					contactMecIndex: 0,
					contacts: response.data[0],
					contactMecId: response.data[0].attributes.id,
					allContacts: response.data
				})
			}
			else {
				this.setState({
					metaData: undefined,
					contacts: undefined,
					contactMecId: undefined
				})
			}
		})
	}

	fullContactView(){
		/**
    	 * Attributes list configuration
    	 * objectarray
    	 * stringarray
    	 */
    	const webAttributesList = {
    	    icon: 'fa fa-info float-right',
    	    formId: 'webAttributesList_form',
    	    onSubmit: (formData) => this.updateWebContacts(formData),
    	    borderLess: true,
    	    attributes: [
    	    	{
    	    		title: 'Email et réseaux sociaux', 
    	        	type: 'editableLabelObjectarray',
    	        	dataField: 'webAddress',
    	        	items: {
    	        		attributes: [
    	        			{name: 'Titre', dataField: 'title', type: 'string'},
    	        	        {name: 'Valeur', dataField: 'webAddress', type: 'string'},
    	        		]
    	        	},
    	    	},
    	    ],
    	};
    	
    	/**
    	 * Attributes list configuration
    	 * objectarray
    	 * stringarray
    	 */
    	const phonesAttributesList = {
    	    icon: 'fa fa-info float-right',
    	    formId: 'phonesAttributesList_form',
    	    onSubmit: (formData) => this.updateTelecomContacts(formData),
    	    borderLess: true,
    	    attributes: [
    	    	{
    	        	title: 'Coordonnées Téléphoniques', 
    	        	type: 'editableLabelObjectarray',
    	        	dataField: 'telecomAddress',
    	        	items: {
    	        		attributes: [
    	            		{name: "Title", type: 'string', dataField: 'title'},
    	            		{name: "Code pays", type: 'string', dataField: 'countryCode'},
    	            		{name: "Numéro", type: 'tel', dataField: 'telecomNumber'},
    	            	], 
    	        	},
    	    	},
    	   ],
    	};

    	const postalAddressAttributesList = {
    		title: 'Postal Address',
    		arrayTitleProvider: (data) => this.postalAddressTitle(data,this),
    		onSubmit: (formData) => this.updatePostalContact(formData),
    	    attributes: [
		    	 {name: 'Rue', dataField: 'address1', type: 'string'},
		    	 {name: '(Rue)', dataField: 'address2', type: 'string'},
		         {name: 'Code postale', dataField: 'postalCode', type: 'string'},
		         {name: 'Ville', dataField: 'city', type: 'string'},
		         {name: 'Pays', dataField: 'country', type: 'string'},
    	    ],
    	}

    	if(this.state.contacts && this.state.contacts.attributes){
    		
    		var additionalAttributesDisplay 
    		if(this.props.additionalAttributesDisplay){
    			additionalAttributesDisplay = this.props.additionalAttributesDisplay(this.state.contacts.links, this.state.contacts.attributes.id)
    		}
    		
	        return(
	            <React.Fragment>
	                <div>
	                	{additionalAttributesDisplay}
	                	<AttributeListGroup {...this.props} 
                			attributesListConfig={postalAddressAttributesList} 
                			data={this.state.contacts.attributes.postalAddress} 
                			displayHeader='true'
                			canEdit={this.props.canEdit}
                			standardFooterActions="true"
                			newObjectFormData={newPostalAddressFormData}/>
                    			
	                	{this.props.hideMobileContacts !== true && <AttributeListGroup {...this.props} 
	                		attributesListConfig={webAttributesList} 
	                		data={this.state.contacts.attributes}
	                		canEdit={this.props.canEdit}
	                		firstRowLabel='false'
	                		newObjectFormData={newWebFormData}/>
	                	}
	                	
	                	{this.props.hideMobileContacts !== true && <AttributeListGroup {...this.props} 
	                		attributesListConfig={phonesAttributesList} 
	                		data={this.state.contacts.attributes} 
	                		firstRowLabel='true' 
	                		canEdit={this.props.canEdit}
	                		newObjectFormData={newPhoneFormData}/>
	                	}
	                </div>
	            </React.Fragment>
	        )
    	}
    	if(this.props.emptyContacts){
			return <div>
				{this.props.emptyContacts()}
			</div>
		}
    	return <></>
	}
	summaryContactView(){
		if(this.state.contacts && this.state.contacts.attributes){
			var postal = this.state.contacts.attributes.postalAddress;
			
			var additionalAttributesDisplay 
    		if(this.props.additionalAttributesDisplay){
    			additionalAttributesDisplay = this.props.additionalAttributesDisplay(this.state.contacts.links,  this.state.contacts.attributes.id)
    		}
    		
			return <div>
					{additionalAttributesDisplay}
					<p><span>{postal.address1} </span> <span>{postal.address2} </span></p>
					<p><span>{postal.postalCode}, </span> <span>{postal.city}. </span></p>
					<p><span>{postal.country}</span></p>
				</div>
		}
		if(this.props.emptyContacts){
			return <div>
				{this.props.emptyContacts()}
			</div>
		}
		
		return <></>
	}
	
	async selectNextContactMecView(e){
		if(e) e.preventDefault();
		var index = this.state.contactMecIndex + 1;
		if(index >= this.state.allContacts.length){
			index = 0;
		}
		
		var contact = this.state.allContacts[index];
		this.setState({
			contactMecIndex: index,
			contacts: contact,
			contactMecId: contact.attributes.id,
		})
	}
	
    render() {
    	if(this.props.viewMode === 'summary'){
    		return this.summaryContactView()
    	}
    	else {
    		
    		var badge = <>&nbsp;&nbsp;&nbsp;</>;
    		if(this.state.allContacts.length > 0){
    			badge = <Badge pill variant="warning">{this.state.allContacts.length}</Badge>
    		}
    	
    		return <> 
    			<div>
    				{this.state.allContacts.length > 1 && this.props.canSwitch && <ButtonToolbar className="justify-content-start mb-4">
						<Button  onClick={e => this.selectNextContactMecView(e)}>
							{badge}&nbsp;NEXT ADDRESS &nbsp;
							<i className="fa fa-angle-right fa-lg"></i>
						</Button>
						</ButtonToolbar>
					}
    			</div>
    			<div>
    				{this.fullContactView()}
    			</div>
    		</>
    	}
	}
}

 
const newWebFormData = {
		'label':'', 'value': ''
}
const newPhoneFormData = {
		'label':'', 'number': '', 'country': ''
}
const newPostalAddressFormData = {
		'id':'', 'label': 'New postal address','street': '', 'code':'', 'county': ''
}

const postalAddressUIConfig = {
		'role': {
			'enumKey' : 'contactMechanismRole',
			'ui:widget': 'select'
		},
		'country': {
			'enumLoader' : 'loadCountries()',
			'ui:widget': 'select'
		}
}


Contactable.propTypes = propTypes;
Contactable.defaultProps = defaultProps;


export default Contactable;

