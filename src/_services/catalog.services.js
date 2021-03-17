import { _doGet, _doPost, _doDelete, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const catalogService = {
		getCatalogs,
		createCatalog,
		deleteCatalog,
		getById,
		renameCatalog,
		setCatalogDisplayOrder,
		createRootCategory,
		setRootCategories,
		getRootCategories,
		getSelectableCategories,
		removeRootCategory,
		getProductsInCatalog,
		getProductsInCatalogAndInCategory,
		getProductsInCatalogAndNotInCategory,
		getCatalogsByType,
		getCatalogMembers,
		getNotMembersByNameLike,
		getMembersByNameLike,
		getNotMembers,
		allProductsInCatalog,
		addMember,
		removeMember,
		categorizeMember,
		deCategorizeMember,
		searchAllProductsInContainer,
		searchAllProducts_Without_ProductsCatalogCategory_Link
}
async function allProductsInCatalog(catalogId, containerId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/allProductsInCatalog?containerId=' + containerId + "&".concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function searchAllProductsInContainer(searchTerm, catalogId, containerId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/allProductsInContainer?containerId=' + containerId +
		"&searchTerm=" + searchTerm + "&".concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function searchAllProducts_Without_ProductsCatalogCategory_Link(catalogId, categoryId, containerId, searchTerm, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/allProductsNotInCategory?containerId=' + containerId +
		"&categoryId=" + categoryId + "&searchTerm=" + searchTerm + "&".concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getCatalogsByType(typePath, states, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/getByType?typePath=' + encodeURI(typePath) + '&states=' + states + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function categorizeMember(catalogId, memberId, categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/members/' + memberId + '/category?categoryId=' + categoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
async function deCategorizeMember(catalogId, memberId, categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/members/' + memberId + '/category?categoryId=' + categoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
function addMember(catalogId, memberId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/members/' + memberId + '?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
async function removeMember(catalogId, memberId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/members/' + memberId + '?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
async function getCatalogMembers(catalogId, params){
	return getProductsInCatalog(catalogId, params)
}
async function getNotMembers(catalogId, params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/notMembers?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getMembersByNameLike(catalogId, nameLike, containerId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/membersByNameLike?nameLike=' + nameLike + '&containerId=' + containerId + "&".concat(p)
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getNotMembersByNameLike(catalogId, nameLike, containerId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/notMembersByNameLike?nameLike=' + nameLike + '&containerId=' + containerId + "&".concat(p)
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getProductsInCatalog(catalogId, params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/members?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getProductsInCatalogAndInCategory(catalogId, params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/membersInCategory?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getProductsInCatalogAndNotInCategory(catalogId, params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/membersNotInCategory?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getSelectableCategories(catalogId, linkableCategoryTypeId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/allCategories?containerId=' + containerId + '&categoryTypeId=' + linkableCategoryTypeId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getRootCategories(catalogId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/rootCategories?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function createRootCategory(catalogId, formData, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/rootCategories/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function setRootCategories(catalogId, categoriesId, containerId){
	var categories = categoriesId.join(',')
	if(categoriesId.length === 0) return null
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/setRootCategories/?containerId=' + containerId + '&rootCategoriesId=' + categories;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
async function removeRootCategory(catalogId, rootCategoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/rootCategories/' + rootCategoryId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
/**
 * @returns
 */
async function getById(catalogId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getCatalogs(params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function createCatalog(formData){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/';
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
/**
 * @returns
 */
async function renameCatalog(id, formData, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + id + '/rename?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
/**
 * @returns
 */
async function setCatalogDisplayOrder(id, formData, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + id + '/setDisplayOrder?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
/**
 * @returns
 */
async function deleteCatalog(catalogId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/objectCatalog/' + catalogId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
