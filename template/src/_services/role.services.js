import { _doGet,_doPost,_doPut, _doDelete, buildURLQuery, API_ROOT } from './utils/services.config';

export const roleService = {    
	getUserRoles,
	addRoleToUser,
	removeRoleToUser,
	searchRoleByNameLike
}

async function searchRoleByNameLike(searchTerm, userAccountId, containerId){
	const uri = '/transdev/base/v1/secured/api/role/searchRoleByNameLike/?searchTerm=' + searchTerm + '&userAccountId=' + userAccountId
		 + '&containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function removeRoleToUser(userAccountId, roleId, containerId){
	const uri = '/transdev/base/v1/secured/api/role/byAccount/' + userAccountId + '?containerId=' + containerId + '&roleId=' + roleId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url);
}

async function getUserRoles(userAccountId, containerId){
	const uri = '/transdev/base/v1/secured/api/role/byAccount/' + userAccountId + '?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function addRoleToUser(userAccountId, roleId, containerId){
	const uri = '/transdev/base/v1/secured/api/role/byAccount/' + userAccountId + '?containerId=' + containerId + '&roleId=' + roleId;
	const url = `${API_ROOT}` + uri;
    return _doPut(url);
}
