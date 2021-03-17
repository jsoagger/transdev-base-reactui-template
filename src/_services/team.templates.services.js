import { _doGet, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const teamTemplateService = {
    getById,
};
/**
 * Get a team template by its identifier.
 *
 * @param {*} id
 */
async function getById(id, containerId) {
    const uri = "/transdev/base/v1/secured/api/teamTemplate/".concat(id).concat("?containerId=" + containerId);
    const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
