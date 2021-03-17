import React, { Component } from 'react';
import { Button, 
    Col,  
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {
};
/**
 * Displays type informations panel
 */
class TypeInfo extends Component {

    constructor(props){
        super(props)
    }

	render() {
		const item = this.props.data;
        const config = {
                title: 'Type infos',
                icon: 'fa fa-info float-right',
                attributes: [
                    {name: 'Type',  dataField: 'businessType.displayName', type: 'string'},
                    {name: 'Logical name',  dataField: 'businessType.logicalName', type: 'string'},
                    {name: 'Logical path',  dataField: 'businessType.logicalPath', type: 'string'},
                    {name: 'Description',  dataField: 'businessType.description', type: 'string'},
                ],
         };

		const d = <AttributeListGroup {...this.props} 
                attributesListConfig={config} 
                data={item} 
                orientation="horizontal" 
                displayHeader={this.props.displayHeader} 
                cardClassName={this.props.cardClassName}/>
        
		return (<React.Fragment>{d}</React.Fragment>)
	}
}

TypeInfo.propTypes = propTypes;
TypeInfo.defaultProps = defaultProps;

export default TypeInfo;

