import {
	GenderViewer
}
from '_components'
import React from 'react'
import {
	Label
}
from 'reactstrap';
import moment from 'moment';

export const commons = {
  toJSONObject,
	getPropByString,
	getInputType,
	indexOfItemInArray,
	clone,
	getAttributeViewer,
	getWorkingContainerName,
	getWorkingContainerPath,
	getWorkingContainerId,
	hasRoleAdmin,
	hasRoleSuperAdmin,
	hasRoleReader,
	hasRoleUser,
	hasRoleAnon,
	getRootContainerId,
	getCurrentUserAccountId,
	getCurrentUserAccountOwnerId,
	getRESTErrorMessages,
	hasRESTErrorMessages,
	getUrlVars,
	arrayRemove,
	setSessionId,
	jsoagger_core_logout,
	jsoagger_core_loginSuccess,
	jsoagger_core_loginError,
	sessionId,
	isLoggedIn,
	getSystemPreference,
	hasRole,
	hasAnyRole,
	jsoagger_core_isUserConnected,
	jsoagger_core_isAnonConnected,
	isLoggedInAsUser,
	isLoggedInAsAnon,
	isNotLoggedIn,
	clientContainerId,
	getContainerSetting,
	getBooleanContainerSetting
}

function getContainerSetting(containerSettingsRX, key){
	let value = ''
	containerSettingsRX.map(setting => {
		if(setting.attributes.key === key){
			value = setting.attributes.value;
		}
	})

	return value
}

function getBooleanContainerSetting(containerSettingsRX, key){
	var result = this.getContainerSetting(containerSettingsRX, key);
	if(result === 'oui' || result === 'true' || result === 'yes' || result === '1'){
		return true
	}
	return false;
}

function clientContainerId(userContextRX){
    return userContextRX.workingContainer.id
}

function hasAnyRole(userContextRX, roleNames){
	var result = false;
	if(userContextRX.rolesInWorkingContainer){
		userContextRX.rolesInWorkingContainer.map(role => {
			if(roleNames.includes(role.attributes.key)){
				result = true;
			}
		})
	}
	return result;
}

function hasRole(userContextRX, roleName){
	var result = false;
	if(userContextRX.rolesInWorkingContainer){
		userContextRX.rolesInWorkingContainer.map(role => {
			if(role.attributes.key === roleName){
				result = true;
				return true;
			}
		})
	}

	return result;
}

function getSystemPreference(userContextRX, name){
	var result;
	userContextRX.systemPreferences.map(preference => {
		if(preference.attributes.key === name){
			result = preference.attributes.value;
		}
	})
	return result;
}

function getRootContainerId(userContextRX){
	return userContextRX.applicationContainer?.id
}

function getWorkingContainerId(userContextRX){
	return userContextRX.workingContainer?.id
}

function hasRESTErrorMessages(response){
	var errorMessages = response.messages;
	if(errorMessages && errorMessages.length > 0){
		return true
	}
	return false
}

function getRESTErrorMessages(response){
	var errorMessages = response.messages,
	errorStates = [];
	if(errorMessages && errorMessages.length > 0){
		errorMessages.map(mes => {
			if(mes.detail !== undefined && mes.detail !== null && mes.detail !== 'null'){
				errorStates.push(mes.detail)
			}
		})
	}
	return errorStates
}
/**
 * When fetched single result from remote server, this json object must be
 * parsed like this in order to read attributes on it.
 *
 * @param data
 * @returns JSON object
 */
function toJSONObject(data){
	const d = JSON.stringify(data);
	const datason = JSON.parse(d);
	return datason;
}
function clone(data){
	const d = JSON.stringify(data);
	const datason = JSON.parse(d);
	return datason;
}
/**
 * Resolve attribute value on object.
 * Ex: Will read 'masterAttributes.name' on 'Obj'
 *
 * @param obj
 * @param propString
 * @returns
 */
function getPropByString (obj, propString) {
    if (!propString) return "-";

    var prop, props = propString.split('.');
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]];
}
/**
 *
 * @param {*} attribute
 */
function getInputType(attribute){
    switch(attribute.type){
        case 'string': return 'text';
        case 'text': return 'text';
        case 'textarea': return 'textarea';
        case 'bool': return 'checkbox';
        case 'email': return 'email';
        case 'tel': return 'tel';
        case 'number': return 'number';
        case 'select': return 'select';
        case 'password': return 'password';
        case 'date': return 'date';
        default: return 'text';
    }
}
function getAttributeViewer(attribute, value){
	const type = attribute.type
	if( 'gender' === type){
		return (
			<GenderViewer value={value}/>
		)
	}
	else if('bool' === type){
		return <React.Fragment>
			<input type='checkbox' disabled={true} defaultChecked={value} checked={value}/>
		</React.Fragment>
	}
	else if(attribute.staticValue){
		return <Label className="control-value-view">{attribute.staticValue}</Label>
	}
	else if(attribute.displayComponent){
		return attribute.displayComponent(value)
	}
	else if(attribute.type === 'date'){
		var dateformat = attribute.dateFormat
		if(value === null || value === '') return <span></span>

		const date = moment(value, 'YYYY-MM-DD HH:mm:ss S').format(dateformat);
		return <Label className="control-value-view">{date}</Label>
	}
	else {
		return <Label className="control-value-view">{String(value) === 'undefined' ? '' : String(value)}</Label>
	}
}
/**
 * Get the index of an item in given array.
 * Items arre compared by id
 */
function indexOfItemInArray(item, array){
	var index = -1
	var i= 0
	array.map(d => {
		if(d.id === item.id) index = i
		i++
	})
	return index
}

function getWorkingContainerName(userContextRX){
	return userContextRX.workingContainer.name
}

function getWorkingContainerPath(userContextRX){
	return userContextRX.workingContainer.path
}

function getWorkingContainer(userContextRX){
	return userContextRX.workingContainer.id;
}

function hasRoleAdmin(userContextRX){
	var admin = hasAnyRole(userContextRX,['ROLE_ADMIN', 'ROLE_SUPERADMIN']) || hasRoleSuperAdmin(userContextRX);
	return admin;
}

function hasRoleSuperAdmin(userContextRX){
	var result = false;
	userContextRX.rolesInApplicationContainer.map(role => {
		if(role.attributes.key === 'ROLE_SUPERADMIN'){
			result = true;
			return true;
		}
	})

	return result;
}

function hasRoleReader(userContextRX){
	if(userContextRX.rolesInWorkingContainer.length === 0){
		return true
	}
	return hasRole(userContextRX, 'ROLE_READER')
}

function hasRoleUser(userContextRX){
	if(userContextRX.rolesInWorkingContainer.length === 0){
		return false;
	}
	return hasRole(userContextRX,'ROLE_USER')
}

function hasRoleAnon(userContextRX){
	if(userContextRX.rolesInWorkingContainer.length === 0){
		return true
	}
	return hasRole(userContextRX,'ROLE_ANON')
}


/**
 * Return true if current user is super admin
 * @returns
 */
function isSuperAdministrator(userContextRX){
	if(userContextRX.rolesInWorkingContainer.length === 0){
		return false
	}
	return hasRole(userContextRX, 'ROLE_SUPERADMIN')
}
/**
 * @returns
 */
function getCurrentUserAccountId(userContextRX){
	return userContextRX.userAccount.id
}
/**
 * @returns
 */
function getCurrentUserAccountOwnerId(userContextRX){
	return userContextRX.userDetails.id
}
function getUrlVars() {
    var vars = {};
    return vars;
}
function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
}

function sessionId(){
	return localStorage.getItem('session_id');
}

function getCurrentUserAccountLogin(userContextRX){
	return userContextRX.userAccount.nickName;
}

function setSessionId(session_id){
	localStorage.setItem('session_id', session_id);
}

function jsoagger_core_loginSuccess(response) {
	let links = response.data.links;
	let userContext = {}
	userContext.rolesInApplicationContainer  = links.rolesInApplicationContainer.data
	userContext.rolesInWorkingContainer = links.rolesInWorkingContainer.data
	userContext.userPreferences = links.userPreferences.data
	userContext.systemPreferences = links.systemPreferences.data
	userContext.workingContainer = JSON.parse(links.workingContainer)
	userContext.applicationContainer = JSON.parse(links.applicationContainer)
	userContext.userAccount = JSON.parse(links.account)
	userContext.userDetails = JSON.parse(links.user)
	userContext.sessionId = localStorage.getItem('session_id')

	var isanon = userContext.userAccount.nickName === 'epanon';
	var isepadmin = userContext.userAccount.nickName === 'epadmin';
	if(isanon) {
		userContext.rolesInWorkingContainer = [{attributes:{key: 'ROLE_ANON'}}]
	}
	else if(isepadmin){
		userContext.rolesInWorkingContainer = [{attributes:{key: 'ROLE_ADMIN'}}, {attributes:{key: 'ROLE_USER'}}]
	}
	return userContext
}

function jsoagger_core_loginError(){
	localStorage.clear();
    localStorage.setItem('auth_error', true);
}

function jsoagger_core_logout() {
	localStorage.clear();
}

function jsoagger_core_isUserConnected (userContextRX) {
    var sessionId = localStorage.getItem('session_id'),
    session_valid = sessionId !== undefined && sessionId != null;
    return session_valid && userContextRX.userAccount.nickName !== 'epanon';
}

function jsoagger_core_isAnonConnected(userContextRX){
	var result = userContextRX.userAccount.nickName === 'epanon'
	return result;
}

function isNotLoggedIn(userContextRX){
	return !jsoagger_core_isUserConnected(userContextRX)
}

function isLoggedIn(userContextRX){
	return jsoagger_core_isUserConnected(userContextRX) || commons.jsoagger_core_isAnonConnected(userContextRX);
}

function isLoggedInAsUser(userContextRX){
	return jsoagger_core_isUserConnected(userContextRX) && !commons.jsoagger_core_isAnonConnected(userContextRX);
}

function isLoggedInAsAnon(userContextRX){
	return commons.jsoagger_core_isAnonConnected(userContextRX);
}
