import {
	_doGet,
	_doGetText,
	_doPostMp,
	_doGetBlob,
	API_ROOT
}
from './utils/services.config';
/**
 * Default Export
 */
export const contentHolderService = {
	downloadPrimaryContent,
	downloadPrimaryContentBlob,
	downloadAttachment,
    contentInfos,
    setPrimaryContentFile,
    addAttachment,
}
async function addAttachment(contentHolderId, formData){

}
function downloadAttachment(contentHolderId, attachementId){

}
/**
 * Download the primary content
 *
 * @param contentHolderId
 * @returns
 */
function downloadPrimaryContent(contentHolderId, containerId) {
	let uri = '/transdev/base/v1/secured/api/contentHolder/' + contentHolderId + '/content/?role=primary&containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doGetText(url)
}
/**
 * Download primary content.
 *
 * @param contentHolderId
 * @returns
 */
function downloadPrimaryContentBlob(contentHolderId, containerId) {
	let uri = '/transdev/base/v1/secured/api/contentHolder/' + contentHolderId + '/content/?role=primary&containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doGetBlob(url)
}
/**
 * Set primary content.
 *
 * @param contentHolderId
 * @param formData
 * @returns
 */
function setPrimaryContentFile(contentHolderId, formData, containerId){
	let uri = '/transdev/base/v1/secured/api/contentHolder/' + contentHolderId + '/setContentFile/?role=primary&containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doPostMp(url, formData)
}
/**
 * Get content infos of given content holder.
 *
 * @param contentHolderId
 * @param role primary, attachments, all
 * @returns
 */
function contentInfos(contentHolderId, role, containerId){
	let uri = '/transdev/base/v1/secured/api/contentHolder/' + contentHolderId + '/contentInfo/?role=' + role + '&containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}
