import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	AttributesGroup,
	DataTable,
	EmptyPane,
} from '_components';
import ContentHolderPrimaryInfo from '_components/ContentHolder/ContentHolderInfo/ContentHolderPrimaryInfo.js'
import rootTypeManaged from '_components/Types/_typesManaged.js';
import { businessRulesService } from '_services/business.rule.services.js';
import { typeService } from '_services/type.services.js';
import { commons } from '_helpers/commons.js';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const summaryAttributesList = {
    items: [
        {
            attributes: [
                {name: 'Display name', dataField: 'attributes.displayName'},
                {name: 'Logical name', dataField: 'attributes.logicalName'},
                {name: 'Logical path', dataField: 'attributes.logicalPath'},
                {name: 'Description',  dataField: 'attributes.description'},
                {name: 'Icon path',    dataField: 'attributes.iconPath'},
	            {name: 'Icon name',    dataField: 'attributes.iconName'},
	            {name: 'I18N key',   dataField: 'attributes.i18nKey'},
            ]
        },
    ],
}

const localisationAttributesList = {
	    items: [
	        {
	            attributes: [
	                {name: 'Icon path',    dataField: 'attributes.iconPath'},
	                {name: 'Icon name',    dataField: 'attributes.iconName'},
	                {name: 'I18N key',   dataField: 'attributes.i18nKey'},
	            ]
	        },
	    ],
	}

const propTypes = {
	item: PropTypes.any,
};

const defaultProps = {
	item: {},
};

const summaryTabContent = (item) => {
    var view = (<>
		        <AttributesGroup
		        	attributesGroup={summaryAttributesList}
		        	data={item}
		        	orientation="horizontal"
		        	displayHeader={true}/>
	   </>
    )

		return view;
}


/**
 * Type info view
 */
class TypeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            tabContent: null,

            vetoableBusinessRulesItems: [],
            vetoableBusinessRulesItemsMetaData: {},

            afterCommitSuccessBusinessRulesItems: [],
            afterCommitSuccessBusinessRulesItemsMetaData: {},

            afterCommitErrorBusinessRulesItems: [],
            afterCommitErrorBusinessRulesItemsMetaData: {},
        }

        this.toggle = this.toggle.bind(this);
		this.lifecycleOf = this.lifecycleOf.bind(this);
    }

    tabsConfig() {
    	const tabsConfig = {
		    tabItems: [
		        {id: '1', title: 'Overview', tabContent: (item) => summaryTabContent(item)},
		        {id: '2', title: 'Applicable Business rules', tabContent: (item) => this.businessRulesTab()},
		        //{id: '3', title: 'Dynamical attributes', tabContent: () => dynAttributesTabContent()},
		    ],
		}

    	return tabsConfig
	 }

    lifecycleOf(v) {
    	const d = [];
    	let { lifecycle } = this.state
    	if(lifecycle) {
			return <ContentHolderPrimaryInfo
					containerId={this.props.containerId}
					noContentMessage='Selected business type has no lifecycle'
					displayHeader={false}
					canUpload={true}
					contentHolderFileName={this.state.lifecycle.lifecycle}
					contentHolderId={this.state.lifecycle.lifecycleIterationId} />
    	}

		let itemName = this.state.item.attributes.displayName
		return <div>
				<strong>{itemName}</strong> has no associated lifecycle.
		</div>

        return d
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    getFormQuery(item, phase){
    	//const logicalName = item.attributes.logicalName
    	const logicalPath = item.attributes.logicalPath

    	var classname
    	rootTypeManaged.items.map(type => {
    		if(type.rootType === logicalPath || logicalPath.startsWith(type.rootType + '/')){
    			classname = type.businessClass
    		}
    	})

    	let form = new FormData()
    	form['businessClass']= classname
    	form['vetoable'] = true
    	form['container'] = this.props.containerId
    	form['includeParentRules'] = 'true'
    	form['businessType'] = item.attributes.id
    	form['phase'] = phase

    	return form
    }
    async loadVetoableBusinessRule(item) {
    	if(item) {
	    	let form = this.getFormQuery(item, '0')
	    	businessRulesService
	    	.getApplicableRules(form, this.props.containerId)
	    	.then(e => {
	    		if(e){
	    			this.setState({
	    				vetoableBusinessRulesItems: e.data ? e.data : [],
	    				vetoableBusinessRulesItemsMetaData: e.metaData
	    			})
	    		}
	    		else {
	    			this.setState({
	    				vetoableBusinessRulesItems: [],
	    				vetoableBusinessRulesItemsMetaData: {}
	    			})
	    		}
	    	})
    	}
    }
    async loadAfterCommitSuccessBusinessRule(item) {
    	if(item) {
	    	let form = this.getFormQuery(item, '1')
	    	businessRulesService
	    	.getApplicableRules(form, this.props.containerId)
	    	.then(e => {
	    		if(e){
	    			this.setState({
	    				afterCommitSuccessBusinessRulesItems: e.data ? e.data : [],
	    				afterCommitSuccessBusinessRulesItemsMetaData: e.metaData
	    			})
	    		}
	    		else {
	    			this.setState({
	    				afterCommitSuccessBusinessRulesItems: [],
	    				afterCommitSuccessBusinessRulesItemsMetaData: {}
	    			})
	    		}
	    	})
    	}
    }
    async loadAfterCommitErrorBusinessRule(item) {
    	if(item) {
	    	let form = this.getFormQuery(item, '2')
	    	businessRulesService
	    	.getApplicableRules(form, this.props.containerId)
	    	.then(e => {
	    		if(e){
	    			this.setState({
	    				afterCommitErrorBusinessRulesItems: e.data ? e.data : [],
	    				afterCommitErrorBusinessRulesItemsMetaData: e.metaData
	    			})
	    		}
	    		else {
	    			this.setState({
	    				afterCommitErrorBusinessRulesItems: [],
	    				afterCommitErrorBusinessRulesItemsMetaData: {}
	    			})
	    		}
	    	})
    	}
    }
    vetoableRulesDisplay(){
    	var containerName = commons.getWorkingContainerName(this.props.userContext)
    	var content = <div className="half-opacity"><p>
    			<strong>{containerName}</strong> has no vetoable business rules for {this.state.item.attributes.displayName}
    	</p></div>

    	if(this.state.vetoableBusinessRulesItems && this.state.vetoableBusinessRulesItems.length > 0){
    		content = <DataTable
	        	items={JSON.stringify(this.state.vetoableBusinessRulesItems)}
	        	metaData={JSON.stringify(this.state.vetoableBusinessRulesMetaData)}
	            tableConfig={tableConfig}
	        	paginate={false}/>

	        return <>
							<p className="form-title-level-0">Vetoable rules</p>
			        {content}
	    	</>
    	}

    	return <></>
    }
    afterCommitSuccessRulesDisplay(){
    	var containerName = commons.getWorkingContainerName(this.props.userContext)
    	var content = <div className="half-opacity"><p>
    		<strong>{containerName}</strong> has no after commit success business rules for {this.state.item.attributes.displayName}
    	</p></div>

    	if(this.state.afterCommitSuccessBusinessRulesItems && this.state.afterCommitSuccessBusinessRulesItems.length > 0){
    		content = <DataTable
	        		items={JSON.stringify(this.state.afterCommitSuccessBusinessRulesItems)}
	        		metaData={JSON.stringify(this.state.afterCommitSuccessBusinessRulesMetaData)}
	            tableConfig={tableConfig}
	        		paginate={false}/>

	        return <>
						<h3 className="form-title-level-0">After commit success</h3>
			      {content}
	    	</>
    	}

    	return <></>
    }
    afterCommitErrorRulesDisplay(){
    	var content = 'N/A'
		var containerName = commons.getWorkingContainerName(this.props.userContext)
    	var content = <div className="half-opacity"><p>
    		<strong>{containerName}</strong> has no after commit error business rules for {this.state.item.attributes.displayName}
    	</p></div>

    	if(this.state.afterCommitErrorBusinessRulesItems && this.state.afterCommitErrorBusinessRulesItems.length > 0){
    		content = <DataTable
	        	items={JSON.stringify(this.state.afterCommitErrorBusinessRulesItems)}
	        	metaData={JSON.stringify(this.state.afterCommitErrorBusinessRulesMetaData)}
	            tableConfig={tableConfig}
	        	paginate={false}/>

	        return <>
							<h6 className="">AFTER COMMIT ERROR</h6>
			        {content}
	    	</>
    	}

    	return <></>
    }
    businessRulesTab(){

    	var haveSomethingToDisplay = this.state.vetoableBusinessRulesItems.length > 0 ||
    	this.state.afterCommitSuccessBusinessRulesItems.length > 0 || this.state.afterCommitErrorBusinessRulesItems.length > 0;

    	if(haveSomethingToDisplay){
	    	return <div>
	    			{this.vetoableRulesDisplay()}
		        {this.afterCommitSuccessRulesDisplay()}
		        {this.afterCommitErrorRulesDisplay()}
		    </div>
	    }
	    else {
	    	return <EmptyPane mainMessage='No applicable business rule'
							  secondaryMessage='There is no applicable business rule for current selected business type'/>
	    }
    }

    /**
     * Called the first time component is rendered
     */
    componentDidMount() {
    	if(this.props.itemId && this.props.itemId !== 'root_node') {
    		this.loadData(this.props.itemId)
    	}
    }
    /**
     * Called when component is re rendered with new props (when selecting item)
     */
    componentWillReceiveProps(nextProps){
    	if(this.props.itemId && nextProps.itemId !== 'root_node') {
    		this.loadData(nextProps.itemId)
    	}
    }

    loadData(itemId) {
    	typeService
		.getById(itemId, this.props.containerId)
		.then(json => {
			let type = json.data
			this.setState({
				item: json.data,
				lifecycle:null,
			})

			// load business rules
			this.loadVetoableBusinessRule(type)
			this.loadAfterCommitSuccessBusinessRule(type)
			this.loadAfterCommitErrorBusinessRule(type)

	    	// load lifecycles
			typeService
			.getLifecycleOf(type.attributes.id, this.props.containerId)
			.then(json => {
				this.setState({
					lifecycle: json && json.data ? json.data.attributes : null
				})
			}).catch(error => {
	    		this.setState({lifecycle: null})
	        });
		})
    }

    render() {
        const { item } = this.state;

        const navTabItems = [];
        const navTabContents = [];
        const lifecycleAttributesList = {
			items: [
					{
						title: 'LIFECYCLE',
						icon: 'icon-globe float-right',
						updatable: false,
						attributes: [
							{ displayComponent: (v) => this.lifecycleOf(v), dataField: 'attributes.logicalName', type: 'custom'},
						]
					}
				  ],
		}

        if(item) {
        		const businessRulesTab = this.businessRulesTab()
            this.tabsConfig().tabItems.forEach(tabItem => {
                const id = tabItem.id;
                if(id === '2' && this.state.businessRulesItems){
		                	navTabContents.push( <Tab eventKey={id.toString()} title={tabItem.title}>
		                    {businessRulesTab}
		                </Tab>)
                }
                else if(id === '1'){
                	navTabContents.push(
	                		<Tab eventKey={id.toString()} title={tabItem.title}>
								<div>{tabItem.tabContent(item)}</div>
								<AttributesGroup
										attributesGroup={lifecycleAttributesList}
										data={item}
										orientation="horizontal"
										displayHeader={true}/>
	                		</Tab>
                	)
                }
                else {
                	navTabContents.push( <Tab eventKey={id.toString()} title={tabItem.title}>
                				<div>{tabItem.tabContent(item)}</div>
                    </Tab>
					)
                }
            });

            return (
				        <React.Fragment>
							<Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="admin-nav-tabs">
		           					{navTabContents}
							</Tabs>
				        </React.Fragment>
            );
		  }
		  else {
		       return (<React.Fragment>loading...</React.Fragment>)}
		  }
}


TypeDetails.propTypes = propTypes;
TypeDetails.defaultProps = defaultProps;

export default TypeDetails;

const tableConfig = {
		columnsConfig: [
					{ name:'', dataField: 'attributes.active', type: 'bool', displayComponent: (v) => activeOrNot(v)},
	        { name: 'Event', dataField: 'attributes.event'},
	        { name: 'Rule',  dataField: 'attributes.rule'},
		],
}

function activeOrNot(v){
	if(v){
		return <td> <i className="fa">.</i></td>
	}
	else {
		return <td> <i className="fa fa-ban fa-lg icon-red"></i></td>
	}
}
