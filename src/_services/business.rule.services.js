import { _doGet, _doPost, _doDelete, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const businessRulesService = {
    getAllBusinessEvent,
    getApplicableRules,
    getById,
    activate,
    desactivate,
    deleteRule,
    setOrder,
    getAllBusinessClass,
    getAllBusinessTypes
}
function deleteRule(id, containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/' + id  + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
function setOrder(id, formData, containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/' + id  + '/setOrder/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
function activate(id, containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/' + id  + '/activate/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
function desactivate(id, containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/' + id  + '/desactivate/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
/**
 * Get all business events in application
 */
function getById(id, containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/' + id  + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getAllBusinessEvent(containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/businessEvents/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getAllBusinessClass(containerId){
	const uri = '/transdev/base/v1/secured/api/businessRule/businessClass/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getAllBusinessTypes(businessClass, containerId){
	const uri = "/transdev/base/v1/secured/api/businessRule/businessTypes/?&businessClass=" + businessClass + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get applicable rule.
 *
 * @param formData
 * @returns
 */
function getApplicableRules(formData, containerId){
	if(formData.eventKey === undefined) formData.eventKey = ''

	var p = buildURLQuery(formData);
	const uri = "/transdev/base/v1/secured/api/businessRule/applicableRules/?".concat(p).concat('&containerId=' + containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
