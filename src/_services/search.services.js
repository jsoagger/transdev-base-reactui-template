import {
	_doGet,
	buildURLQuery,
	API_ROOT
}
from './utils/services.config';

/**
 * Rev controlled
 */
export const searchService = {
	searchUserByNameLikeInWholeApplication,
	searchUserByLoginLikeInWholeApplication,
	searchContainerMemberByNameLike,
	searchContainerMemberByLoginLike,
	searchContainerMemberByLoginLike2,
	searchProductByNameLike,
	searchProductByReferenceLike
}
/**
 * @param login
 * @returns
 */
async function searchProductByNameLike(name, containerId) {
	const uri= '/transdev/base/v1/anon/api/products/search/byNameLike?name=' + name + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 * @param login
 * @returnspr
 */
async function searchProductByReferenceLike(reference, containerId) {
	const uri = '/transdev/base/v1/secured/api/product/byReferenceLike/?reference=' + reference + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 * Get account by name like, will do search in whole application.
 * Should be called only when working container is /Unaffiliated.
 *
 * @param login
 * @returns
 */
async function searchUserByNameLikeInWholeApplication(name, containerId) {
	const uri = '/transdev/people/v1/secured/api/principals/account/byNameLike/?name=' + name + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 * Get account by name like, will do search in whole application.
 * Should be called only when working container is /Unaffiliated.
 *
 * @param login
 * @returns
 */
async function searchUserByLoginLikeInWholeApplication(login, containerId) {
	const uri = '/transdev/people/v1/secured/transdev/api/principals/account/byLoginLike/?login=' + login + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 * Search given user in given container.
 * This function just query login not firstname/lastname because email
 * should be composed by person lastname/firstname.
 *
 * @returns
 */
async function searchContainerMemberByNameLike(name, containerId) {
	const uri = '/transdev/people/v1/secured/api/principals/account/memberByLoginLikeInContainer/?name=' + name + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
/**
 * Search given user in given container.
 *
 * @returns
 */
async function searchContainerMemberByLoginLike(login, containerId) {
	const uri = '/transdev/people/v1/secured/api/principals/account/memberByLoginLikeInContainer/?login=' + login + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}

/**
 * Search given user in given container.
 *
 * @returns
 */
async function searchContainerMemberByLoginLike2(queryParams, containerId) {
	var p = buildURLQuery(queryParams);
	if(queryParams.containerId === null) return null;
	const uri = '/transdev/people/v1/secured/api/principals/account/memberByLoginLike/?'.concat(p).concat('&containerId=' + containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
