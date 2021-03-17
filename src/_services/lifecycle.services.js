import { _doGet, buildURLQuery, API_ROOT, _doPost, _doPut } from './utils/services.config';

/**
 * Export
 */
export const lifecycleService = {
    details,
    promote,
    setState,
    setLinkState,
    denote,
    statesBySetState,
    statesByAction,
    statesByPromote,
    statesByDenote,
    getAllPossibleStatesOfLifecyle,
    updateMasterAttributes,
    setStateFromExternalApp
};
async function statesByAction(lifecycleId, fromState, actionName, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycle/' + lifecycleId + '/statesByAction/?id=' + lifecycleId + '&fromState=' + fromState + '&actionName=' + actionName + '&containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}
async function updateMasterAttributes(lifecycleId, formData, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycle/' + lifecycleId + '/updateMasterAttributes?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doPut(url, formData)
}
/**
 * Get a lifecycle for a given identifier.
 *
 * @param lifecycleId
 * @returns Promise
 */
async function details(lifecycleId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycle/' + lifecycleId + '?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 */
async function promote(lifecycleManagedId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/promote?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function denote(lifecycleManagedId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/denote?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function setState(lifecycleManagedId, state, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/setState/?state=' + state + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function setStateFromExternalApp(lifecycleManagedId, state, actionName) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/setStateFromExternalApp/?state=' + state + '&actionName=' + actionName;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function setLinkState(roleAid, roleBid, state, linkClass, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + roleAid + '/setLinkState/' + roleBid +'/?state=' + state + '&linkClass=' + linkClass + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}

async function statesBySetState(lifecycleManagedId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/statesBySetState?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function statesByPromote(lifecycleManagedId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/stateByPromote?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function statesByDenote(lifecycleManagedId, containerId) {
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/stateByDenote?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function getAllPossibleStatesOfLifecyle(lifecycleName, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycle/allStatesOf/?name=' + lifecycleName +'&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
