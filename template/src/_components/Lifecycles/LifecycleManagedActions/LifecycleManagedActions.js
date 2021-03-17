import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { lifecycleService } from '_services/lifecycle.services.js';
import { lifecycleManagedService } from '_services/lifecycleManaged.services.js';
import {WizardConfirm} from '_components';
import { DropdownButton} from 'react-bootstrap'

const propTypes = {
		lifecycleManagedId: PropTypes.string.isRequired,
		byActionName: PropTypes.string.isRequired,
		currentState: PropTypes.string.isRequired,
		refreshCallBack: PropTypes.func,
}
const defaultProps = {
		refreshCallBack: null,
		byActionName: 'USER_SET_STATE'
}
/**
 * Actions for LifecycleManaged entity
 */
class LifecycleManagedActions extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			modal: '',
			reachableStates: [],
		}
		
		this.loadReachableState = this.loadReachableState.bind(this)
		this.confirmModalSetState = this.confirmModalSetState.bind(this)
	}
	/**
	 * Toggle the modal
	 */
	toggleModal(state) {
		this.setState(prevState => ({
    		modal: state
		})
	  )
	}
	componentWillUpdate(nextProps, prevstate){
		if(nextProps.currentState !== this.props.currentState){
			this.loadReachableState(nextProps.currentState)
		}
	}
	componentDidMount(){
		this.loadReachableState(this.props.currentState)
	}
	loadReachableState(status){
		lifecycleManagedService
		.statesByAction(this.props.lifecycleManagedId, status, this.props.byActionName, this.props.containerId)
		.then(response => {
					
			var reachableStates = [];
			if(response && response.data && response.data.attributes){
			
				if(response.data.attributes.statesByAction !== null &&
					response.data.attributes.statesByAction !== undefined){
					
					response.data.attributes.statesByAction.split(";").map(state => {
						var realState = state;
						if(realState.startsWith(',')){
							realState = realState.slice(1, realState.length);
						}
						if(realState.endsWith(',')){
							realState = realState.slice(0, realState.length - 1);
						}
						if(realState && realState.trim().length > 0){
							reachableStates.push(realState);
						}	
					});
				}
			} 
			
			this.setState({reachableStates: reachableStates})
		})
	}	  
	confirmModalSetState(state, label, length){
		var className = this.props.lifecycleAction && this.props.lifecycleAction.buttonClassName ? this.props.lifecycleAction.buttonClassName : "mr-1";
		
		return <WizardConfirm
				modalSize='md'
				buttonSize={this.props.lifecycleAction && this.props.lifecycleAction.buttonSize ? this.props.lifecycleAction.buttonSize : "sm"}
				buttonClassName={className}
				buttonColor={this.props.lifecycleAction && this.props.lifecycleAction.buttonColor ? this.props.lifecycleAction.buttonColor : "outline-secondary"}
	    		buttonTitle={state.toUpperCase()}
				onConfirm={() => this.doSetState(state)}
				dialogMessage="Do you really want to update item status?"
				dialogTitle={"Confirm status".toUpperCase()}/> 
	}
	doSetState(state){
		this.toggleModal()
		this.setState({
			loaded: false,
		})
		
		var lifecycleManagedId = this.props.lifecycleManagedId
		lifecycleService
		.setState(lifecycleManagedId, state, this.props.containerId)
		.then(response => {
			if(this.props.refreshCallBack){
				this.props.refreshCallBack(response)
			}
		})
	}
	lifecycleManagedActions(){
		var lifecycleBySetStateActions = []
		if(this.state.reachableStates.length > 0 ){
			this.state.reachableStates.map(state => {
				if(state && state.trim().length > 0){
					lifecycleBySetStateActions.push(
						this.confirmModalSetState(state, state, this.state.reachableStates.length)
					)
				}
			})
		}
		
		if(lifecycleBySetStateActions.length > 0){
			if(lifecycleBySetStateActions.length === 1){
				return lifecycleBySetStateActions;
			}
			
			var size = this.props.buttonSize ? this.props.buttonSize : "sm";

			if(this.props.inlineButtons){
				return lifecycleBySetStateActions
			}
			else {
				return  (<>
					<DropdownButton title="Status" 
						variant="outline-info"
						size={size}
						id="dropdown-basic-button">
					  	{lifecycleBySetStateActions}
					</DropdownButton>
				</>
				)
			}
		}
		
		return <></>;
	}
	
	render(){
		return (<>
				{this.lifecycleManagedActions()}
			</>
		)
	}
}

LifecycleManagedActions.propTypes = propTypes;
LifecycleManagedActions.defaultProps = defaultProps;


export default LifecycleManagedActions;

