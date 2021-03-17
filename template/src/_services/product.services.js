import { _doGet, _doPost, _doDelete, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';
import moment from 'moment'
/**
 * Default Export
 */
export const productsInstanceService =   {
		getProductsInCatalog,
		getProductsInCatalogCount,
		getProductsInCategory,
		getProductsInCategory2,
		switchCategory,
		getById,
		getProductCategories,
		updateIntroductionDate,
		updateDiscontinuationDate,
		updateProduct,
		updateCommercialAttributes,
		createProduct,
		removeFromCategory,
		addToCategories,
		addProductsToCategory,
		removeProductsFromCategory,
		searchProductByCommercialNameLike
}
async function searchProductByCommercialNameLike(searchTerm, containerId, params){
	var queryparams = ''
	if(params){
		queryparams = '&'.concat(buildURLQuery(params))
	}
	const uri = '/transdev/shop/v1/secured/api/productInstance/byNameLike?containerId=' + containerId + '&name=' + searchTerm.concat(queryparams);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);

}
async function createProduct(formData, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData, containerId));
}
async function updateProduct(productId, formData, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
async function updateCommercialAttributes(productId, formData, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/updateCommercialAttributes/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
async function updateIntroductionDate(productId, date, containerId){
	var params = {introductionDate: date}
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/updateIntroductionDate/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, params);
}
async function updateDiscontinuationDate(productId, date, containerId){
	var params = {discontinuationDate: date}
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/updateDiscontinuationDate/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, params);
}
async function getProductCategories(productId, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/categories/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getProductsInCatalog(catalogId, params, containerId){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shop/v1/secured/api/objectCatalog/' +  catalogId + '/products/?'.concat(p).concat('&containerId=' + containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getProductsInCatalogCount(catalogId, params, containerId){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shop/v1/secured/api/objectCatalog/' +  catalogId + '/countProducts/?'.concat(p).concat('&containerId=' + containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Products in that category in given state.
 *
 * @returns
 */
async function getProductsInCategory(params){
	var p = buildURLQuery(params);
	if(params.containerId === null) return null;
	const uri = '/transdev/shop/v1/secured/api/productInstance/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getProductsInCategory2(categoryId, containerId, states, avalaibleBefore, avalaibleAfter){
	let s = states === undefined || states === null || states.length === 0 ? '' : states.join(',')
	let bef = avalaibleBefore === null && avalaibleBefore !== ''? '' : moment(avalaibleBefore).format("DDMMYYYY")
	let aft = avalaibleAfter === null && avalaibleAfter !== '' ? '' : moment(avalaibleAfter).format("DDMMYYYY")
	var a = 'from:' + aft + 'to:'  + bef
	const uri = '/transdev/shop/v1/secured/api/productInstance/?c=' + categoryId + '&a=' + a +'&s=' + s + '&at=after&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getById(productId, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function removeFromCategory(productId, categoryId, containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/categories/?categoryId=' + categoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
async function switchCategory(productId, fromCategoryId, toCategoryId,  containerId){
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/switchCategory/?fromCategoryId=' + fromCategoryId + "&toCategoryId=" + toCategoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doPost(url);
}
async function addToCategories(productId, categoriesId, containerId){
	let catstring = categoriesId.join(",")
	const uri = '/transdev/shop/v1/secured/api/productInstance/' + productId + '/categories/?categoriesId=' + catstring + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url);
}

/**
 * ADD / REMOVE multiple products from one category
 */
async function addProductsToCategory(productsId, categoryId, containerId){
	let productsIdString = productsId.join(",")
	const uri = '/transdev/shop/v1/secured/api/productInstance/addProductsToCategories/?products=' + productsIdString + '&categoryId=' + categoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url);
}
async function removeProductsFromCategory(productsId, categoryId, containerId){
	let productsIdString = productsId.join(",")
	const uri = '/transdev/shop/v1/secured/api/productInstance/removeProductsFromCategories/?products=' + productsIdString + '&categoryId=' + categoryId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}
