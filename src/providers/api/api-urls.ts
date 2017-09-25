// const baseUrl = 'https://mroqas.shanghai-electric.com/eam-web/EamApi';
// const baseUrl = 'http://10.54.134.64:8080/EamApi';
const baseUrl = 'http://10.158.138.11:8080/EamApi';
export const Api_login = baseUrl + "/common/user/login.api";
export const Api_getUserProject = baseUrl + "/api/user/getUserProject.api"
export const Api_getUpgradeVersionInfo = baseUrl + "/common/getUpgradeVersionInfo.api";
export const Api_logout = baseUrl + "/api/user/logout.api";
export const Api_getProfileInfo = baseUrl + "/api/user/getProfileInfo.api";
export const Api_getWarehouse = baseUrl + "/api/common/getRepertory.api";
export const Api_getDictionaryDetail = baseUrl + "/api/common/getDictionaryDetail.api";
export const Api_getSystemTime = baseUrl + "/api/common/getSystemTime.api";
export const Api_getMaterial = baseUrl + "/api/common/getMaterial.api";
export const Api_get_common_manual_url = baseUrl + '/api/getManualInfoList.api';
export const Api_uploadWorkOrder = baseUrl + "/api/maintain/uploadOrder.api";//上传工单接口
export const Api_updateUploadFiles = baseUrl + '/api/updateUploadFiles.api';//上传附件接口
export const Api_getBatchWorkorderList = baseUrl + "/api/maintain/getBatchWorkorderList.api"; //据时间段批量获取列表数据
export const Api_getWorkorderFullInfoList = baseUrl + "/api/maintain/getWorkorderFullInfoList.api"; //以工单号获取工单所有数据
export const Api_getMachineList = baseUrl + "/api/device/getMachineList.api";//获取风机id数组
export const Api_getEquipmentsTreeAndDetails = baseUrl + "/api/device/getEquipmentsTreeAndDetails.api"//获取风机详情信息