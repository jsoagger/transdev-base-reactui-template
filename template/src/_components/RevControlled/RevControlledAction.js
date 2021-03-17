import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { revControlledService } from '_services/revcontrolled.services.js';
import Button from 'react-bootstrap/Button'

const propTypes = {
		versionInfo: PropTypes.string,
		iterationInfo: PropTypes.string,
		revControlledId: PropTypes.string,
}
const defaultProps = {
}
/**
 * Actions for revision controlled
 */
class RevControlledAction extends Component {
	
	constructor(props){
		super(props);
		
		this.getNextIteration = this.getNextIteration.bind(this);
		this.getPreviousIteration = this.getPreviousIteration.bind(this);
		this.getLatestIteration = this.getLatestIteration.bind(this);
		this.onAllIterationsSelected = this.onAllIterationsSelected.bind(this);
	}
	
	async onAllIterationsSelected(){
		if(this.props.onAllIterationsSelected){
			this.props.onAllIterationsSelected()
		}
	}
	
	async getNextIteration(){
		var currentIteration = this.props.iterationInfo.iterationNumber,
		nextIteration = currentIteration + 1;
		
		var version = this.props.versionInfo ? this.props.versionInfo.versionId : 'not_versioned';
		
		var revControlledId = this.props.revControlledId;
		revControlledService
		.exactIterationAndVersion(revControlledId, version, nextIteration, this.props.containerId)
		.then(response => {
			if(response && response.data){
				this.props.loadDatas(response.data.attributes.id);
			}
		})
	}
	
	async getPreviousIteration(){
		var currentIteration = this.props.iterationInfo.iterationNumber,
		previousIteration = currentIteration - 1;

		var version = this.props.versionInfo ? this.props.versionInfo.versionId : 'not_versioned';		
		if(previousIteration >= 1){
			var revControlledId = this.props.revControlledId;
			if(revControlledId){
				revControlledService
				.exactIterationAndVersion(revControlledId, version, previousIteration, this.props.containerId)
				.then(response => {
					if(response && response.data){
						this.props.loadDatas(response.data.attributes.id);
					}
				})
			}
		}
	}
	
	async getLatestIteration(){
		var revControlledId = this.props.revControlledId;
		revControlledService
			.latestIterationOf(revControlledId, this.props.containerId)
			.then(response => {
				if(response && response.data){
					this.props.loadDatas(response.data.attributes.id);
				}
			})
	}
	rcActions() {
		var isLatestIteration = this.props.iterationInfo.isLatestIteration == true;  
		var firstIndex = this.props.iterationInfo.iterationNumber == 1;
		
	    return (
			<div>
				  <Button onClick={this.onAllIterationsSelected}><i className="fa fa-list fa-sm"></i></Button>
				  <Button disabled={firstIndex}  onClick={this.getPreviousIteration}><i className="fa fa-backward fa-sm"></i></Button>
				  <Button disabled={isLatestIteration} onClick={this.getLatestIteration}><i className="fa fa-sm"></i>&nbsp;LATEST</Button>
				  <Button disabled={isLatestIteration} onClick={this.getNextIteration}><i className="fa fa-forward fa-sm"></i></Button>
	        </div>
		)
	}
	
	render(){
		return (
			<div>{this.rcActions()}</div>
		)
	}
}

RevControlledAction.propTypes = propTypes;
RevControlledAction.defaultProps = defaultProps;


export default RevControlledAction;

