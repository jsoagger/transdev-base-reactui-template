import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const folderTemplateService = {
    getById,
    seartTemplateByNameLike
};
/**
 * Get a folder template by its identifier.
 *
 * @param {*} id
 */
async function getById(id, containerId) {
    const uri = "/transdev/base/v1/secured/api/folderTemplate/".concat(id).concat("?containerId=").concat(containerId);
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function seartTemplateByNameLike(containerId, params){
	var p = buildURLQuery(params);
	const uri = "/transdev/base/v1/secured/api/folderTemplate/searchByNameLike/?".concat(p);
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
