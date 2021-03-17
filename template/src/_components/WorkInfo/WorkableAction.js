import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { workableService } from '_services/workable.services.js';
import { WizardConfirm } from '_components';
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';

const propTypes = {
		workInfo: PropTypes.object,
		workableId: PropTypes.string,
		canCheckin: PropTypes.bool,
		canCheckout: PropTypes.bool,
		canUndoCheckout: PropTypes.bool,
		toWcCallBack: PropTypes.func,
}
const defaultProps = {
		canCheckin: false,
		canCheckout: false,
		canUndoCheckout: false,
		toWcCallBack: null
}
/**
 * Actions for workable
 */
class WorkableAction extends Component {

	constructor(props){
		super(props)
		this.state = {
		}

		this.checkin = this.checkin.bind(this)
		this.checkout = this.checkout.bind(this)
		this.undoCheckout = this.undoCheckout.bind(this)
		this.toWorkingCopy = this.toWorkingCopy.bind(this)
		this.toOriginalCopy = this.toOriginalCopy.bind(this)
	}

	componentDidUpdate(prevProps){
		if(prevProps.workableId !== this.props.workableId){
			this.setState({
				wc: this.props.workInfo.isWorkingCopy,
				locked: this.props.workInfo.lockedBy !== '' && !this.props.workInfo.isWorkingCopy,
				workableId: this.props.workableId
			})
		}
	}

	/**
	 * To original copy
	 */
	async toOriginalCopy(e){
		if(e) e.preventDefault()
		if(this.props.setLoading) this.props.setLoading();

		workableService
		.originalCopy(this.props.workableId, this.props.containerId)
		.then(response => {
			if(response && response.data && this.props.loadDatas){
				this.props.loadDatas(response.data.attributes.id, false);
			}
		})
	}
	/**
	 * toWorkingCopy
	 */
	async toWorkingCopy(e, id){
		if(e)e.preventDefault();
		if(this.props.setLoading) this.props.setLoading();

		workableService
		.workingCopy(id ? id : this.props.workableId, this.props.containerId)
		.then(response => {
			if(response && response.data && this.props.loadDatas){
				this.props.loadDatas(response.data.attributes.id, false);
			}
		})
	}
	/**
	 * Checkin
	 */
	async checkin(e){
		if(e)e.preventDefault();
		if(this.props.setLoading) this.props.setLoading();

		workableService
		.checkin(this.props.workableId, '', this.props.containerId)
		.then(response => {
			this.props.loadDatas(this.props.workableId, false);
			if(this.props.refreshListView){
				this.props.refreshListView('viewDetails');
			}
		})
	}
	/**
	 * Checkout
	 */
	async checkout(e){
		if(e)e.preventDefault();
		if(this.props.setLoading) this.props.setLoading();

		workableService
		.checkout(this.props.workableId, '', this.props.containerId)
		.then(response => {
			workableService
			.workingCopy(this.props.workableId, this.props.containerId)
			.then((res) => {
				this.props.loadDatas(res.data.attributes.id, false);
			})
		})
	}
	/**
	 * Undo checkout
	 */
	async undoCheckout(e){
		if(e)e.preventDefault();
		if(this.props.setLoading) this.props.setLoading();

		workableService
		.originalCopy(this.props.workableId, this.props.containerId)
		.then(response => {
			if(response && response.data){
				const original = response.data.attributes.id;

				workableService
				.undoCheckout(this.props.workableId, '', this.props.containerId)
				.then(() => {
					if(this.props.loadDatas){
						this.props.loadDatas(original);
					}

					if(this.props.refreshListView){
						this.props.refreshListView();
					}
				})
			}
		})


	}
	workingCopyActions(){
		var VALIDATE_LABEL = this.props.VALIDATE_LABEL ? this.props.VALIDATE_LABEL :  'Valider'
		var DELETE_WC_LABEL = this.props.DELETE_WC_LABEL ? this.props.DELETE_WC_LABEL :  'Supprimer'
		return <>
			<WizardConfirm
				buttonIcon='fa fa-check fa-md'
    			buttonTitle={VALIDATE_LABEL}
				onConfirm={() => this.checkin()}
				dialogMessage="Validater toutes les modifications?"
				dialogTitle={VALIDATE_LABEL}/>

			<WizardConfirm
				buttonIcon='fa fa-md fa-trash'
    			buttonTitle={DELETE_WC_LABEL}
				onConfirm={() => this.undoCheckout()}
				dialogMessage="Annuler toutes les modifications?"
				dialogTitle={DELETE_WC_LABEL}/>
		</>
	}
	/**
	 * Workable actions
	 */
	workabaleActions() {
		var workingCopy = this.props.workInfo.isWorkingCopy === true;

		var hasWorkingCopy = this.props.workInfo.lockedSince !== null &&
			this.props.workInfo.lockedSince !== undefined &&
			this.props.workInfo.lockedSince !== '';

		var canForwardToWc = hasWorkingCopy && !workingCopy;
		var canForwardToOriginalCopy = hasWorkingCopy && workingCopy;

		var canCheckout = false;
		if(this.props.iterationInfo.isLatestIteration === true && !hasWorkingCopy){
			canCheckout = true;
		}

		var actions = [];
		var CLONE_LABEL= this.props.CLONE_LABEL ? this.props.CLONE_LABEL :  'CLONE'
		if(canCheckout){
			actions.push(
				<WizardConfirm
					buttonIcon='fa fa-check fa-clone'
    				buttonTitle={CLONE_LABEL}
					onConfirm={() => this.checkout()}
					dialogMessage="Créer une copie de travail?"
					dialogTitle={CLONE_LABEL}/>
			)
		}

		if(workingCopy){
			actions.push(this.workingCopyActions());
		}

		var WC_LABEL = this.props.WC_LABEL ? this.props.WC_LABEL :  'WORKING COPY'
		var OC_LABEL = this.props.WC_LABEL ? this.props.OC_LABEL :  'ORIGINAL COPY'

	    return (
			<React.Fragment>
					{actions}
					<Button hidden={!canForwardToWc}  onClick={this.toWorkingCopy}>
						<i className="fa fa-forward fa-md"></i>&nbsp;{WC_LABEL}</Button>
					<Button hidden={!canForwardToOriginalCopy}  onClick={this.toOriginalCopy}>
						<i className="fa fa-forward fa-md"></i>&nbsp;{OC_LABEL}</Button>
	        </React.Fragment>
		)
	}

	render(){
		return (<div>{this.workabaleActions()}</div>)
	}
}

WorkableAction.propTypes = propTypes;
WorkableAction.defaultProps = defaultProps;


export default WorkableAction;
