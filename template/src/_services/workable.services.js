import { _doPost, _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 *
 */
export const workableService = {
    checkin,
    checkout,
    undoCheckout,
    workingCopy,
    originalCopy,
}
/**
 * Get the original copy.
 *
 * @param workableId
 * @returns
 */
function originalCopy(workableId, containerId){
	const uri = '/transdev/base/v1/secured/api/workable/' + workableId + '/originalCopy/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get the working copy
 *
 * @param workableId
 * @param comment
 * @returns
 */
function workingCopy(workableId, containerId){
	const uri = '/transdev/base/v1/secured/api/rc/' + workableId + '/workingCopy/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Checkout
 * @param workableId
 * @param comment
 * @returns
 */
function checkout(workableId, comment, containerId){
	const uri = '/transdev/base/v1/secured/api/workable/' + workableId + '/checkout/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
/**
 * Checkin
 * @param workableId
 * @param comment
 * @returns
 */
function checkin(workableId, comment, containerId){
	const uri = '/transdev/base/v1/secured/api/workable/' + workableId + '/checkin/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url, {'comment':'no comment'});
}
/**
 * Undo checkout
 * @param workableId
 * @param comment
 * @returns
 */
function undoCheckout(workableId, comment, containerId){
	const uri = '/transdev/base/v1/secured/api/workable/' + workableId + '/undoCheckout/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
