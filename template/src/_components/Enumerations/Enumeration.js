import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button, 
	Container, 
	Badge, 
	Card, 
	CardBody, 
	CardSubtitle, 
	CardTitle, 
	CardHeader, 
	Col, 
	Pagination, 
	PaginationItem, 
	PaginationLink, 
	Row, 
	Table 
} 
from 'reactstrap';
import { DataTableHeader, DataTableRow } from '../../../_components';
import { listValuesService } from '_services/listvalues.services.js';
import { commons } from '../../../_helpers/commons.js';
import { 
	AttributeListGroup,
	AttributesGroup,
	PersistenceInfo,
} 
from '_components';
/**
 * Lifecycle details page
 */
class Enumeration extends Component {

	constructor(props){
		super(props);
		this.state = {
			mode: 'view',
		}
		// no update for configuration data
		// do a load to force export/update
		//this.update = this.update.bind(this)
	}
	componentDidMount(){
		const id = this.props.match.params.id
		listValuesService.details(id, this.props.containerId).
		then(e => {
			let location = e.data.attributes.value
			document.getElementsByClassName('active breadcrumb-item')[0].innerHTML = location
			
			this.setState({
				item: e.data
			})
		})
	}
	
	render() {
		const attributesList = {
		    title: 'Summary',
			tableSize: 'sm',
			paginationSize: 'sm',
		    icon: 'fa fa-info float-right',
		    attributes: [
		    	{name: 'Displayed Value', dataField: 'attributes.value', type:'string'},
		    	{name: 'Saved value', dataField: 'attributes.savedValue', type:'string'},
		    	{name: 'Name', dataField: 'attributes.name', type:'string'},
		    	{name: 'Description', dataField: 'attributes.description', type:'string'},
		        {name: 'Locale', dataField: 'attributes.locale', type:'string'},
		    ]
		};
		
		const item = this.state.item;
		if(item && item.status != 404){
			return (
				<div className="flex-row align-items-center">
					<Row>
						<Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
						<Col xs="12" sm="12" md="10" lg="10" xl="8">
							<Row>
								<Col xs="12" md="12" lg="12" xl="12">
									<div className="">
	                            		<h3 className="float-left, jsoa-table-title">{item.attributes.value} </h3>
	                                </div>
		                        </Col>
							</Row>
							<Row>
								<Col>
									<div className="spacer-20"></div>
								</Col>
							</Row>
				            <Row>
				                <Col xs="12" md="12" lg="12" xl="12">
				                    <div>
				                        	<AttributeListGroup attributesListConfig={attributesList} 
				                        		data={item}
				                        		addHeaderMargin="true" 
				                        		displayHeader='true'/>
				                        			
				                            <PersistenceInfo   {...this.props} 
				                        		data={item} 
				                            	displayHeader='true' addHeaderMargin="true"/>
				                    </div>    
				                </Col>
				            </Row>
			            </Col>
			            <Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
		            </Row>
		        </div>
	        
			);
		}
		return (<div>Loading...</div>);
	}
 }

export default Enumeration;

