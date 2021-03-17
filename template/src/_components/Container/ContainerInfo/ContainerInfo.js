import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {
};
/**
 * Displays container informations panel
 */
class ContainerInfo extends Component {

    constructor(props){
        super(props)
    }

	render() {
		const item = this.props.data;
        const config = {
	                title: 'Container infos',
	                attributes: [
	                    {name: 'Container',  dataField: 'container.name', type: 'string'},
	                    {name: 'Path',  dataField: 'container.path', type: 'string'},
	                    {name: 'Description',  dataField: 'container.description', type: 'string'},
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

ContainerInfo.propTypes = propTypes;
ContainerInfo.defaultProps = defaultProps;

export default ContainerInfo;
