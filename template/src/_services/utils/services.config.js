import {commons}  from '../../_helpers/commons';

export const rootContainerId = 'MTppby5naXRodWIuanNvYWdnZXIuY29yZS5tb2RlbC5hcGkuY29tcG9zaXRlLkFwcGxpY2F0aW9uQ29udGFpbmVy';
export const backendRootContext = process.env.REACT_APP_CONTEXT_ROOT;
/*------------------------------------------------------------------------------------------------
 *
 * CALCULATE API ROOT URL ACCORDING TO HOSTNAME: API_ROOT
 *
 *------------------------------------------------------------------------------------------------*/
//https://daveceddia.com/multiple-environments-with-react/
const hostname = window && window.location && window.location.hostname;
const port = window && window.location && window.location.port;
var API_ROOTV;
if(/^localhost/.test(hostname)) {
	API_ROOTV = `http://${hostname}:8080/${backendRootContext}`;
}
else if(port && port > 0){
	API_ROOTV = `http://${hostname}:${port}/${backendRootContext}`;
}
else {
	API_ROOTV = `http://${hostname}/${backendRootContext}`;
}

export const API_ROOT = API_ROOTV;
/*------------------------------------------------------------------------------------------------
*
* URI PROCESSOR
*
*------------------------------------------------------------------------------------------------*/
/**
 * Usage buildURLQuery({name: 'x', gender: 'y'});
 * ==> name=x&gender=y
 */
export const buildURLQuery = params =>  {
	return Object.keys(params)
		.map(k => `${k}=${encodeURI(params[k])}`)
		.join('&');
};
/*------------------------------------------------------------------------------------------------
 *
 * POST QUERY ROOT
 *
 *------------------------------------------------------------------------------------------------*/
/**
 * Constructs a default POST query.
 *
 * @param {*} url Full URL
 * @param {*} data Data to post
 */
export const _doPost = async function(url, data, options) {
	let finalurl = url.replace(":containerId", '_replace_this_');
	if(data){
	    return fetch(appendAccessToken(finalurl), {
	    	timeout: options && options.timeout ?  options.timeout : 15000,
	        method: "POST",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	        body: data,
	    });
	}
	else {
		return fetch(appendAccessToken(finalurl), {
	        method: "POST",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	    })
	}
}
/**
 * Constructs a default POST query.
 *
 * @param {*} url Full URL
 * @param {*} data Data to post
 */
export const _doPostMp = async function(url, data, options) {
	let finalurl = url.replace(":containerId", '_replace_this_');
	if(data){
	    return fetch(appendAccessToken(finalurl), {
	        method: "POST",
	        headers: {
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	        body: data,
	    })
	    .then(response => {
	        var json = response.json();
	        return json;
	    });
	}
}

/*------------------------------------------------------------------------------------------------
*
* GET QUERY ROOT
*
*------------------------------------------------------------------------------------------------*/
/**
 * Constructs a GET query.
 *
 * @param {*} url Full URL
 */
export const _doGet = async function(url, addSessionId, authorization, options) {
	let finalurl = url.replace(":containerId", '_replace_this_');
	finalurl = appendAccessToken(finalurl);

    var response = await fetch(finalurl, {
		timeout: options && options.timeout ?  options.timeout : 15000,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authorization ? authorization : localStorage.getItem('session_id')
        },
    })
    .catch(error => {
    	console.log('Request failed', error);
  	});

  	handleExpiredAuthentication(response);

  	var json;
  	if(response.status === 200){
		json = await response.json();
	}
	else if(response.status === 204){
		json = {'error': '204'};
	}
	else if(response && response.status === 500){
		json = {'error': '500'};
	}

	return json;
}

export const _doGetText = async function(url) {
	let finalurl = url.replace(":containerId", '_replace_this_');
    return fetch(appendAccessToken(finalurl), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('session_id')
        },
    })
    .then(response => {
    	var myHeaders = response.headers;
    	return response.text();
    })
}

export const _doGetImage = async function(url) {
	let finalurl = url.replace(":containerId", '_replace_this_');
    var response = await fetch(appendAccessToken(finalurl), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('session_id')
        },
    })
    .then(response => {
    	if(response.status == 200){
    		return response;
    	}
    	return null;
    })

    if(response == null) return response;
    handleExpiredAuthentication(response);

    var text =  await response.text()
	var img = new Buffer(text, "binary").toString();
    let image = btoa(
            new Uint8Array(text)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
    return `data:image/png;base64,${img}`;
}

export const _doGetBlob = async function(url) {
	let finalurl = url.replace(":containerId", '_replace_this_');
    return fetch(appendAccessToken(finalurl), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('session_id')
        },
    })
    .then(response => {
    	return response.blob()
    })
}

export const  _doPut = async function(url, data, options) {
	let finalurl = url.replace(":containerId", '_replace_this_');
	if(data){
	    return fetch(appendAccessToken(finalurl), {
			timeout: options && options.timeout ?  options.timeout : 15000,
	        method: "PUT",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	        body: JSON.stringify(data),
	    });
	}
	else {
		return fetch(appendAccessToken(finalurl), {
			timeout: options && options.timeout ?  options.timeout : 15000,
	        method: "PUT",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	    });
	}
}
export const  _doDelete = async function(url, data, options) {
	let finalurl = url.replace(":containerId", '_replace_this_');
	if(data){
	    return fetch(appendAccessToken(finalurl), {
			timeout: options && options.timeout ?  options.timeout : 15000,
	        method: "DELETE",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	        body: JSON.stringify(data),
	    });
	}
	else {
		return fetch(appendAccessToken(finalurl), {
	        method: "DELETE",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	            'Authorization': localStorage.getItem('session_id')
	        },
	    });
	}
}

function handleResponseError(response) {
    throw new Error("[ERROR] on HTTP call, status = " + response.status);
}

function handleError(error) {
	console.log('ERRRR : ' + JSON.stringify(error))
    console.error("api.config.[ERROR]:" + error);
}

function appendAccessToken(url){
	var finalUrl = url;
	if(url.includes('/v1/anon/auth/login')) finalUrl = url;
	if(url.includes('/v1/anon/auth/lostPassword')) finalUrl = url;
	if(url.includes('/v1/anon/auth/resetPassword')) finalUrl = url;
	if(url.includes('?')){
		finalUrl = url + '&lang=fr';
	}
	else {
		finalUrl = url + '?lang=fr';
	}

	return finalUrl.replace(/([^:])(\/{2,})/g,"$1/");
	//abc.replace(/([^:]\/)\/+/g, "$1");
}

function handleExpiredAuthentication(response){
	if(response && response.status === 511){
		console.log(response.status)
  		if(!window.location.href.includes('#/sessionExpired')){
  			window.location.href = '#/sessionExpired';
  		}
  	}
}
