import { _doGet, _doPost, _doDelete, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const categoryService = {
		getRootCategoriesByType,
		getAllCategoriesByType,
		getChildrenCategoriesOf,
		getParentCategoryOf,
		createCategory,
		deleteCategory,
		getById,
		renameCategory,
		updateCategory,
		getCategoryByInternaleName,
		getAllByInternalName,
		getRootCategoriesNoInCurrentCatalog
}
async function getAllByInternalName(internalNames, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/allByInternalName/?internalNames=' + internalNames + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getCategoryByInternaleName(internalName, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/byInternalName/?internalName=' + internalName + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Owner is a party or null (system)
 * @returns
 */
async function getRootCategoriesByType(typeId, ownerId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/rootCategories/?typeId='
		+ typeId + '&'
		+ 'containerId=' + containerId + '&'
		+ 'ownerId=' + ownerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getRootCategoriesNoInCurrentCatalog(typeId, catalogId, containerId, searchTerm){
	const uri = '/transdev/shopbase/v1/secured/api/category/rootCategoriesNoInCurrentCatalog/?typeId='
		+ typeId + '&'
		+ 'containerId=' + containerId + '&'
		+ 'searchTerm=' + searchTerm + '&'
		+ 'catalogId=' + catalogId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getAllCategoriesByType(typeId, ownerId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/allCategories/?typeId='
		+ typeId + '&'
		+ 'containerId=' + containerId + '&'
		+ 'ownerId=' + ownerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getChildrenCategoriesOf(categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + categoryId + '/children/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getById(categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + categoryId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getParentCategoryOf(categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + categoryId + '/parent/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function createCategory(formData){
	const uri = '/transdev/shopbase/v1/secured/api/category/';
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
/**
 * @returns
 */
async function renameCategory(id, formData, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + id + '/rename?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
/**
 * @returns
 */
async function updateCategory(id, formData, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + id + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
/**
 * @returns
 */
async function deleteCategory(categoryId, containerId){
	const uri = '/transdev/shopbase/v1/secured/api/category/' + categoryId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
