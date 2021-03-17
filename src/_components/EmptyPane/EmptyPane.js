import React, { Component } from 'react';

class EmptyPane extends Component {

	constructor(props){
		super(props)
	}
    render() {
    	var mainMessage = 'No items';
    	if(this.props.mainMessage){
    		mainMessage = this.props.mainMessage;
    	}

    	var className = "admin-list-nocontent";
    	if(this.props.className){
    		className = this.props.className
    	}

    	var secondaryMessage = 'There is no items for current settings';
    	if(this.props.secondaryMessage){
    		secondaryMessage = this.props.secondaryMessage;
    	}

    	return  <div className="empty-pane">
					<center>
							{this.props.hideMainMessage !== true && <p className="lead empty-pane-main-message">{mainMessage}</p>}
							<p className='empty-pane-secondary-message'>{secondaryMessage}</p>
					</center>
		</div>
   }
}


export default EmptyPane;
