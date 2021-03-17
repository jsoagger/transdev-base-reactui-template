import { _doPost, _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

export const loginService = {
    login,
    logout,
    loginAsAnon,
    postLogin
};
/**
 * Login to remote server
 */
function login(formdata) {
    const url = `${API_ROOT}/transdev/security/v1/anon/auth/login`;
    var bodyson = "{'username': '".concat(formdata.login)
        .concat("',").concat("'password': '").concat(formdata.password)
        .concat("'}");
    return _doPost(url, bodyson);
}
function loginAsAnon() {
    const url = `${API_ROOT}/transdev/security/v1/anon/auth/login`;
    var bodyson = "{'username': '".concat('epanon')
    .concat("',").concat("'password': '").concat('epadmin').concat("'}");
    return _doPost(url, bodyson);
}
/**
 * Logout
 */
function logout() {
    const url = `${API_ROOT}/transdev/security/v1/secured/api/auth/logout`;
    return _doPost(url);
}
/**
* With authorization because in some cases,
* authorization is not in local storage yet
*/
async function postLogin(authorization, containerId){
    let contId = containerId ? containerId : ''
	const url = `${API_ROOT}/transdev/security/v1/secured/api/auth/postlogin/?defaultContainerId=${contId}`;
	return _doGet(url, authorization);
}

