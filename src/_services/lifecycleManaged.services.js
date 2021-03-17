import { _doGet, buildURLQuery, API_ROOT, _doPost, _doPut } from './utils/services.config';

export const lifecycleManagedService = {
		statesByAction,
		allStates,
		fireStateMailing,
		lifecycleName
}
async function lifecycleName(lifecycleManagedId, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/lifecycleName/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}
async function statesByAction(lifecycleManagedId, fromState, actionName, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/statesByAction/?fromState=' + fromState + '&actionName=' + actionName + '&containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}
async function allStates(lifecycleManagedId, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/allStates/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function fireStateMailing(lifecycleManagedId, containerId){
	const uri = '/transdev/base/v1/secured/api/lifecycleManaged/' + lifecycleManagedId + '/fireStateMailing/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doPost(url)
}
