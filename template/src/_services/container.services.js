import { _doGet,_doPost, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const containerService = {
    getAllLifecycles,
    getAllFolderTemplates,
    getAllEmailTemplates,
    getAllTeamTemplates,
    getRootTypes,
    getAllMembers,
    getApplicationRootContainer,
    getChildrenContainers,
    getById,
    getByPath,
    getParentContainer,
    getAccessiblesChildrenContainers,
    getOwnedChildrenContainers,
    getAllAccessibleContainers,
    isUserContainerAdmin,
    countMembers,
    createContainer,
    getContainerSettings,
    updateContainerSetting,
    populateContainerSetting,
    getContainersOfOwner,
    populateFromSellsy
}
function populateFromSellsy(containerId){
	const uri = '/transdev/base/v1/secured/api/contained/' + containerId + '/populateFromSellsy';
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
function getContainersOfOwner(containerId, ownerId){
	const uri = '/transdev/base/v1/secured/api/container/ofOwner?ownerId=' + ownerId + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function populateContainerSetting(containerId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/populateSettings';
	const url = `${API_ROOT}` + uri;
    return _doPost(url);
}
function getContainerSettings(containerId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/settings';
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
function updateContainerSetting(formData, containerId, settingsId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/settings/' + settingsId + '/value';
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
async function createContainer(formData, containerId){
	const uri = '/transdev/base/v1/secured/api/contained/' + containerId ;
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData));
}
function countMembers (containerId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/countMembers';
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function isUserContainerAdmin(accountId, containerId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/isUserContainerAdmin/?accountId=' + accountId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function getParentContainer(id){
	const uri = '/transdev/base/v1/secured/api/container/' + id + '/parent';
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function getById(id){
	const uri = '/transdev/base/v1/secured/api/container/' + id;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function getByPath(path){
	const uri = '/transdev/base/v1/secured/api/container/?path=' + encodeURI(path);
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function getChildrenContainers(id){
	const uri = '/transdev/base/v1/secured/api/container/' + id + '/subContainers';
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
function getAllAccessibleContainers(containerId, accountId){
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/allAccessibleContainers/?userAccountId=' + accountId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}

function getOwnedChildrenContainers(id, accountId){
	const uri = '/transdev/base/v1/secured/api/container/' + id + '/ownerSubContainers?userAccountId=' + accountId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}

function getAccessiblesChildrenContainers(id, accountId){
	const uri = '/transdev/base/v1/secured/api/container/' + id + '/accessibleSubContainers/?userAccountId=' + accountId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
/**
 * Get the root container
 * @returns
 */
function getApplicationRootContainer(){
	const uri = "/transdev/base/v1/secured/api/container/?path=%2F";
	const url = `${API_ROOT}` + uri;
    return _doGet(url)
}
/**
 * Get all lifecycles.
 *
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllLifecycles(containerId, page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/lifecycles/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all folder templates.
 *
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllFolderTemplates(page, pageSize, includeParentItems, containerId) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/folderTemplates/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all email templates.
 *
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllEmailTemplates(page, pageSize, includeParentItems, containerId) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/enTemplates/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all team templates.
 *
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllTeamTemplates(page, pageSize, includeParentItems, containerId) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/teamTemplates/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get root types.
 *
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getRootTypes(page, pageSize, includeParentItems, containerId) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId + '/rootTypes/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get all members.
 *
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllMembers(page, pageSize, includeParentItems, containerId) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = '/transdev/base/v1/secured/api/container/' + containerId  + '/members/?'.concat(p);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
