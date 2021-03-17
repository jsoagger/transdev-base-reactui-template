import React, { Component } from 'react';
import { revControlledService } from '_services/revcontrolled.services.js';
import { DataTable, WaitingPane, EmptyPane } from '_components'
import { RiPencilLine, RiCheckLine } from "react-icons/ri";

class AllIterations extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			items: [],
			loading: true,
		}
	}
	
	componentDidMount(){
		var revControlledId = this.props.revControlledId;
		revControlledService
		.allIterationsOf(revControlledId, this.props.containerId)
		.then(response => {
			this.setState({
				items: response && response.data ? response.data : [],
				metaData: response && response.data ? response.metaData : {},
				loading: false
			})
		})
		.catch(error=> {
			this.setState({loading: false})
		})
	}
	
	render (){
		
		let items = this.state.items;
		let metaData = this.state.metaData;
		let tableConfig = {
			columnsConfig: [
				{ displayComponent: (v) => lockedIcon(v), dataField: 'attributes', defaultSortOrder: 'asc' },
			    { name: 'Name', dataField: 'attributes', displayComponent: (v) => nameOf(this.props.name)},
			    { name: 'Version', dataField: 'attributes.iterationInfo.iterationNumber', defaultSortOrder: 'asc' },
			    { name: 'Created', dataField: 'attributes.createDate', dateFormat: 'DD/MM/YYYY' },
    		    { name: 'Updated', dataField: 'attributes.lastModifiedDate', dateFormat: 'DD/MM/YYYY' },
			],
		}
		
		var content;
		if(items !== null && items.length > 0){
			content = <DataTable items={JSON.stringify(items)}
						tableClassName="data-table" 
						pagination={false}
						displayTotalElements={true}
						metaData={JSON.stringify(metaData)} 
						tableConfig={tableConfig}/>
		}
		else if(this.state.loading === true){
			content = <WaitingPane />
		}
		else {
			content = <EmptyPane hideMainMessage={true} secondaryMessage="No history" />
		}
		
		return content
	}
}

export default AllIterations;


const  nameOf = (name) => {
	return <td>
		{name}
	</td>
}

const lockedIcon = (attributes) => {
	if(attributes.workInfo.isWorkingCopy === true){
		return <td className="dt-center">
			<RiPencilLine color="#000" size="1.5em"/>
		</td>
	}
	else if(attributes.iterationInfo.isLatestIteration === true){
		return <td>
			<RiCheckLine color="#000" size="1.5em"/>
		</td>
	}

	return <td></td>
}



const sortItems = (a, b) => {
	return a.attributes.iterationInfo.iterationNumber <= b.attributes.iterationInfo.iterationNumber
}