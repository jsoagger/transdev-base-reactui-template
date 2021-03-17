import { _doGet, _doDelete, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const enTemplateService =  {
    getById,
    deleteTemplate,
    updateTemplate,
    seartTemplateByNameLike
};
/**
 * Get a folder template by its identifier.
 *
 * @param {*} id
 */
async function getById(id, containerId) {
    const uri = "/transdev/base/v1/secured/api/enTemplate/".concat(id).concat("?containerId=").concat(containerId);
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function deleteTemplate(id, containerId) {
    const uri = "/transdev/base/v1/secured/api/enTemplate/".concat(id).concat("?containerId=").concat(containerId);
    const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
async function updateTemplate(id, formdata, containerId) {
    const uri = "/transdev/base/v1/secured/api/enTemplate/".concat(id).concat("?containerId=").concat(containerId);
    const url = `${API_ROOT}` + uri;
    return _doPut(url, formdata);
}
async function seartTemplateByNameLike(containerId, params){
	var p = buildURLQuery(params);
	const uri = "/transdev/base/v1/secured/api/enTemplate/searchByNameLike/?".concat(p).concat('&containerId=' + containerId);
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
