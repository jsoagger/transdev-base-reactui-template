import { _doGet, API_ROOT } from './utils/services.config';

export const uiSchemaService = {
    getAllSchemasByInternalName,
    getUISchemaByInternalName,
}
/**
 * Get UI and JSON schema for all platforms. 
 * The rule is one JSON schema --> 0...* UI Schemas
 * 
 * @param {*} internalName The name of the view
 */ 
function getAllSchemasByInternalName(internalName) {
    var url = `${API_ROOT}/transdev/base/v1/anon/v1/secured/api/viewDefinition/getAllSchemasByInternalName`;
    console.debug("Login Api : " + url);
}
/**
 * Get the JSON schema and platform UISchema
 * As UISchema is not mandatory, it will return jsonschema if the view has not provided jsonschema.
 * 
 * @param {*} internalName The name of the view
 * @param {*} platform The platform
 */
function getUISchemaByInternalName(internalName, platform) {
    var url = `${API_ROOT}/transdev/base/v1/anon/v1/secured/api/viewDefinition/getUISchemaByInternalName`;
    url = url.concat("/?internalName=").concat(internalName)
        .concat("&")
        .concat("platform=").concat(platform);
    
    var schemas =_doGet(url);
    console.log("REST result : " + schemas);
    return schemas;
}

