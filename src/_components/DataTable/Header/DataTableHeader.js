import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DataTableHeader.css';

const propTypes = {
	columns: PropTypes.array,
};

const defaultProps = {
	columns:[], 
};

/**
 * Header of simple data table
 */
class DataTableHeader extends Component {
	
	constructor(props){
		super(props);
	}
	
	toHeader(columns){
		return columns.map(col => {
			return <th scope="col">{col.name}</th>
		});
	}

	render() {
		if(this.props.hideTableHeader === 'true'){
			return <></>
		}
		
		const {columns, ...attributes } = this.props;
	    return (
	      <React.Fragment> 
	      		<thead>
	      			<tr>
			          {this.toHeader(columns)}
			        </tr>
		        </thead>
		   </React.Fragment>
	    );
	 }
}

DataTableHeader.propTypes = propTypes;
DataTableHeader.defaultProps = defaultProps;

export default DataTableHeader;


