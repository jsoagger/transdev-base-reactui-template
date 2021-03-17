import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Rev controlled
 */
export const revControlledService = {
    allIterationsOf,
    allVersionsOf,
    exactIterationAndVersion,
    latestIterationOf,
}
/**
 * All iterations of a revision controlled.
 *
 * @param revControlledId
 * @returns
 */
async function allIterationsOf(revControlledId, containerId) {
	const uri = '/transdev/base/v1/secured/api/rc/' + revControlledId + '/iterations/?' + 'containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}

/**
 * All versions of a revision controlled.
 *
 * @param revControlledId
 * @returns
 */
async function allVersionsOf(revControlledId, containerId) {
	const uri = '/transdev/base/v1/secured/api/rc/' + revControlledId + '/versions/?' + 'containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function exactIterationAndVersion(revControlledId, version, iteration, containerId){
	const uri = '/transdev/base/v1/secured/api/rc/' + revControlledId + '/exactVersion/' + version + '/exactIteration/'  + iteration + '/?containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
async function latestIterationOf(revControlledId, containerId){
	const uri = '/transdev/base/v1/secured/api/rc/' + revControlledId + '/latest/?' + 'containerId=' + containerId;
	const url = `${API_ROOT}` + uri;
	return _doGet(url);
}
