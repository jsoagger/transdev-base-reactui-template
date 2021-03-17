import React, { Component } from 'react';

class RevControlledDetailsHeader extends Component {

    constructor(props){
        super(props)
    }
    
    getLockStatusDisplay(){
		var isWorkingCopy = this.props.workInfo && this.props.workInfo.isWorkingCopy === true;
		var lockIcon, className;
		if(isWorkingCopy === true){
			lockIcon = <i className="fa fa-unlock fa-md"></i>
			className = 'workinfo-details workinfo-unlocked'
		}
		else {
			lockIcon = <i className="fa fa-lock fa-md"></i>
			className = 'workinfo-details workinfo-locked'
		}
		return <span className={className}>
			{lockIcon}
		</span>
	}
	
	getVersionDisplay(){
		var version = '';
		if(this.props.versionInfo || this.props.iterationInfo){
			if(this.props.versionInfo){
				version = version.concat(this.props.versionInfo.versionId).concat(".");
			}
			if(this.props.iterationInfo){
				version = version.concat(this.props.iterationInfo.iterationNumber);
			}
		}
		else {
			version = "N/A";
		}
		return version;
	}
	
	render() {
		var businessType = this.props.businessTypeDisplayName,
		lifecycle = this.props.lifecycleCurrentState;
		
		var displayName = this.props.displayName,
		description = this.props.description;
		
		var headerActions;
		if(this.props.headerActionsProvider){
			headerActions = this.props.headerActionsProvider();
		}
		
		return (<div className={this.props.headerClassName}>
					<p className="page-title">{displayName}<span>&nbsp;{this.getLockStatusDisplay()}</span> &nbsp;{this.getVersionDisplay()}</p>
					<div className="btn-toolbar">{headerActions}</div>
			</div>
		)
	}
}

export default RevControlledDetailsHeader;

