import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import {contentHolderService} from '_services/contentHolder.services.js';
import ContentFileSelector from './ContentFileSelector.js';
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';

const propTypes = {
	contentHolderId: PropTypes.string.isRequired,
	canDelete: PropTypes.bool,
	canUpdload: PropTypes.bool,
	canDownload: PropTypes.bool,
	canView: PropTypes.bool,
}

const defaultProps = {
	canDelete: false,
	canUpdload: true,
	canDownload: true,
	canView: true,
}

/**
 * Download/Upload, view content action on a content holder
 */
class ContentHolderPrimaryAction extends Component {
	
	constructor(props){
		super(props)
		this.downloadPrimaryContent = this.downloadPrimaryContent.bind(this)
		this.viewPrimaryContent = this.viewPrimaryContent.bind(this)
		this.onChangeFile = this.onChangeFile.bind(this)
	}
	
	onChangeFile(e) {
		e.preventDefault()
		var file = e.target.files[0]
		var formData = new FormData()
		formData.append('file', file)
		contentHolderService
		.setPrimaryContentFile(this.props.contentHolderId, formData, this.props.containerId)
		.then( response => {
			if(response && response.status === 200){
				toast.success('Content was updated')
			}
			else {
				toast.error('Error occurs on update, content no updated!')
			}
		})
	}
	
	/**
	 * Download the primary content
	 */
	async downloadPrimaryContent(e){
		e.preventDefault()
		contentHolderService
		.downloadPrimaryContentBlob(this.props.contentHolderId, this.props.containerId)
		.then( blob => {
			toast.info('Telechargement terminé')
			FileSaver.saveAs(blob, 'primary.txt');
		})
	}
	/**
	 * View the primary content
	 */
	async viewPrimaryContent(e){
		e.preventDefault()
		contentHolderService
		.downloadPrimaryContent(this.props.contentHolderId, this.props.containerId)
		.then( response => {
			var blob = new Blob([response], {type:"plain/text;charset=UTF-8"});
			var blobUrl = URL.createObjectURL(blob);
			window.open(blobUrl)
		})
	}
	/**
	 * 
	 */
	render(){
		const canUpload = this.props.canUpload ? this.props.canUpload : false
		if(canUpload){
			return (<>
				<Button onClick={this.downloadPrimaryContent} hidden={!this.props.canDownload}><i className="fa fa-download fa-sm"></i>&nbsp;DOWNLOAD</Button>
				<ContentFileSelector hidden={!this.props.canUpdload} onChangeFile={this.onChangeFile}/>
			</>)
		}
		else {
			return (<>
				<Button  onClick={this.downloadPrimaryContent} hidden={!this.props.canDownload}><i className="fa fa-download fa-sm"></i>&nbsp;DOWNLOAD</Button>
			</>)
		}
		
	}
}

ContentHolderPrimaryAction.propTypes = propTypes;
ContentHolderPrimaryAction.defaultProps = defaultProps;

export default ContentHolderPrimaryAction;

