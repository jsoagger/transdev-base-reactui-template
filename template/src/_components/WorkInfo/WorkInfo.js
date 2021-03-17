import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';

const propTypes = {
    attributesSchema: PropTypes.array,
    displayActions: PropTypes.bool,
};

const defaultProps = {
    displayActions: true,
};
/**
 * Displays work infos panel for Workable/Revision controlled entities
 */
class WorkInfo extends Component {

    constructor(props){
        super(props)
    }

    workableActions = () => {
        var wc = false;
        var actions;
        if(this.props.displayActions == true){
            return (
                <React.Fragment>
                    <button hidden={!wc} onClick={this.checkin}><i className="fa fa-unlock"></i>&nbsp;CHECKIN</button>
                    <button hidden={!wc} onClick={this.undocheckout}><i className="fa fa-trash-o"></i>&nbsp;UNDO</button>
                    <button hidden={wc} onClick={this.checkout}><i className="fa fa-lock"></i>&nbsp;CHECKOUT</button>
                </React.Fragment>
            )
        }
        return actions;
    }


	render() {
		const item = this.props.data;
        const schema = {
            items: [ 
                {
                    title: 'Work infos',
                    footerActions: () => this.workableActions(),
                    attributes: [
                        {name: 'Iteration number',  dataField: 'attributes.iterationInfo.iterationNumber', type: 'number'},
                        {name: 'Latest',  dataField: 'attributes.iterationInfo.isLatestIteration', type: 'bool'},
                        {name: 'Locked by',  dataField: 'attributes.workInfo.lockedBy', type: 'string'},
                        {name: 'Locked since',  dataField: 'attributes.workInfo.lockedSince', type: 'date'},
                        {name: 'Working copy',  dataField: 'attributes.workInfo.isWorkingCopy', type: 'bool'},
                    ],
                },
            ],
        };

		const d = [];
		schema.items.forEach(config => {
            var view = <AttributeListGroup {...this.props} 
                attributesListConfig={config} 
                data={item} 
                orientation="horizontal" 
                displayHeader={this.props.displayHeader} 
                cardClassName={this.props.cardClassName}/>
	        d.push(view);
        });
        
		return (<React.Fragment>{d}</React.Fragment>)
	}
}

WorkInfo.propTypes = propTypes;
WorkInfo.defaultProps = defaultProps;

export default WorkInfo;

