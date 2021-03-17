import { _doGet, buildURLQuery, _doPut, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const contactableService = {
	getWebContacts,
	getTelecomContacts,
	getPostalContacts,
	updateWebContacts,
	updateTelecomContacts,
	updatePostalContacts,
	getAllContacts,
	getContactableContactMechanismByRole
};

async function getContactableContactMechanismByRole(contactableId, role, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/byRole?role=' + role + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

/**
 */
async function getAllContacts(contactableId, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 */
async function updatePostalContacts(contactableId, contactMecId, payload, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/postal?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, payload);
}
/**
 */
async function updateTelecomContacts(contactableId, contactMecId, payload, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/telecom?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, payload);
}
/**
 */
async function updateWebContacts(contactableId, contactMecId, payload, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/web?add=false&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, payload);
}
/**
 */
async function getPostalContacts(contactableId, contactMecId, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 */
async function getTelecomContacts(contactableId, contactMecId, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 */
async function getWebContacts(contactableId, contactMecId, containerId){
	const uri = '/transdev/contactable/v1/secured/api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
