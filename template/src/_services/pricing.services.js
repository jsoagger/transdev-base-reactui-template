import { _doGet, _doPost, _doPut, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const pricingService = {
		getBasePrice,
		getById,
		getBasePrices,
		createBasePrice,
		updateBasePrice
}
async function updateBasePrice(productId, pricingId, formData, containerId){
	const uri = '/transdev/shop/v1/secured/api/pricing/' + pricingId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url, formData);
}
async function getById(pricingId, containerId){
	const uri = '/transdev/shop/v1/secured/api/pricing/' + pricingId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getBasePrices(productId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shop/v1/secured/api/pricing/products/' + productId + '/allBasePrices/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
async function getBasePrice(productId, params){
	var p = buildURLQuery(params);
	const uri = '/transdev/shop/v1/secured/api/pricing/products/' + productId + '/basePrice/?'.concat(p);
	const url = `${API_ROOT}` + uri;
	var dodo = _doGet(url);
    return dodo;
}
async function createBasePrice(productId, formData){
	if(formData.containerId == null) return null;
	const uri = '/transdev/shop/v1/secured/api/pricing/products/' + productId + '/basePrice/?containerId=' + formData.containerId;
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
