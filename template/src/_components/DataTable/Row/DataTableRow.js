import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {commons} from '../../../_helpers/commons.js';
import './DataTableRow.css';
import moment from 'moment'

const propTypes = {
	columns: PropTypes.array,
};

const defaultProps = {
	columns:[], 
};

/**
 * Simple Datatable Row
 */
class DataTableRow extends Component {
	
	constructor(props){
		super(props);
	}
	
	toRow(columns, item) {
		const cells = [];
		columns.map(col => {
			if(this.isDateCol(col)){
				var dateFormat = col.dateFormat;
				var field = col.dataField;
				var d = commons.getPropByString(item, field);

				if(d && d !== ''){
					const date = moment(d,  'YYYY-MM-DD hh:mm:ss S').format(dateFormat);
					cells.push(this.dateRow(date));
				}
				else {
					cells.push(<td className="dt-center"></td>);
				}
			}
			else if(this.isDisplayableCol(col)){
				var field = col.dataField;
				var val = commons.getPropByString(item, field);
				cells.push(col.displayComponent(val, item));
			}
			else {
				var field = col.dataField;
				cells.push(this.stringRow(item, field, col));
			}
		});
		
		return cells;
	}
	
	isDateCol(col){
		return col.dateFormat !== undefined;
	}
	
	isDisplayableCol(col) {
		return col.displayComponent !== undefined;
	}
	
	dateRow(value){
		return <td className="dt-center">{value}</td>
	}
	
	stringRow(item, field, col) {
		var suffix = col.suffix ? col.suffix : ''
		return <td className="dt-center">
			<span className={col.contentClassName ? col.contentClassName : ''}>{String(commons.getPropByString(item, field))}{suffix}</span>
		</td>
	}
	
	render() {
		const item = this.props.item;
		const { columns, ...attributes } = this.props;
		const row = this.toRow(columns, item);
	    return (
	      <React.Fragment> 
  			<tr key={item.attributes.id.toString()} className={this.props.rowClassName}>
  				{row}
	        </tr>
		   </React.Fragment>
	    );
	 }
}

DataTableRow.propTypes = propTypes;
DataTableRow.defaultProps = defaultProps;

export default DataTableRow;

