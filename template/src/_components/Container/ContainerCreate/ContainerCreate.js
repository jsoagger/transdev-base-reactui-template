import React, { Component } from 'react';
import { AttributeListGroup} from '_components';
import { containerService } from '_services/container.services.js';
import { commons } from '_helpers/commons.js';
import { toast } from 'react-toastify';

class ContainerCreate extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			formData: {
			},
			errors:[]
		}
		
		this.createContainer = this.createContainer.bind(this)
		this.attributesList = this.attributesList.bind(this);
		this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
	}
	
	async createContainer(formData) {
		this.setState({loading:true})
		
		var workingContainer = this.props.containerId;
		
		formData.parentContainerId = this.props.parentContainerId;
		formData.currentContainerId = workingContainer;
		formData.ownerId = commons.getCurrentUserAccountOwnerId(this.props.userContext);
		formData.typePath = 'io.github.jsoagger.Container/StandardContainer/PeopleOwnedContainer';
		
		//formData.type = 'io.github.jsoagger.Container/StandardContainer/OrganizationOwnedContainer';
		
		// if the user is connected, no user email in the form
		// if the user is no connected, user email must be in form
		// in order to create an account for this owner.
		if(!formData.ownerEmail){
			
		}
		
		containerService
		.createContainer(formData, this.props.parentContainerId)
		.then(response => {
			if(response.status === 200){
				var json  = response.json();
				this.handleSuccessResponse(json);
				return null;
			}

			var json = response.json();
			return json;
		})
		.then(json => {
			if(json){
				this.setState({
					loading: false,
					errors: [json.message],
					formData: formData
				})
			}
		})
	}
	
	handleSuccessResponse(json){
		this.setState({loading: false,})
		
		toast('Create success');
		let containerId = json && json.data && json.data.attributes ? json.data.attributes.id : '';
		if(this.props.onCreateContainerSuccess){
			this.props.onCreateContainerSuccess(containerId);
		}
	}
	/**
	 * Attributes list
	 */
	attributesList(){
        const attributesList = {
            title: 'Summary',
			formId: 'dt-form',
			saveButtonTitle: 'CREATE',
			onSubmit: (formData) => this.createContainer(formData),
            attributes: [
                {name: 'Name', dataField: 'name', required:true,  placeHolder: 'Name', pattern:"[-_ a-zA-Z0-9]+"},
    			{name: 'Description', dataField: 'description', type:'textarea', required: true, placeHolder: 'Description'},
            ]
        }
        
        return attributesList;
    }
	
   render() {
	   if(this.state.loading === true){
		   return 'Processing, please wait...'
	   }
	   
	   let errors = []
	   if(this.state.errors.length > 0) {
		   this.state.errors.map(error => {
			   errors.push(<p>{error}</p>)
		   })
	   }
	   
	  var formData ={...this.state.formData}
	  return (
			  <div className="container-create-root">
					<div id="form-errors-section" className="form-error">
						{errors}
					</div>
					<AttributeListGroup
						attributesListConfig={this.attributesList()}
						data={formData}
						standardFooterActions="true"
						formMode='create_object'/>
			  </div>
	   )
  }
}

export default ContainerCreate;


