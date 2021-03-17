import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const installationService = {
    details,
    getHistories,
    isDatapatchInstalledInContainer
};
/**
 * Installation history of application
 * 
 * @param {*} id 
 */
async function getHistories() {
    const uri = "/transdev/base/v1/secured/api/versionHistory/";
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function details(id) {
    const uri = "/transdev/base/v1/secured/api/versionHistory/" + id;
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}

async function isDatapatchInstalledInContainer(moduleName, containerPath){
	const uri = "/transdev/base/v1/secured/api/versionHistory/isDatapatchInstalledInContainer?buildModuleName=" + moduleName + "&containerPath=" + containerPath;
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}