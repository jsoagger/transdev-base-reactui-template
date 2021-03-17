import React, { Component } from 'react';
import {Label, Table, Input, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import {commons} from '../../_helpers/commons.js';
import AttributeArrayGroup from './AttributeArrayGroup.js';
import AttributeArrayObjectGroup from './AttributeArrayObjectGroup.js';
import { Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import moment from 'moment';
import Button from 'react-bootstrap/Button'
import "react-datepicker/dist/react-datepicker.css";

const propTypes = {
  data: PropTypes.object,
  attributesListConfig: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  orientation: PropTypes.string,
  displayHeader: PropTypes.bool,
  actions: PropTypes.func,
};

const defaultProps = {
    cardClassName: " no-border",
    orientation: "horizontal",
    displayHeader: false
};

/**
 * Displays a list of attributes grouped in table.
 */
class AttributeListGroup extends Component {

	constructor(props){
		super(props)
		this.state = {
			formsState: [],
			formValidated: false,
			editingFormData: props.data === undefined ? '{}' : props.data,
			initialData: props.data === undefined ? '{}' : props.data,
		}
		
		this.standardFooterActions = this.standardFooterActions.bind(this)
		this.standardEditForm = this.standardEditForm.bind(this)
		this.standardSaveForm = this.standardSaveForm.bind(this)
		this.standardResetForm = this.standardResetForm.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.isEditing = this.isEditing.bind(this)
	}

	handleFormChange(event, name, type, pattern){
		var editingFormData  = {...this.state.editingFormData}
		var attPath = name ? name : event.target.name
		if(attPath.includes('.')){
			//console.log('has dot !!')
			var one = attPath.split('.')[0]
			var two = attPath.split('.')[1]
			var editingFormData0 = editingFormData[one]
			editingFormData0[two] = event.target.value
		}
		else {
			// for date field, returns date directly not the
			// component
			if(event.target.type === 'checkbox'){
				editingFormData[attPath] = event != null ? event.target.checked : false
			}
			else if(type && type === 'date'){
				editingFormData[attPath] = event != null ? moment(event).format("YYYYMMDD") : null
			}
			else {
				editingFormData[attPath] = event.target ? event.target.value : event
			}
			
		}
		
		if(pattern){
			if(event.target.value.match(pattern)){
				if(this.props.onFormChange) this.props.onFormChange(editingFormData)			
				this.setState({editingFormData: editingFormData})
			}
		}
		else {
			if(this.props.onFormChange) this.props.onFormChange(editingFormData)
			this.setState({editingFormData: editingFormData})
		}
	}
	
	setFormDataValue(key, value){
		var editingFormData  = {...this.state.editingFormData}
		editingFormData[key] = value
		this.setState({
			editingFormData: editingFormData,
		})
	}

	standardEditForm(e, token){
		e.preventDefault()
		var formsState = [...this.state.formsState]
		formsState[token] = 'edit'
		
		if(this.state.editingFormData === undefined){
			this.setState({
				formsState: formsState,
				editingFormData: {}
			})
		}
		else {
			this.setState({
				formsState: formsState,
			})
		}
	}
	
	standardSaveForm(e, token, attributesListConfig){
		e.preventDefault()
		const form = e.currentTarget;
		const formLength = this.formEl ? this.formEl.length : 0;
		
		if(attributesListConfig.processing) attributesListConfig.processing()
		var validity = this.formEl ? this.formEl.checkValidity() : true;
		if (validity === false) {
		    e.preventDefault();
		    e.stopPropagation();
		    if(attributesListConfig.endProcessing) attributesListConfig.endProcessing()
		    this.setState({
				formValidated: true
		    })
		}
		else {
			var formsState = [...this.state.formsState]
			formsState[token] = 'view'
			var formData = {...this.state.editingFormData}
			this.setState({
				formsState: formsState,
				formValidated: false
				//initialData: formData
			})

			// THIS METHOD SHOULD COLLECT FORM DATA
			// SEND REDUX ACTION EVENT TO INFORM FORM OWNER TO UPDATE DATA IN REMOTE API
			// THE OWNER WILL THE UPDATE STATE AND VIEW WILL BE REFRESHED
			if(attributesListConfig.onSubmit) attributesListConfig.onSubmit(formData)
		}
	}
	
	standardResetForm(e, token){
		e.preventDefault()
		var formsState = this.state.formsState.slice()
		formsState[token] = 'view'
		var formData = this.state.initialData
		var editingFormData = {...this.state.initialData}
		this.setState({
			formsState: formsState,
			editingFormData: editingFormData
		})
		
		var form = document.getElementById(token.split('_view')[0]);
		if(form) form.reset();
	}

	standardFooterActions = (formId, attributesListConfig) => {
		var token = formId + "_view",
		saveButtonTitle = attributesListConfig.saveButtonTitle ? attributesListConfig.saveButtonTitle : "Sauvegarder";
		
		
		if(this.state.formsState[token] === 'edit' || this.props.formMode === 'create_object') {
			if(this.props.formMode === 'create_object'){
				return (
					<React.Fragment>
			            <Col md="12">
			            	<Button block size="md"  variant="secondary" className={attributesListConfig.saveButtonClassName}
			            		onClick={(e) => this.standardSaveForm(e, token, attributesListConfig)}> {saveButtonTitle}
			            		{attributesListConfig.saveButtonIcon}
			            	</Button>
			            </Col>
			        </React.Fragment>
				)
			} 
			else {
				return (
					<React.Fragment>
						<div className="float-right">
							<Button className="ml-auto mr-2" size="sm" variant="secondary"
								onClick={(e) => this.standardSaveForm(e, token, attributesListConfig)}> <i className="fa fa-save"></i> Sauvegarder</Button>
							<Button className="ml-auto " size="sm" variant="secondary"
								onClick={(e) => this.standardResetForm(e, token)}> <i className="fa fa-undo"></i> Annuler</Button>
						</div>
			        </React.Fragment>
				)
			}
		}
		else if(!this.state.formsState[token] || this.state.formsState[token] === 'view') {
			if(this.props.canEdit){
				return (
					<React.Fragment>
						<div className="float-right">
							<Button size="sm"
								variant="secondary"
								onClick={(e) => this.standardEditForm(e, token)}><i className="fa fa-edit"></i> Modifier</Button>
						</div>
			        </React.Fragment>
				)
			}
			else {
				return <hr/>
			}
		}
	}

    processGroup(attributes) {
        const attrs = [];
        if(attributes && attributes.length > 0){
        attributes.map(attribute => {
        	if(attribute.type && (attribute.type === 'custom')) {
        		if(attribute.displayComponent){
        			attrs.push(attribute.displayComponent())	
        		}
        	}
        	else if(attribute.type && (attribute.type === 'object')) {
        		attrs.push(
                    <React.Fragment>
                        <tr className="noBorder">
                        	<td colSpan="3">
                        		<div className="spacer-20"></div>
                        	</td>
                        </tr>  
                        <tr className="noBorder">
                            <td colSpan="3" className="paddingless">
								<label className="jsoagger-form-title-level-1">{attribute.title}</label>
								<div className="float-right">
									{headerActions}
								</div>
                            </td>
                        </tr>
                        <tr>
                        </tr>  
                    </React.Fragment>  
                )
                attribute.items.map(a => {
                		attrs.push(this.simpleHRow(a));
                })
        	}
        	else if(attribute.type && (attribute.type === 'objectarray' 
            	|| attribute.type === 'editableLabelObjectarray')) {

                // for objectarray form, title is computed on this level
                // when it does not repeated on each bloc of array.
                // If need to repeat it, use arrayTitleProvider
                var headerActions;
                if(attribute.headerActions) headerActions = attribute.headerActions();
                var title =  attribute.title;
                if(attribute.title || attribute.titleProvider){
                    title = attribute.title ? attribute.title : attribute.titleProvider()
                    attrs.push(
                        <React.Fragment>
                            <tr>
                                <td colSpan="3" className="paddingless">
									<label className="jsoagger-form-title-level-1">{title}</label>
									<div className="float-right">
										{headerActions}
									</div>
                                </td>
                            </tr>
                        </React.Fragment>  
                    )
                }
                attrs.push(this.simpleArrayRow(attribute));
            }
            else {
                var rowActions = attribute.rowActions ? attribute.rowActions() : "";
                if("horizontal" === this.props.orientation) {
                    if(rowActions){
                        attrs.push(this.actionableHRow(attribute));
                    }
                    else {
                        attrs.push(this.simpleHRow(attribute));
                    }
                }
                else {
                    attrs.push(this.simpleVRow(attribute))
                }
            }
        });
        }

        return attrs;
    }

    processHeader(){
        var header, headerActions;
        if(this.props.displayHeader === true && this.props.attributesListConfig.headerActions) {
            headerActions = this.props.attributesListConfig.headerActions()
        }

        if(this.props.displayHeader === true && this.props.attributesListConfig.title) {
            header = <tr width="100%">
                <td colSpan="3" className="paddingless">
					<h3 className="form-title-level-0">{this.props.attributesListConfig.title}</h3>
					<div className="float-right">
						{headerActions}
					</div>
                </td>
            </tr> 
        }

        if(this.props.displayHeader === true && this.props.attributesListConfig.titleProvider) {
            header = <tr>
                    <td colSpan="3" className="paddingless">
						<h3>{this.props.attributesListConfig.titleProvider()}</h3>
						<div className="float-right">
							{headerActions}
						</div>
                    </td>
                </tr>  
        }
        return header;
    }

    /**
     * Attribute array ca be:
     * 1. An array of string
     * 2. An array of object
     * 
     * Array of string (stringarray) example: {email:[
     *  'toto@me.com','tata@me.com',
     * ]
     * 
     * Array of object (editableLabelObjectarray) example:
     * phones: [
     *   	{'Home phone': '33 11 123 12'},
     *   	{'Mobile phone': '32 12 123 12'},
     * ]
     * Array of object labels can be editable
     */
    simpleArrayRow(attribute) {
        const rootdata = this.state.editingFormData;
        if(attribute.type === 'objectarray' || attribute.type === 'editableLabelObjectarray') {

        	var arrayOfvalues = commons.getPropByString(rootdata, attribute.dataField);
			// in this case, the header is not repeated for each line bloc
			// we just display each row with action, unique header and footer actions
			if(attribute.type === 'editableLabelObjectarray'){
				var formId = 'formid_array_group_1'
				return <AttributeArrayGroup {...this.props} 
					canEdit={this.props.canEdit} 
					items={arrayOfvalues} 
					attribute={attribute} 
					wrapInform={formId}/>
			}
			else {
				var rows = <AttributeArrayObjectGroup {...this.props} items={arrayOfvalues} attribute={attribute}/>
            	return (
					<React.Fragment>
						<tr> 
							<td colSpan="3">
								<table width="100%" id="dt-form">
									<tbody>{rows}</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td colSpan="3"></td>
						</tr>
					</React.Fragment>
            	)
			}
		}
	}
	
	rowActions(attribute){
		const rowActions = attribute.items.rowActions ? attribute.items.rowActions() : '';
		return 	(
			<tr>
				<td colspan="2"  align="right">{rowActions}</td>
			</tr>
		)
	}
	
    simpleVRow(attribute) {
        const data = this.state.editingFormData;
        var val = commons.getPropByString(data, attribute.dataField);
        var editor = attribute.type ? attribute.type : 'text';
        var pattern = attribute.pattern;
        
        return (
        <React.Fragment>
            <tr className="dt-center"> 
                <td>{attribute.name}</td>
            </tr>
            <tr className="dt-center"> 
                <td><Input type={editor} defaultValue={val} onChange={(e) => this.handleFormChange(e,null,null, pattern)}
                	name={attribute.dataField} pattern={attribute.pattern}/></td>
            </tr>
        </React.Fragment>
        )
    }

    simpleHRow(attribute) {
		if(this.isEditing() && !attribute.readOnly){
			const data = this.state.editingFormData;
        	var val = data ? commons.getPropByString(data, attribute.dataField) : '';
			var editor = commons.getInputType(attribute);
			var showLabel = attribute.labelLess !== 'true';
			
			if(attribute.editorComponent){
				return  <Form.Group className="field field-string" >
					{showLabel && <Form.Label>{attribute.name}</Form.Label>}<br/>
					{attribute.editorComponent()}
				</Form.Group>
			}
			
			if("select" === editor && attribute.enumProvider){
				var options = [], enums = attribute.enumProvider()
				if(attribute.required !== true){
					options.push(<option value=''>Select...</option>)	
				}
				
				enums.map(e => {
					var opt = <option value={e.key}>{e.value}</option>
					options.push(opt)
				})
				
				return (
					<React.Fragment>	
						<Form.Group className="field field-string">
							{showLabel && <Form.Label>{attribute.name}</Form.Label>}
							<Form.Control as="select"
								type={'select'}
								onChange={this.handleFormChange} 
								name={attribute.dataField}>
								{options}
							</Form.Control>
						</Form.Group>
			        </React.Fragment>
				)
			}
			
			if("date" === editor){
				// date must be converted in that format
				// otherwise the dislayed date in input is wrong
				//val = val.split(' ')[0]
				//val = moment(str, 'YYYY-MM-DD')
				val = val ? moment(val, 'YYYYMMDD') : null
				var date = val ? val.toDate() : null;
				return (
					<Form.Group className="field field-string" >
			        	{showLabel && <Form.Label>{attribute.name}</Form.Label>}<br/>
			        	<DatePicker
			        		selected={date}
					        onChange={e => this.handleFormChange(e, attribute.dataField, 'date')}
							placeholderText={attribute.placeHolder}
							dateFormat="dd-MM-yyyy"
					      />
			        	{feedBack}
			        </Form.Group>
				)
			}
			
			var feedBack;
			if(attribute.invalidFeedBack){
				feedBack = <Form.Control.Feedback type="invalid">
            		{attribute.invalidFeedBack}
            	</Form.Control.Feedback>
			}
			
			if('textarea' === editor){
				return (
					 <Form.Group className="field field-string" >
			        	{showLabel && <Form.Label>{attribute.name}</Form.Label>}
			        	<Form.Control placeholder={attribute.placeHolder}
			        		onChange={e=>this.handleFormChange(e)}
			        		name={attribute.dataField}
			        	 	defaultValue={val}
			        		value={val} type={attribute.type ? attribute.type: 'textarea'}
			        		as="textarea" rows="4"
			        		required={attribute.required}/>
			        	{feedBack}
			        </Form.Group>
				)
			}
			
			if('checkbox' === editor){
				return (
					 <Form.Group className="field field-string" >
			        	<Form.Check
			        		onChange={e=>this.handleFormChange(e)}
			        		name={attribute.dataField}
			        	 	defaultValue={val}
			        		value={val} label={attribute.name}
			        		required={attribute.required}/>
			        	{feedBack}
			        </Form.Group>
				)
			}
			
			return (
				 <Form.Group className="field field-string" >
		        	{showLabel && <Form.Label>{attribute.name}</Form.Label>}
		        	<Form.Control placeholder={attribute.placeHolder}
		        		onChange={e=>this.handleFormChange(e)}
		        		name={attribute.dataField}
		        	 	defaultValue={val}
		        		value={val} type={attribute.type ? attribute.type: 'text'}
		        		pattern={attribute.pattern}
		        		required={attribute.required}/>
		        	{feedBack}
		        </Form.Group>
			)
		}
		else {
			const data = this.state.initialData;
			const value = data ? commons.getPropByString(data, attribute.dataField) : '';
			const display = commons.getAttributeViewer(attribute, value)
			var suffix
			if(attribute.suffix){
				suffix = attribute.suffix
			}
			return (
				<React.Fragment>
					<table width="100%">
						<tr className="dt-center"> 
							<td width="40%" className="dt-form dt-center"><Label className="control-label-view">{attribute.name}</Label></td>
							<td width="60%" className="dt-form dt-center" style={{'word-wrap':'break-word'}}>{display} {suffix}</td>
						</tr>
					</table>
				</React.Fragment>
			)
		}
    }


    actionableHRow(attribute) {
        const data = this.state.editingFormData;
        var val = commons.getPropByString(data, attribute.dataField);
        var rowActions = attribute.rowActions ? attribute.rowActions() : "";
        var rowGroupActions = attribute.rowGroupActions ? attribute.rowGroupActions() : "";
        var editor = commons.getInputType(attribute);
        return(
            <React.Fragment>
                <tr> 
                    <td><Label className="control-label-view">{attribute.name}</Label></td>
                    <td>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td><Input type={editor} defaultValue={val} onChange={(e) => this.handleFormChange(e)} name={attribute.dataField} pattern={attribute.pattern}/></td>
                                    <td>{rowActions}</td>
                                </tr>
                                <tr>
                                    <td>{attribute.empty}</td>
                                    <td>{rowGroupActions}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
          </React.Fragment>
        )
    }
    
    processFooter(){
        var action;
        if(this.props.attributesListConfig.footerActions){
            action = this.props.attributesListConfig.footerActions();
		}
		else if(this.props.standardFooterActions) {
			action = this.standardFooterActions(this.props.attributesListConfig.formId, 
					this.props.attributesListConfig)
		}
        return action;
	}
	
	isEditing(){
		var formId = this.props.attributesListConfig.formId;
		return this.state.formsState[formId + '_view'] === 'edit' || this.props.formMode === 'create_object' 
	}
	
	componentWillReceiveProps(props) {
		this.setState({
			editingFormData: props.data,
			initialData: props.data
		})
	}

    render() {
		const attributes = this.props.attributesListConfig.attributes;
		var attrs = this.processGroup(attributes);
		
		// TOP LEVEL COMMONE HEADER OF THE GROUP
		// IF THERE IS ONE
        var finalheader;
        if(this.props.displayHeader === true){
            var header = this.processHeader();
            finalheader = (
                <table width="100%" id="dt-form">
					<tbody>
						{header}
					</tbody>
                </table>
           )
        }

        // COMMONS FOOTER
        var finalFooter;
        var footer = this.processFooter();
        if(footer){
            finalFooter = (
                <div className="btn-toolbar-right">{footer}</div>
            )
        }

        // body classname
        var bodyClassName = "no-border";
        if(this.props.attributesListConfig.addHeaderMargin || this.props.addHeaderMargin){
            bodyClassName = "no-border noBorder jsoagger-top-margin-20";
        }

		// IF TOP LEVEL CONFIGURATION HAS DEFINED A FORMID ATTRIBUTE,
		// MEANS THAT ALL BLOCS BELONGS TO SAME FORM
		var body
		if(this.props.attributesListConfig.formId){
			if(this.isEditing()){
				body = <div className={this.props.cardClassName}>
						<Form ref={form => this.formEl = form} noValidate validated={this.state.formValidated} id={this.props.attributesListConfig.formId}>
							{attrs}
						</Form>
				</div>
			}
			else {
				body = <div className={this.props.cardClassName}>
						<Table id="dt-form" borderless={this.props.attributesListConfig.borderLess} 
							size="sm" className={bodyClassName}>
							<tbody>{attrs}</tbody>
						</Table>
				</div>
			}
			 
		}
		else {
			body = <div className={this.props.cardClassName}>
					<Table id="dt-form" borderless={this.props.attributesListConfig.borderLess || this.isEditing()} 
						size="sm" className={bodyClassName}>
						<tbody>{attrs}</tbody>
					</Table>
			</div> 
		}

        return (
            <div className="attributes-list">
                {finalheader}
				{body}
                {finalFooter}
            </div>
        )
    } 
}

AttributeListGroup.propTypes = propTypes;
AttributeListGroup.defaultProps = defaultProps;


export default AttributeListGroup;


