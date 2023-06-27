import { v4 as uuidv4 } from 'uuid';

/**
 * Helps to create params for error and success response function.
 * @param {String} msgId
 * @param {String} status
 * @param {String} errCode
 * @param {String} msg
 * @returns {nm$_responseUtil.getParams.params}
 */
function getParams(msgId, status, errCode, msg) {
  let params;
  params.resmsgid = uuidv4();
  params.msgid = msgId || null;
  params.status = status;
  params.err = errCode;
  params.errmsg = msg;

  return params;
}

/**
 * Creates success response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.successResponse.response}
 */
export function successResponse(data) {
  let response;
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgid, 'successful', null, null);
  response.responseCode = data.responseCode || 'OK';
  response.result = data.result;

  return response;
}

/**
 * Creates error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
export function errorResponse(data) {
  let response;
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg);
  response.responseCode = data.responseCode;
  response.result = data.result;
  return response;
}

/**
 * this function helps to create apiId for error and success response
 * @param {String} path
 * @returns {getAppIDForRESP.appId|String}
 */
export function getAppIdForResponse(path) {
  const arr = path
    .split(':')[0]
    .split('/')
    .filter(function (n) {
      return n !== '';
    });
  let appId;
  if (arr.length === 1) {
    appId = 'api.' + arr[arr.length - 1];
  } else {
    appId = 'api.' + arr[arr.length - 2] + '.' + arr[arr.length - 1];
  }
  return appId;
}
