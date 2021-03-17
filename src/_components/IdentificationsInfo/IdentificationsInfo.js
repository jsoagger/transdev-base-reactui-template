import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {identificationsService} from 'identifications.service.js';
import { commons } from '_helpers/commons.js';

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {
};
/**
 * Displays identification informations panel
 */
class IdentificationsInfo extends Component {

    constructor(props){
        super(props)
        this.state  = {
        	identifications: []
        }
    }
    
    componentDidMount(){
    	const item = this.props.data;
    	var id = item.attributes.id
    	identificationsService
    	.getIdentifications(id, this.props.containerId)
    	.then(response => {
    		//console.log('response : ' + JSON.stringify(response))
    	})
    }

	render() {
		if(this.state.identifications.length === 0){
			return <div>No identifications</div>
		}
		
		return <div>Not implemented</div>
	}
}

IdentificationsInfo.propTypes = propTypes;
IdentificationsInfo.defaultProps = defaultProps;

export default IdentificationsInfo;

