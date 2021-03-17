import { _doPost, _doGet, API_ROOT, buildURLQuery } from './utils/services.config';

export const commandService = {
	updateDeliveryDate,
	updateUserPreferredDeliveryDate,
    getAllProductOrders,
    getProductOrdersAtState,
    getOrderById,
    getProductsInOrder,
    getOrderByNumber,
    getOrderOwner,
    searchProductOrders,
    searchOrdersByReference,
    searchOrdersOfOwner,
    updateAddressage,
    createDefaultAddressage,
    reorder
};
async function createDefaultAddressage(orderId, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/addressage/createDefault?containerId=' +containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}

async function updateAddressage(orderId, contactMecId, containerId, payload){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/addressage/' +  contactMecId + '/?containerId=' +containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(payload));
}

async function reorder(orderId, date, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/reorder?deliveryDate=' + date + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
async function updateUserPreferredDeliveryDate(orderId, date, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/userPreferredDeliveryDate?date=' + date + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
async function updateDeliveryDate(orderId, date, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/deliveryDate?date=' + date + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
/**
 * Search products with reference at state.
 * 
 * @param reference
 * @param atState
 * @returns
 */
async function searchOrdersByReference(reference, atState, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/searchOrdersByReference/?&reference=' + encodeURIComponent(reference) + '&status=' + encodeURIComponent(atState) + "&containerId=" + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Search products by owner login like.
 * 
 * @param login
 * @param atState
 * @returns
 */
async function searchOrdersOfOwner(login, atState, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/searchOrdersOfOwner/?login=' + login + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function getOrderOwner(orderId, containerId){
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/owner/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all products in order
 */
async function getProductsInOrder(orderId, containerId) {
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/products/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all orders of a party
 */
async function getOrderById(orderId, containerId) {
	const uri = '/transdev/shop/v1/secured/api/command/' + orderId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all orders of a party
 */
async function getOrderByNumber(number, containerId) {
	const uri = '/transdev/shop/v1/secured/api/command/byNumber/?number=' + number + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}


/**
 * Get all orders of a party
 */
function getAllProductOrders(peopleId, containerId) {
	const uri = '/transdev/shop/v1/secured/api/command/byOwner/' + peopleId + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

/**
 * Get all orders of a party
 */
function getProductOrdersAtState(peopleId, state, containerId) {
	const uri = '/transdev/shop/v1/secured/api/command/byOwner/' + peopleId + '/?state=' + state + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}


function searchProductOrders(params) {
	var p = buildURLQuery(params);
	const uri = '/transdev/shop/v1/secured/api/command/search/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

