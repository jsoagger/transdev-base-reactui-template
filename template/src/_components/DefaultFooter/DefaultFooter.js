import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Nav, Navbar} from 'react-bootstrap'

/**
 * Default footer
 */
class DefaultFooter extends Component {
	render() {
		var buildVersion = process.env.REACT_APP_BUILD_VERSION,
			buildDate = process.env.REACT_APP_BUILD_DATETIME;

		return (
			<Navbar fixed="bottom" className="app-footer default-footer">
				<div><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
					<img alt="Licence Creative Commons" style={{'border-width':0}}
						 src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
				</a></div>
				<div>&nbsp;</div>
				{/*<Nav>
            		<center className="d-flex flex-column mx-auto">
						<div className="mb-1"><a href="https://jsoagger.tech">JSOAGGER&nbsp;&copy;</a>&nbsp;2020 All rights reserved</div>
	            		<a href="https://jsoagger.tech">Developed by NEXITIA TECHNOLOGIES&nbsp;&copy;&nbsp;</a>
	            	</center>
            	</Nav>*/}
				<div><i>Version: {buildVersion}.{buildDate}</i></div>
			</Navbar>
		);
	}
}

export default DefaultFooter;
