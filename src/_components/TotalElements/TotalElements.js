import React, { Component } from 'react';
import {commons} from '_helpers/commons.js';

/**
 * Displays total elements
 */
class TotalElements extends React.Component{
	render(){
		var currentContainerName = commons.getWorkingContainerName(this.props.userContext);
		return (
			<div className='total-elements'>
				<p className=""><center><i>{currentContainerName}</i></center></p>
				<p className="search-results">
					<center>{this.props.totalElements} Element(s)</center>
				</p>
			</div>
		)
	}
}


export default TotalElements;

