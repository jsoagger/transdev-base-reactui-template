import { _doPost,_doGet,_doPut, API_ROOT, _doDelete, buildURLQuery } from './utils/services.config';

export const accountService = {
    lock,
	unlock,
	resetPassword,
	updatePassword,
	lostPassword,
	updateLostPasswordByUser,
	accountDetails,
	accountOfParty,
	updatePersonProfile,
	updateOrgProfile,
	activateAccount,
	registerPersonWithAccount,
	registerOrgWithAccount,
	registerPersonWithAccountAnon,
	registerOrgWithAccountAnon,
	containersMembership,
	isUserInContainer,
	addContainerMembership,
	removeContainerMembership,
	ownerType,
	ownersName,
	isValidAccountLockToken
}
function isValidAccountLockToken(token) {
	const uri = '/transdev/security/v1/anon/auth/isValidAccountLockToken?token=' + token;
	var url = `${API_ROOT}` + uri
	return _doGet(url)
}
/**
 * Register a new user with account
 *
 * @param formData
 * @returns
 */
function registerPersonWithAccount(formData){
	const uri = '/transdev/people/v1/secured/api/person/';
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
function registerPersonWithAccountAnon(formData){
	const uri = '/transdev/people/v1/anon/api/person/';
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
/**
 * Register a new org with account
 *
 * @param formData
 * @returns
 */
function registerOrgWithAccount(formData){
	const uri = '/transdev/people/v1/secured/api/organization/';
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
function registerOrgWithAccountAnon(formData){
	const uri = '/v1/anon/api/organization/';
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
/**
 * Activate an account.
 *
 * @param accountId
 * @param formData
 * @returns
 */
function activateAccount(login, formData, lockToken){
	const uri = '/transdev/security/inactive/auth/activateAccount?login=' + login;
  var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
/**
 * Load an account with details of owner loaded in links.
 */
function accountDetails(accountId, containerId) {
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/details/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Loads account of a party  with its details loaded in links.
 */
function accountOfParty(partyId, containerId) {
	var params = {partyId: partyId};
	var p = buildURLQuery(params);
	const uri = '/transdev/people/v1/secured/api/principals/account/?containerId=' + containerId + '&' + p;
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Lock an account.
 *
 * @param {*} accountId
 */
function lock(accountId, containerId) {
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/lock/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Unlock an account. Super admin can unlock user account without
 * lock token
 *
 * @param {*} accountId
 * @param {*} lockToken Mandatory if not superadmin
 */
function unlock(accountId, lockToken, containerId) {
	var params = {lockToken: lockToken ? lockToken : ''};
	var p = buildURLQuery(params);
    const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/unlock?containerId=' + containerId + '&'.concat(p);
	var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Rest current password.
 *
 * @param {*} accountId
 */
function resetPassword(accountId, containerId) {
    const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/resetPassword?containerId=' + containerId;
	var url = `${API_ROOT}` + uri
	return _doPut(url);
}
/**
 * Update user password.
 *
 * @param {*} accountId
 * @param {*} formData
 */
function updatePassword(accountId, formData, containerId) {
    const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/updatePassword?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
    return _doPut(url, formData);
}
/**
 * Send an email to user with its token.
 *
 * @param {*} accountId
 */
function lostPassword(login) {
    const uri = '/transdev/security/v1/anon/auth/lostPassword?login=' + login;
    var url = `${API_ROOT}` + uri
    return _doGet(url);
}
// by user, another reset is by admin
function updateLostPasswordByUser(lockToken, formdata) {
    const uri = '/transdev/security/v1/anon/auth/resetPassword?token=' + lockToken;
	var url = `${API_ROOT}` + uri
	return _doPut(url, formdata);
}
/**
 * Update profile.
 *
 * @param profileId
 * @param formData
 * @returns
 */
function updatePersonProfile(profileId, formData, containerId){
	const uri = '/transdev/people/v1/secured/api/person/' + profileId + '?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
    return _doPut(url, formData);
}
/**
 * Update profile.
 *
 * @param profileId
 * @param formData
 * @returns
 */
function updateOrgProfile(profileId, formData, containerId){
	const uri = '/transdev/people/v1/secured/api/person/' + profileId + '?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
    return _doPut(url, formData);
}
/**
 * Get all container memberships of given user account.
 *
 * @param accountId
 * @returns
 */
function containersMembership(accountId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/containersMembership/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Return true is the account is declared member in that container.
 *
 * @returns
 */
function isUserInContainer(accountId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/containersMembership/' + containerId + '/isMember';
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Add account as member of container.
 *
 * @param accountId
 * @param containerId
 * @returns
 */
function addContainerMembership(accountId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/containersMembership/' + containerId;
    var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Remove an account from container members
 *
 * @param accountId
 * @param containerId
 * @returns
 */
function removeContainerMembership(accountId, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/' + accountId + '/containersMembership/' + containerId;
    var url = `${API_ROOT}` + uri
	return _doDelete(url);
}
/**
 * Returns the type of the owner.
 *
 * @param accoundId
 * @returns
 */
async function ownerType(accoundId, containerId){
	const uri = "/transdev/people/v1/secured/api/principals/account/" + accoundId + "/ownerType/?containerId=" + containerId
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function ownersName(ownersName, containerId){
	const uri = '/transdev/people/v1/secured/api/principals/account/ownersName/?ownersLogin=' + ownersName + '&containerId=' + containerId
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
