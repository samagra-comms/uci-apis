const uuidV1 = require('uuid/v1')
const TelemetryUtil = require('sb_telemetry_util')
const telemetry = new TelemetryUtil()

/**
 * This function used to generate error event
 * @param {Object} data
 */
function generateErrorEvent (data, stacktrace) {
  const trace = JSON.stringify(data.stacktrace || stacktrace)
  const edata = telemetry.errorEventData(data.errCode, data.responseCode, trace)
  telemetry.error({
    edata: edata,
    context: data.telemetryData && telemetry.getContextData(data.telemetryData.context),
    actor: data.telemetryData && data.telemetryData.actor,
    tags: data.telemetryData && data.telemetryData.tags,
    object: data.telemetryData && data.telemetryData.object
  })
}

/**
 * This function used to generate api_access log event
 * @param {Object} data
 */
function generateApiAccessLogEvent (data, status) {
  const telemetryData = data.telemetryData
  const message = data.message || status
  const type = 'api_access'
  const edata = telemetry.logEventData(type, 'INFO', message, telemetryData.params)
  telemetry.log({
    edata: edata,
    context: telemetry.getContextData(telemetryData.context),
    actor: telemetryData && telemetryData.actor,
    tags: telemetryData && telemetryData.tags,
    object: telemetryData && telemetryData.object
  })
}

/**
 * this function create success response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.successResponse.response}
 */
function successResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result
  if (data.telemetryData) {
    generateApiAccessLogEvent(data, response.params.status)
  }

  return response
}

/**
 * this function create error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
function errorResponse (data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = data.responseCode
  response.result = data.result
  if (data.telemetryData) {
    generateErrorEvent(data, response)
  }
  return response
}

/**
 * this function helps to create params for error and success response function.
 * @param {String} msgId
 * @param {String} status
 * @param {String} errCode
 * @param {String} msg
 * @returns {nm$_responseUtil.getParams.params}
 */
function getParams (msgId, status, errCode, msg) {
  var params = {}
  params.resmsgid = uuidV1()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg

  return params
}

/**
 * Exports required module
 */
module.exports.successResponse = successResponse
module.exports.errorResponse = errorResponse
