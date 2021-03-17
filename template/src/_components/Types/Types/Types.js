import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { containerService } from '_services/container.services.js';
import { typeService } from '_services/type.services.js';
import Tree from 'rc-tree';
import {TypeDetails, WaitingPane, EmptyPane} from '_components'

import 'rc-tree/assets/index.css';

/**
 * Manage types
 */
class Types extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: '',
            loading: true,
            metaData: '',
            firstRender: true,
            selectedItemLink: null,
            dataRefreshed: false,
        }
    }

    selectItem(itemId){
        this.setState({selectedItemLink: itemId})
    }

    componentDidMount(){
		containerService
			.getRootTypes(0, -1, true, this.props.containerId)
			.then(json => {
				return json;
			})
			.then(json => {
				this.setState({
					items: JSON.stringify(json.data),
					metaData: JSON.stringify(json.metaData),
					loading: false
				})
			})
			.catch(error => {
				console.error(error);
				 this.setState({
					loading: false
				})
			})
	}
    render() {
        const rawitems = this.state.items;
        const rawmetaData = this.state.metaData;

        var leftContent, rightContent;
        if(this.state.loading){
        	leftContent = <WaitingPane />;
        	rightContent = <WaitingPane />;
        }
        else {
	        if(rawmetaData) {
	            const items = JSON.parse(rawitems);
	            leftContent = <JSoaggerReactTree
					containerId={this.props.containerId}
	            	rawTreeItems={items}
	            	selectItem={(itemId) => this.selectItem(itemId)}/>
	        }

	        if(this.state.selectedItemLink){
	        	rightContent = <TypeDetails
									{...this.props}
									itemId={this.state.selectedItemLink}/>
	        }
	        else {
	        	rightContent =  <EmptyPane mainMessage='No item selected'/>
	        }
	    }

	   return (<>
		   <div className="admin-middle-pane types-list">
			   	<div className={'bordered-panel left'}>{leftContent}</div>
              	<div className="bordered-panel type-details right">{rightContent}</div>
            </div>
	    </>)
	  }
}

export default Types;


/**
 * Tree implementation for JSOAGGER type manager
 */
class JSoaggerReactTree extends React.Component {

	  static propTypes = {
	    keys: PropTypes.array,
	  }

	  constructor(props) {
	    super(props);
	    const keys = props.keys;

	    this.state = {
	      defaultExpandedKeys: ['root_node'],
	      defaultSelectedKeys: keys,
	      defaultCheckedKeys: keys,
	      treeData: [],
	    };
	  }

	  onLoadData = treeNode => {
	    return new Promise(resolve => {
	        const treeData = [...this.state.treeData];
	        const nodeKey = treeNode.props.eventKey

	        this.getChildrenTreeData(treeData, nodeKey);
	        resolve();
	    });
	  }

	  getChildrenTreeData(treeData, curNodeKey) {
		   if(curNodeKey !== 'root_node') {
			  const loop = (data, newChildren) => {
			    data.forEach(item => {
			      if (curNodeKey === item.key) {
			          item.children = newChildren;
			      }
			      if(item.children){
		    		loop(item.children, newChildren)
			      }
			    })
			  }

			  typeService
			  	.getSubtypeOf(curNodeKey, true, this.props.containerId)
		        .then(json => {
		        	let items = json.data
		        	if(items) {
		        		let children = []
			        	items.map(i => {
							children.push({key: i.attributes.id, title:
								i.attributes.displayName,
								isLeaf: false,
								icon: (props) => businessIcon(props)})
						})
						loop(treeData, children);
		        		this.setState({ treeData });
		        	}
		        })
		   }
	  }

	  onSelect = info => {
		  if(info.length > 0 && info[0] !== 'root_node'){
			  if(this.props.selectItem){
				  this.props.selectItem(info[0])
			  }
	  	  }
	  };

	  componentDidMount(){
			containerService
			.getRootTypes(0, -1, true, this.props.containerId)
	        .then(json => {
	            return json;
	        })
	        .then(json => {
	        	const treedata = generateRootTreeData(json.data)
	            this.setState({
	            	treeData: treedata
	            })
	        })
	        .catch(error => {
	        	console.error(error);
	        })

		}

	  render() {
		const { treeData } = this.state;
	    return (
	        <Tree
	          	ref={this.setTreeRef}
	          	className="myCls"
	          	showLine
	          	checkStrictly showIcon
	          	defaultExpandedKeys={this.state.defaultExpandedKeys}
	          	onExpand={this.onExpand}
	          	defaultSelectedKeys={this.state.defaultSelectedKeys}
	          	defaultCheckedKeys={this.state.defaultCheckedKeys}
	          	onSelect={this.onSelect}
	        	onCheck={this.onCheck}
	        	loadData={this.onLoadData}
	        	treeData={treeData}>
	        </Tree>
	    );
	  }
	}

const generateRootTreeData = (items) => {
	var treeData = []
	var children = []
	if(items){
		items.map(i => {
			children.push({key: i.attributes.id, title: i.attributes.displayName, isLeaf: false, icon: (props) => businessIcon(props)})
		})
	}
	treeData.push({key: 'root_node', title: 'Managed Business types', children: children, icon: (props) => businessIcon(props)})
	return treeData
}

const businessIcon = (props) => {
	if(props.eventkey === 'root_node') return <i className="fa fa-home fa-lg primary-icon-color"></i>
	return <i className="fa fa-cubes fa-md primary-icon-color"></i>
}
