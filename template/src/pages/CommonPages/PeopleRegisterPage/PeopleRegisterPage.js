import React from 'react';
import {AddPeople} from '_components';
import ApplicationVersion  from '_components/ApplicationVersion/ApplicationVersion.js';
import ApplicationCopyright  from '_components/ApplicationVersion/ApplicationCopyright.js';

class PeopleRegisterPage extends React.Component {
	
	constructor(props){
		super(props)
	}
	
	render() {
		return (<div id={'loginpage'} className={'login-page_root'}>
			<div className="loginpage-root">
				<h2 className="main-title">Créer un compte</h2>
				<div className="new-filter">
					<div className="people-register-form">
						<AddPeople {...this.props} setProcessing={this.setLoading}/>
					</div>
				</div>
			</div>
			<div className={'footer-app-version'}>
				<ApplicationCopyright />
				<ApplicationVersion />
			</div>
		</div>)
	}
}
					
export default PeopleRegisterPage;

