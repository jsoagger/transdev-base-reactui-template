import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Export
 */
export const identificationsService = {
    getIdentifications,
};
async function getIdentifications(identified, containerId){
	const uri = '/transdev/multiIdentifiable/v1/secured/api/multiIdentifiable/' + identified + '/identifications/?containerId=' + containerId;
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}
