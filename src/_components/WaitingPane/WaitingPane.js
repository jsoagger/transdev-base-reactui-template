import React, { Component } from 'react';

class WaitingPane extends Component {

	constructor(props){
		super(props)
	}

	render() {
    	var waitingMessage = 'Chargement, veuillez patienter...';
    	if(this.props.waitingMessage){
    		waitingMessage = this.props.waitingMessage;
    	}

    	var className, notbordered = this.props.bordered === false || this.props.bordered === null || this.props.bordered === undefined;
    	if(this.props.ldsfb){
			return  <div className="waiting-pane">
				<div className={'app-loading'}>
					<div className="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		}
		else if(this.props.ldsspinner){
			return <div className={'app-loading'}>
					<div className="lds-spinner">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
			</div>
		}
		else if(this.props.hourglas){
			return <div className={'app-loading'}>
				<div className="lds-hourglass"></div>
			</div>
		}
		else if(this.props.ldsgrid){
    		return <div className={'app-loading'}>
				<div className="lds-grid">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		}
    	else {
    		return <div className={'app-loading'}>
					<div className="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
		}
   }
}

export default WaitingPane;
