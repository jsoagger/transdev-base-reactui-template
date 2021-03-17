import React from 'react';
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

/**
 *
 */
class Wizard extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			modalShow: false,
		}
		this.hideWizard = this.hideWizard.bind(this);
		this.setModalShow = this.setModalShow.bind(this);
	}

	setModalShow(val){
		if(val === false){
			this.hideWizard()
		}

		this.setState({
			modalShow: val
		})
	}

	hideWizard(){
		if(this.props.onWizardHide){
			this.props.onWizardHide()
		}
	}
	modal(){

	}
	render(){
		var buttonIconComp = this.props.buttonIconComp ? this.props.buttonIconComp : <i className={this.props.buttonIcon}>&nbsp;</i>
		return (
			 <>
			      <Button
					disabled={this.props.disabled}
			      	block={this.props.buttonBlock}
			      	hidden={this.props.hideButtonIf}
			      	onClick={() => this.setModalShow(true)}>
			      	{buttonIconComp}
			      	{this.props.buttonTitle}
			      </Button>

			      <MyVerticallyCenteredModal
			      	{...this.props}
			        show={this.state.modalShow}
			        onHide={() => this.setModalShow(false)}/>
			  </>
		);
	}
}

export default Wizard;

function MyVerticallyCenteredModal(props) {
	  var content = '<p>No content</p>'
	  var size = props.dialogSize ? props.dialogSize : 'lg'
	  var hideFooter = props.hideFooter === true;
	  var hideHeader = props.hideHeader === true;

	  if(props.dialogContentProvider){
		  content = props.dialogContentProvider(props.onHide, props.additionalParams)
	  }

	  return (
	    <Modal
	      {...props}
	      centered
	      size={size}
	      dialogClassName={props.dialogClassName}
	      aria-labelledby="contained-modal-title-vcenter"
	      scrollable="true">

				<Modal.Header closeButton>
					<h3>{props.dialogTitle}</h3>
				</Modal.Header>

			  <Modal.Body>{content}</Modal.Body>

			  {!hideFooter && <Modal.Footer>
				  <Button variant="secondary" onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			  }
	    </Modal>
	  );
}
