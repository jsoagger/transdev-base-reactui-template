import React, { Component } from 'react';
import {Input,} from 'reactstrap';
import PropTypes from 'prop-types';
import { businessRulesService } from '_services/business.rule.services.js';

const propTypes = {
  displayFunction: PropTypes.func,
}

const defaultProps = {};
/**
 * Displays two select:
 * 1. One to select business classes
 * 2. One to select business type
 * 
 * Both items are linked and auto update
 * 
 */
class BusinessClassAndTypeSelect extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            businessClasses: [],
            businessTypes: [],
            businessClass: null,
            businessType: null
        }
        
        this.onBusinessSubtypeChange = this.onBusinessSubtypeChange.bind(this)
    }

    onBusinessSubtypeChange(value){
    	if(this.props.updateFunction) {
    		this.props.updateFunction(this.state.businessClass, this.state.businessType)
    	}
    }

    onBusinessClassChange(event) {
    	var value = event.target.value;
        if(this.props.updateFunction) this.props.updateFunction(value, null)
        
        businessRulesService
        .getAllBusinessTypes(value, this.props.containerId)
        .then(json => {
        	this.setState({
    			businessTypes: json.metaData.businessTypes
    		})
        })
    }
    /**
     * Generates a select box with list of business classes.
     */
    businessClassesSelect(){
        var defaultSelection = this.props.defaultBusinessClass,
        	businessClassOptions = [];
        
        this.state.businessClasses.map(item => {
            businessClassOptions.push(<option value={item}>{item}</option>);
        });

        var selectBusinessClass = (
            <Input value={defaultSelection} type="select" name="business-class" 
            	id="business-class" 
            	onChange={this.onBusinessClassChange.bind(this)}>
                <option value="">Select a business class ...</option>
                {businessClassOptions}
            </Input>
        )
        
        return selectBusinessClass;
    }
    /**
     * When user selects a business class, fetch subtypes of that class and
     * display it into a select box.
     */
    businessTypesSelect(){
        var subtypesOptions = [];
        subtypesOptions.push(<option value=''>Select a type ...</option>);
        
        if(this.state.selectBusinessTypes){
	        this.state.selectBusinessTypes.map(item => {
	                subtypesOptions.push(<option value={item.attributes.id}>{item.attributes.displayName}</option>);
	        });
        }
        
        var selectBusinessType = (
            <Input value={this.props.defaultBusinessType} type="select" name="business-type" id="business-type" 
            	onChange={(e) => this.onBusinessSubtypeChange(e.target.value)}>
                {subtypesOptions}
            </Input>
        )
        
        return selectBusinessType;
    }

    componentDidMount(){
    	businessRulesService
    	.getAllBusinessClass(this.props.containerId)
    	.then(json => {
    		this.setState({
    			businessClasses: json.metaData.businessClass
    		})
    	})
    }
    
    render() {
        const businessTypesSelect= this.businessTypesSelect();
        var businessClassesSelect = this.businessClassesSelect();
        const display = this.props.displayFunction(businessClassesSelect, businessTypesSelect);
        return (
            <React.Fragment>{display}</React.Fragment>
        )
    }
}

BusinessClassAndTypeSelect.propTypes = propTypes;
BusinessClassAndTypeSelect.defaultProps = defaultProps;


export default BusinessClassAndTypeSelect;
