import React, { Component } from 'react';
import {accountService} from '_services/account.services.js';

class ContainerOwner extends Component {

	constructor(props){
		super(props);
		this.state ={
			loaded:false
		}
	}

	componentDidMount(){
		// containerOwnerId is a party
		accountService
		.accountOfParty(this.props.containerOwnerId, this.props.containerId)
		.then(account => {
			this.setState({account: account, loaded:true});
		})
	}

	getDisplayName(){
		return <>
			{this.state.account && this.state.account.data &&
				<p className="container-details-owner lead">{this.state.account.data.attributes.login}&nbsp;({this.state.account.data.attributes.nickName})</p>
			}
		</>
	}

	render(){
		return <div className="containers-owner">
				<div className="form-title-level-0">Owner</div>
				<div className="pane">
					<div className="form-title-level-2">{this.state.loaded ? this.getDisplayName() : ''}</div>
					<div className="btn-toolbar"><button>CHANGE OWNER</button></div>
				</div>
		</div>
	}
}

export default ContainerOwner;
