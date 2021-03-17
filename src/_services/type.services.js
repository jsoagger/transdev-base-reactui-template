import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const typeService = {
    getByPath,
    getById,
    getSubtypeOf,
    getLifecycleOf,
    getSubtypeOfRecursive,
    getTypeOf,
    getLinkConstraintsOf
};
async function getLinkConstraintsOf(linkTypeId, forRoleALogicalPath, containerId){
	const uri = "/transdev/base/v1/secured/api/typedObjectLink/" + linkTypeId + '/linkConstraints/?forRoleALogicalPath=' + forRoleALogicalPath + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);

}
async function getTypeOf(id, containerId){
	const uri = "/transdev/base/v1/secured/api/typeManaged/" + id + "/typeOf/?containerId=" + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get a type by its id
 *
 * @param {*} id
 */
async function getById(id, containerId){
	const uri = "/transdev/base/v1/secured/api/type/" + id + "/?containerId=" + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get a type by its path
 *
 * @param {*} typePath
 */
async function getByPath(typePath, containerId){
	var p = buildURLQuery({path: typePath});
	const uri = "/transdev/base/v1/secured/api/type/byPath/?containerId=" + containerId + '&'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get subtype of a base type
 *
 * @param {*} typePath The path of the parent type
 */
async function getSubtypeOf(typeId, includeParentItems, containerId) {
	var p = buildURLQuery({fetchInParent:includeParentItems});
	const uri = "/transdev/base/v1/secured/api/type/" + typeId + "/subtypes/?containerId=" + containerId + '&'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get subtype of a base type
 *
 * @param {*} typePath The path of the parent type
 */
async function getSubtypeOfRecursive(typeId, includeParentItems, containerId) {
	var p = buildURLQuery({fetchInParent:includeParentItems, recursive: 'true'});
	const uri = "/transdev/base/v1/secured/api/type/" + typeId + "/subtypes/?containerId=" + containerId + '&'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get type associated lifecycle
 *
 * @param typeId
 * @returns
 */
async function getLifecycleOf(typeId, containerId) {
	const uri = "/transdev/base/v1/secured/api/type/" + typeId + "/lifecycle/?containerId=" + containerId
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
