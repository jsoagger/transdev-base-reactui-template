import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';
/**
 * Default attributes list
 */
const persistenceInfoAttributesSchema = {
    items: [
        {
            title: 'Persistence infos',
            icon: 'fa fa-info float-right',
            attributes: [
            	{name: 'Created By',  dataField: 'attributes.createdBy'},
            	{name: 'Updated By',  dataField: 'attributes.lastModifiedBy'},
            	{name: 'Create date',  dataField: 'attributes.createDate',  dateFormat: 'DD/MM/YYYY HH:mm:ss', type: 'date'},
                {name: 'Update date',  dataField: 'attributes.lastModifiedDate',  dateFormat: 'DD/MM/YYYY HH:mm:ss', type: 'date'},
            ]
        },
    ],
};

const propTypes = {
    attributesSchema: PropTypes.array,
    orientation: PropTypes.string,
};

const defaultProps = {
    attributesSchema: persistenceInfoAttributesSchema,
    orientation: 'horizontal' 
};
/**
 * Persistnce informations of all entities
 */
class PersistenceInfo extends Component {
	render(){
		const schema = this.props.attributesSchema;
		const item = this.props.data;
		
		const d = [];
		schema.items.forEach(config => {
            var view = <AttributeListGroup {...this.props} 
             attributesListConfig={config} data={item} 
             cardClassName={this.props.cardClassName}/>
	        d.push(view);
        });
        
		return (<React.Fragment>{d}</React.Fragment>)
	}
}

PersistenceInfo.propTypes = propTypes;
PersistenceInfo.defaultProps = defaultProps;

export default PersistenceInfo;

