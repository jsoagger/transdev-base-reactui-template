import React, { Component } from 'react';
import { Button,} from 'reactstrap';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';
import { lifecycleManagedService } from '_services/lifecycleManaged.services.js';
import { commons } from '_helpers/commons.js';

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {
};
/**
 * Displays lifecyle managed lifecycle informations panel
 */
class LifecycleInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
        	allStates: '',
        	lifecycleName: ''
        }
    }
    
    componentDidMount(){
    	const item = this.props.data;
    	const id = item.attributes.id
    	
    	lifecycleManagedService
    	.allStates(id, this.props.containerId)
    	.then(response => {
    		if(response && response.data && response.data.attributes){
    			var allStates = response.data.attributes.allStates
    			this.setState({
    				allStates: allStates.split(',').join(', ')
    			})
    		}
    	})
    	
    	lifecycleManagedService
    	.lifecycleName(id, this.props.containerId)
    	.then(response => {
    		if(response && response.data && response.data.attributes){
    			this.setState({
        			lifecycleName: response.data.attributes.lifecycle,
        			lifecycleMasterId: response.data.attributes.lifecycleMasterFullId,
        			lifecycleFullId: response.data.attributes.lifecycleFullId
        		})
    		}
    	})
    }
    lifecycleName(){
    	if(this.state.lifecycleName === ''){
    		return '-'
    	}
    	else {
    		const uri = this.props.location ? this.props.location.pathname : '##',
    		link = "/#" + uri + '/lifecycle/' + this.state.lifecycleFullId
    		return <>
    			<Button className='btn-link jsoagger-link' color="white" href={link}>{this.state.lifecycleName}</Button>
    		</>
    	}
    }
	render() {
		const item = this.props.data,
		allStates = this.state.allStates,
		lifecycle = this.state.lifecycleName;
		
        const config = {
                title: 'Lifecycle infos',
                icon: 'fa fa-info float-right',
                attributes: [
                    {name: 'Current state',  dataField: 'attributes.lifecycleInfo.currentState', type: 'string'},
                    {name: 'All states', staticValue: allStates},
                    {name: 'Lifecycle', displayComponent: () => this.lifecycleName()},
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

LifecycleInfo.propTypes = propTypes;
LifecycleInfo.defaultProps = defaultProps;

export default LifecycleInfo;

