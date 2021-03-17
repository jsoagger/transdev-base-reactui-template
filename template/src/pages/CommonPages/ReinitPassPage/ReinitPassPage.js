import React from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import {UpdatePassword, WaitingPane} from '_components';
import logo from '../../../assets/img/brand/logo.png'
import './ReinitPass.css';
import {accountService} from "../../../_services/account.services";

class ReinitPassPage extends React.Component {

	 constructor(props) {
	    super(props);
	    this.state = {
	    	loading: true
	    };
	 }

	 backToHome(){
		window.location.href = '#/';
	 }

	 componentDidMount(){
		 let token = this.props.match.params.lockToken
		 if(!token){
		 	this.backToHome()
		 }

		 accountService
		 .isValidAccountLockToken(token)
		 .then(response => {
			 if(response && response.metaData.valid === true){
				this.setState({valid: true, loading:false})
			 }
			 else {
				 this.setState({valid: false, loading:false})
				 this.backToHome()
			 }
		 }).catch(() =>{
			 this.backToHome()
		 })
	 }

    /**
     * Render the view
     */
    render() {
    	var content, buildVersion = process.env.REACT_APP_BUILD_VERSION,
    	buildDate = process.env.REACT_APP_BUILD_DATETIME;

    	if(this.state.loading){
    		return <WaitingPane />
		}

    	var	content = <>
 				<div className="">
 					<center>
 						<RiLockPasswordLine size="3em"/>
 					</center>
            		<div className="reinitpass-label">Reinit password</div>
 				</div>
	 			<UpdatePassword {...this.props} reinitLostPass={true}/>
    		</>

        return (<>
        		<div className="reinit-pass-page">
	              		<center className="">
							<img src={logo} width="220" className="" alt="JSOAGGER.tech"/>
						</center>
				        <div className="reinitpass-area">
							{content}
				        </div>
				</div>
	       </>
        );
    }
}

export default ReinitPassPage;

