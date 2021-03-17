import React, { Component } from 'react';
import { batchService } from '_services/batch.services.js';
import { WaitingPane} from '_components';
import { commons } from '_helpers/commons.js';
import {Form} from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { toast } from 'react-toastify';

function processFile(files) {
  const f = files[0];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsDataURL(f);
  });
}

const validateSize = (event) => {
  let file = event.target.files[0];
  let size = 30000;
  let err = '';
  if (file.size > size) {
    err = file.type + ' le fichier est trop volimuneux\n';
    alert(err);
  }
}

class DataImport extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	loading: false,
             errors: [],
			masterFile: null
        }

        this.doBatchImport = this.doBatchImport.bind(this);
        this.masterFileUpdate = this.masterFileUpdate.bind(this)
		this.reinitParams = this.reinitParams.bind(this)
    }

    masterFileUpdate(e){
		this.setState({masterFile:e.target.files[0]})
    }

    doBatchImport(){
    	var formData2 = new FormData()
    	formData2.append('file', this.state.masterFile)

    	if(!this.state.masterFile){
    		toast.error('Veuillez selectionner un fichier')
    		return;
    	}
    	
    	var form = {}
    	form['separator.char'] = '|'
    	form['input.file.path'] = ''
    	form['job.name'] = "standardBatchImport"
        form['job.type'] = 'manageShop'
        form['domain'] = commons.getWorkingContainerPath(this.props.userContext)
        form['container'] = commons.getWorkingContainerPath(this.props.userContext)
        form['attach.discarded.file'] = false
        form['attach.log.file'] = false
        form['email.success.template.name'] = 'DEFAULT_LOADER_EMAIL_SUCCESS_TEMPLATE'
        form['email.error.template.name'] = 'DEFAULT_LOADER_EMAIL_ERROR_TEMPLATE'
        form['log.file.extension'] = '.log'
        form['separator.char'] = '|'
        form['comment.char'] = '#'
        form['notify.on.error'] = 'false'        	
        form['notify.on.success'] = 'false'
		form['mail.on.success'] = false
		form['mail.on.error'] = false

   	 	this.setState({loading: true})
		formData2.append('form', JSON.stringify(form));

    	let fileName  = this.state.masterFile.name
		this.reinitParams();

        batchService
		.batchLoad(formData2, this.props.containerId)
        .then(response => {
        	if(response.message){
				toast.error("Une erreur est survenue lors du traitement du fichier : " + fileName);
        	}
        	else {
				toast.success("Import des données est terminé (" + fileName + ")")
        	}

			this.setState({loading: false})
        })
		.catch(error => {
			this.setState({loading: false})
			toast.error("Une erreur est survenue lors du traitement du fichier : " + fileName);
		})
    }

	reinitParams(){
		this.fileInput.value = ""
    	this.setState({masterFile: null})
	}

    render() {
		var action = <div className={'btn-toolbar'}>
			<button onClick={this.reinitParams}>{'Réinitialiser le formulaire'}</button>
			<button onClick={this.doBatchImport}>{'Mettre à jour mes données'}</button>

		</div>

		var content = <div className={'master-file-input'}>
			<input type="file" onChange={this.masterFileUpdate} ref={ref=> this.fileInput = ref} accept={'.csv'}/>
		</div>

		if(this.state.loading){
			return <div>
				<WaitingPane mainMessage={'Chargement de données'} secondaryMessage={'Veuillez patienter...'}/>
			</div>
		}

 	    return <>
		   {content}
		   {action}
	    </>
    }
}

export default DataImport;
