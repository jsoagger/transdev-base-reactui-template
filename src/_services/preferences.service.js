import { _doGet, _doPost, _doDelete, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';

export const preferencesService = {
		getUserPreferences,
		getSystemPreferences,
		update,
		create,
		drop,
}
function getUserPreferences(ownerId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + ownerId + '/preferences?containerId=' + containerId + '&isUser=true';
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
function getSystemPreferences(ownerId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + ownerId + '/preferences?containerId=' + containerId + '&isUser=false';
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
function update(ownerId, preferenceId, containerId, value){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + ownerId + '/preferences/' + preferenceId + '?containerId=' + containerId + '&value=' + value;
	const url = `${API_ROOT}` + uri;
    return _doPut(url);
}
function create(formData){
	const uri = '/transdev/base/v1/secured/api/preferences/';
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
function drop(preferenceId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account//preferences/' + preferenceId + '?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
