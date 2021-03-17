import { _doGet,_doGetImage, _doDelete, API_ROOT, _doPost } from './utils/services.config';
/**
 * Default Export
 */
export const thumbedService = {    
	getBase64Thumb,
    setBase64Thumb,
    deleteThumb
}
function deleteThumb(thumbedId){
	const uri = '/transdev/thumbed/v1/secured/api/thumbed/' + thumbedId;
	const url = `${API_ROOT}` + uri;
    return _doDelete(url)
}
function getBase64Thumb(thumbedId, width, height){
	var widthParam = width ? width : -1;
	var heightParam = height ? height : -1;
	const uri = '/transdev/thumbed/v1/secured/api/thumbed/' + thumbedId + '/thumb?width=' + widthParam + '&height=' + heightParam ;
	const url = `${API_ROOT}` + uri;
    return _doGetImage(url)
}
function setBase64Thumb(thumbedId, formData){
	const uri = '/transdev/thumbed/v1/secured/api/thumbed/' + thumbedId + '/thumb';
	const url = `${API_ROOT}` + uri;
    return _doPost(url, JSON.stringify(formData))
}
