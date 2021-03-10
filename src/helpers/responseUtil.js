const logger = require('sb_logger_util_v2');
const uuid = require("uuid/v1");
const stackTrace_MaxLimit = 500;
const _ = require('lodash');


const successResponse = (data) => {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result
  return response
}

const errorResponse = (data,errCode) => {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = errCode+'_'+data.responseCode
  response.result = data.result
  return response
}

const getParams = (msgId, status, errCode, msg) => {
  var params = {}
  params.resmsgid = uuid()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg
  return params
}

const loggerError = (data,errCode) => {
  var errObj = {}
  errObj.eid = 'Error'
  errObj.edata = {
    err : errCode,
    errtype : data.errMsg,
    requestid : data.msgId || uuid(),
    stacktrace : _.truncate(JSON.stringify(data), { 'length': stackTrace_MaxLimit})
  }
  logger.error({msg: 'Error log', errObj})
}

module.exports = {
  successResponse,
  errorResponse,
  getParams,
  loggerError
}
