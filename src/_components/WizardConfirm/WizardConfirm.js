import React from 'react';
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

/**
 * 
 */
class WizardConfirm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			modalShow: false,
		}
	}
	
	setModalShow(val){
		this.setState({
			modalShow: val
		})
	}
	
	onConfirm(){
		if(this.props.onConfirm){
			this.props.onConfirm()
		}
		this.setModalShow(false)
	}

	render(){
		return (<>
			      <Button
					  disabled={this.props.disabled}
			      	onClick={() => this.setModalShow(true)}>
			      	{this.props.buttonIconComp ? this.props.buttonIconComp : <i className={this.props.buttonIcon}></i>}
			      	&nbsp;{this.props.buttonTitle}
			      </Button>

			      <MyVerticallyCenteredModal
			      	{...this.props}
			        show={this.state.modalShow}
			        onConfirm={() => this.onConfirm()}
			        onHide={() => this.setModalShow(false)}/>
			    </>
		);
	}
}

export default WizardConfirm;

function MyVerticallyCenteredModal(props) {
	  var content = '<p>No content</p>'
	  var wizardButtonTitle = props.wizardButtonTitle && props.wizardButtonTitle.length > 0 ? props.wizardButtonTitle : 'YES';
	  var modalSize = props.modalSize ? props.modalSize : 'md'; 
	  return (
	    <Modal
	      {...props}
	      size={modalSize}
	      centered
	      aria-labelledby="contained-modal-title-vtop">
	      
			  <Modal.Header>
					<h3>{props.dialogTitle}</h3>
			  </Modal.Header>

			  <Modal.Body>
					<div className={'display-6'}>
						{props.dialogMessage}
						{props.dialogContent ? props.dialogContent() : ''}
					</div>
			  </Modal.Body>

			  <Modal.Footer>
				<div className="btn-toolbar">
					<Button onClick={props.onConfirm}>{wizardButtonTitle}</Button>
					<Button variant="secondary"  size="md" onClick={props.onHide}>CANCEL</Button>
				</div>
			  </Modal.Footer>
	    </Modal>
	  );
}

