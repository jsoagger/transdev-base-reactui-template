import { _doGet, _doPostMp, API_ROOT,_doGetText, _doPut, buildURLQuery } from './utils/services.config';
/**
 * Default Export
 */
export const batchService = {
    getJobTypes,
    batchLoad,
    batchExport,
    jobCommands,
    getAllJobs,
    cancel,
    downloadMasterFile,
    downloadLogFile,
    getById
};
async function getById(id, containerId){
	const uri = "/transdev/base/v1/secured/api/batch/jobs/" + id + "?containerId=" + containerId;
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get job types for a job
 */
async function cancel(jobId, containerId){
	const uri = '/transdev/base/v1/secured/api/batch/jobs/' + jobId + '/cancel/?containerId=' + containerId
	const url = `${API_ROOT}` + uri;
    return _doPut(url);
}
async function downloadMasterFile(jobId, containerId) {
	let uri = '/transdev/base/v1/secured/api/batch/jobs/' + jobId + '/masterFile/?containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doGetText(url)
}
async function downloadLogFile(jobId, containerId) {
	let uri = '/transdev/base/v1/secured/api/batch/jobs/' + jobId + '/logFile/?containerId=' + containerId
    var url = `${API_ROOT}` + uri
	return _doGetText(url)
}
/**
 * Get all jobs
 */
async function getAllJobs(params, containerId){
	params.includeParentsItem = false;
	var p = buildURLQuery(params);
	const uri = "/transdev/base/v1/secured/api/batch/jobs?".concat(p).concat("&containerId=").concat(containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get job types for a job
 */
async function getJobTypes(job, containerId){
	const uri = "/transdev/base/v1/secured/api/batch/jobTypes?forJob=".concat(job).concat("&containerId=").concat(containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Get job commands for a job mapping
 */
async function jobCommands(forMapping, containerId){
	const uri = "/transdev/base/v1/secured/api/batch/jobCommands?forMapping=".concat(forMapping).concat("&containerId=").concat(containerId);
	const url = `${API_ROOT}` + uri;
    return _doGet(url);
}
/**
 * Launch a batch load job
 *
 * @param formData
 * @returns
 */
async function batchLoad(formData){
	let uri = '/transdev/base/v1/secured/api/batch/load'
    var url = `${API_ROOT}` + uri
	return _doPostMp(url, formData)
}
/**
 * Launch a batch export job
 *
 * @param formData
 * @returns
 */
async function batchExport(formData){
	let uri = '/transdev/base/v1/secured/api/batch/export2'
	var url = `${API_ROOT}` + uri
	formData['output.file.name'] = 'export.txt'
	return _doPostMp(url, JSON.stringify(formData))
}
