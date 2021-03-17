import React, { Component } from 'react';
import { AddOrg, AddPerson, WaitingPane } from '_components';
import { Form } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

/**
 * Register new people.
 */
class AddPeople extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			peopleSimpleType: "0",
			step: 0,
			errors: [],
			processing: false
		}
		
		this.handleSelectTypeChange = this.handleSelectTypeChange.bind(this)
		this.processing = this.processing.bind(this)
		this.onError = this.onError.bind(this)
	}
	
	processing(value){
		this.setState({processing: value})
	}
	
	handleSelectTypeChange(event){
		this.setState({
			peopleSimpleType: event.target.value
		})
	}
	next(){
		this.setState({
			step: 1
		})
	}
	getStepContent(){
		var content
		if(this.state.peopleSimpleType === "0" 
			|| this.state.peopleSimpleType === "1"){
			content = <AddPerson 
				{...this.props} 
				onProcessing={this.processing}
				onError={this.onError}
				gender={this.state.peopleSimpleType}
				displayHeader={false}/>
		}
		else {
			content = <AddOrg 
				{...this.props} 
				onError={this.onError}
				onProcessing={this.processing}
				gender={this.state.peopleSimpleType}
				displayHeader={false}/>
		}
		
		return content;
	}
	
	onError(error){
		var errors = []
		errors.push(error)
		this.setState({
			errors: errors,
			processing: false,
		})
	}
	
    render() {
	   if(this.state.loading === true){
		   return <WaitingPane />
	   }
	   
	 	var row0 = <Form.Group controlId="createPeopleType">
              	<Form.Label>Gender</Form.Label>
	            <Form.Control as="select"
	            	  value={this.state.peopleSimpleType}
	            	  onChange={this.handleSelectTypeChange} 
	              	  name="peopleSimpleType">
	                <option value="0">Mr</option>
	                <option value="1">Ms</option>
	                <option value="2">Organization</option>
	            </Form.Control>
	   </Form.Group>

		
		let errors = [];
	  	if(this.state.errors.length > 0) {
		   this.state.errors.map(error => {
			   errors.push(<p>{error}</p>)
		   })
	   	}
			   
	  return <div> 
	  	
	  	<center id="form-errors-section" className="form-error">
  			{errors}
  		</center>
  		
  		{this.state.processing && <>
  				<Spinner animation="border" variant="primary" />
  				<p>Creating your account, please wait...</p>
  		</>}
	  
	  	{!this.state.processing && row0}
	  	{this.getStepContent()}
	  </div>
  }
}

export default AddPeople;
