import React, { Component } from 'react';
import { 
	AttributeListGroup, 
} from '_components';
/**
 * Group of attributes
 */
class AttributesGroup extends Component {

    render() {
        const d = [];
        this.props.attributesGroup.items.forEach(config => {
            var view = <AttributeListGroup {...this.props} attributesListConfig={config} />
            d.push(view);
        });

        return (
            <React.Fragment>{d}</React.Fragment>
        )
    }
}

export default AttributesGroup;
