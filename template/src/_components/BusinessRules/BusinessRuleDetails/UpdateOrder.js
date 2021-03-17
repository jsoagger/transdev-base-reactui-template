/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	Label,
	Form,
	Col, Container,
	Input, InputGroup,
	Row
}
from 'reactstrap';
import { businessRulesService } from '_services/business.rule.services.js';
import { toast } from 'react-toastify';


class UpdateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  businessRuleId: props.businessRuleId,
	  formData: {
		  oldOrder: props.oldOrder,
		  order: props.oldOrder,
	  },
	  formError: ''
    };

	this.toggle = this.toggle.bind(this);
	this.doUpdate = this.doUpdate.bind(this);
	this.handleFormChange = this.handleFormChange.bind(this)
	this.updateSuccess = this.updateSuccess.bind(this)
  }
  
  handleFormChange(event) {
	var formadata = JSON.parse(JSON.stringify(this.state.formData))
	formadata[event.target.name] = event.target.value	
	this.setState({
		formData: formadata,
	})
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  doUpdate(e) {
  	var form = {};
  	form.order = this.state.formData.order;
  	
	businessRulesService
	.setOrder(this.state.businessRuleId, form, this.props.containerId)
	.then(response => {
		if(response.status == 200){
			this.updateSuccess();
		}
		else {
			this.updateError();
		}
	})
	.catch(error => {
		this.toggle();
		toast.error('Error when updating order!')
		console.error(error)
	});
  }
  
  updateSuccess(){
	this.toggle()
	toast.success('Order update success')
	if(this.props.onUpdateSuccess){
		this.props.onUpdateSuccess(true);
	}
  }
  
  updateError(){
  	toast.success('Order updat error')
  	this.setState({
		formError: 'Incorrect order'
	})
  }
	                	
  render() {
    return (
      <div>
        <Button className="ml-2 mr-2 action-button" onClick={this.toggle}><i className="fa fa-pencil fa-sm"></i>&nbsp;UPDATE ORDER</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
         	 <ModalHeader toggle={this.toggle}>UPDATE ORDER</ModalHeader>
         	 <div className="border-bottom"/>
          
          <ModalBody>
          <Row>
          		<Col md="12" lg="12" xl="12">
          			<Label className="form-error">{this.state.formError}</Label>
          		</Col>
          	</Row>
          	<Row>
	          <Col md="12" lg="12" xl="12">
	            <div className="">
	                <Form>
	                  <InputGroup className="mb-3">
	                    <Input type="number" name="order" placeholder="Order" value={this.state.formData.order} 
	                    	autoComplete="new-order" onChange={(e) => this.handleFormChange(e)}/>
	                  </InputGroup>
	                </Form>
	            </div>
	          </Col>
	        </Row>
	      </ModalBody>
	      
	      <div className="mt-2 border-bottom"/>
          <ModalFooter>
          	<div className="pb-3 pl-3 pr-3 pt-3">
            	<Button color="primary" onClick={(e) => this.doUpdate(e)}>UPDATE ORDER</Button>{' '}
            	<Button color="secondary" onClick={this.toggle}>CANCEL</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default UpdateOrder;


