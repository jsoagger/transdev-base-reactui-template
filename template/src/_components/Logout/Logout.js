import React from 'react';
import {commons} from '_helpers/commons.js';
import {WaitingPane} from '_components';

class Logout extends React.Component{
	
	constructor(props){
		super(props)
		this.state ={
		}
		
		this.redirectHome = this.redirectHome.bind(this);
	}
	redirectHome(){
		this.props.history.push('/home');
	}
	componentDidMount(){
		commons.jsoagger_core_logout();
		window.location.href = '/login';
	}
	
	render(){
			return <WaitingPane waitingMessage="Bye"/>
	}
}


export default Logout;