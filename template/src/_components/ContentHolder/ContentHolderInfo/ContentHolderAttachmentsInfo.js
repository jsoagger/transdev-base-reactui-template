import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { contentHolderService } from '_services/contentHolder.services.js';

const propTypes = {
	contentHolderId: PropTypes.string.isRequired
}

const defaultProps = {
}
/**
 * Displays Attachments content infos
 */
class ContentHolderAttachmentsInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
        	attachments: [],
        }
    }
    
    componentDidMount(){
    	let contentHolderId = this.props.contentHolderId
    	contentHolderService.contentInfos(contentHolderId, 'attachments', this.props.containerId)
    	.then(ci => {
    	})
    }

	render() {
		let header = (
			<label className="jsoagger-form-title-level-1">Attachments</label>
	    )
	    
	    if(this.state.attachments.length === 0){
			return (
				<React.Fragment>
	    			<div>
	    				{header}
	    				<strong>No content</strong>
	    			</div>
				</React.Fragment>
			)
	    }
	}
}

ContentHolderAttachmentsInfo.propTypes = propTypes;
ContentHolderAttachmentsInfo.defaultProps = defaultProps;

export default ContentHolderAttachmentsInfo;

