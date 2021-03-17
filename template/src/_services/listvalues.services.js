import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Export
 */
export const listValuesService = {
	names,
	listvalues,
	noLocale,
	details
};
async function listvalues(formData) {
	var p = buildURLQuery(formData);
	const uri = '/transdev/base/v1/secured/api/listvalues/?containerId=:containerId&'.concat(p);
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function names(containerId) {
	const uri = '/transdev/base/v1/secured/api/listvalues/names/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function noLocale(formData, containerId) {
	var p = buildURLQuery(formData);
	const uri = '/transdev/base/v1/secured/api/listvalues/noLocale/?containerId=' + containerId + '&'.concat(p);
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function details(id, containerId) {
	const uri = '/transdev/base/v1/secured/api/listvalues/details/' + id + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
