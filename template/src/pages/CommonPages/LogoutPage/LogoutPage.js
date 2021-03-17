import React, { Component } from 'react';
import { commons } from '_helpers/commons';
import { loginService } from '_services/login.services.js';

class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	waiting: true
        }
    }
    componentDidMount(){
        commons.jsoagger_core_logout();
    	loginService.logout();
    	setTimeout(function(){
    		window.location.href = '#/home';
    		window.location.reload(true); 
    	}, 2000);
    }
    render () {
    	return <div>
					<center>
						<h3 className="display-5">Login out</h3>
						<p className='lead'>Please wait...</p>
					</center>
			</div>
    }
}


export default LogoutPage;



