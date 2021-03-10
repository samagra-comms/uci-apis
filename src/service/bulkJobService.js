const _ = require('lodash');
const Sequelize = require('sequelize');
const envVariables = require('../envVariables');
const logger = require('sb_logger_util_v2');
const messageUtils = require('./messageUtil');
const bulkJobRequestMessages = messageUtils.BULK_JOB_REQUEST;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;
const model = require('../models');
const uuid = require("uuid/v1");
const loggerService = require('./loggerService');

const searchResult_Max = 1000;
const searchResult_Min = 300;
const stackTrace_MaxLimit = 500;

async function createJob(req, response) {
  let data = req.body
  const rspObj = req.rspObj
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : bulkJobRequestMessages.CREATE.INFO
}
loggerService.entryLog(data, logObject);
  const errCode = programMessages.EXCEPTION_CODE+'_'+bulkJobRequestMessages.CREATE.EXCEPTION_CODE
  if(!data.request || !data.request.process_id || !data.request.program_id || !data.request.type || !data.request.createdby) {
    rspObj.errCode = bulkJobRequestMessages.CREATE.MISSING_CODE;
    rspObj.errMsg = bulkJobRequestMessages.CREATE.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCode.CODE1));
  }
  const insertObj = data.request;
  try {
    const createdResponse = await model.bulk_job_request.create(insertObj)
    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = createdResponse;
   loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(200).send(successResponse(rspObj))
  }
  catch(error) {
    const sequelizeErrorMessage = _.first(_.get(error, 'errors'));
    rspObj.errCode = bulkJobRequestMessages.CREATE.FAILED_CODE;
    rspObj.errMsg = sequelizeErrorMessage ? sequelizeErrorMessage.message : error.message || bulkJobRequestMessages.CREATE.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE2);
   loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCode.CODE2));
  }
}

async function readJob(req, response) {
  const rspObj = req.rspObj;
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : bulkJobRequestMessages.READ.INFO
  }
  loggerService.entryLog(req.params, logObject);
  const errCode = programMessages.EXCEPTION_CODE+'_'+bulkJobRequestMessages.READ.EXCEPTION_CODE
  try {
    const readResponse = await model.bulk_job_request.findOne({ where: { process_id: req.params.process_id }})
    if(!readResponse) {
      rspObj.errCode = responseCode.PROCESS_NOT_FOUND;
      rspObj.errMsg = `process_id ${req.params.process_id} does not exist`;
      rspObj.responseCode = responseCode.PROCESS_NOT_FOUND;
      loggerError(rspObj,errCode+errorCode.CODE1);
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(404).send(errorResponse(rspObj,errCode+errorCode.CODE1))
    }
    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = readResponse;
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(200).send(successResponse(rspObj));
  } catch(error) {
    rspObj.errCode =  bulkJobRequestMessages.READ.FAILED_CODE;
    rspObj.errMsg =  error.message || bulkJobRequestMessages.READ.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE2);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCode.CODE2));
  }
}

async function updateJob(req, response) {
  let data = req.body
  const rspObj = req.rspObj
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : bulkJobRequestMessages.UPDATE.INFO
  }
  loggerService.entryLog(data, logObject);
  const errCode = programMessages.EXCEPTION_CODE+'_'+bulkJobRequestMessages.UPDATE.EXCEPTION_CODE
  if(!data.request || !data.request.process_id) {
    rspObj.errCode = bulkJobRequestMessages.UPDATE.MISSING_CODE;
    rspObj.errMsg = bulkJobRequestMessages.UPDATE.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCode.CODE1));
  }

  const updateStatement = {
    where: {
      process_id: data.request.process_id
    },
    returning: true,
    individualHooks: true
  }
  const updateValue = _.cloneDeep(data.request);
  updateValue.updatedon = updateValue.updatedon || new Date();
  try {
    const updateResponse = await model.bulk_job_request.update(updateValue, updateStatement)
    if (_.isArray(updateResponse) && !updateResponse[0]) {
      rspObj.errCode = bulkJobRequestMessages.UPDATE.PROCESS_ID_MISSING_CODE;
      rspObj.errMsg = bulkJobRequestMessages.UPDATE.PROCESS_ID_FAILED_MESSAGE;
      rspObj.responseCode = responseCode.PROCESS_NOT_FOUND;
      loggerError(rspObj,errCode+errorCode.CODE2);
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(404).send(errorResponse(rspObj,errCode+errorCode.CODE2))
    }
    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = {
      'process_id': data.request.process_id
    }
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(200).send(successResponse(rspObj))
  } catch(error) {
    rspObj.errCode = bulkJobRequestMessages.UPDATE.UPDATE_FAILED_CODE;
    rspObj.errMsg = error.message || bulkJobRequestMessages.UPDATE.UPDATE_FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE3);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCode.CODE3));
  }
}

async function searchJob(req, response) {
  const data = req.body;
  const rspObj = req.rspObj;
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : bulkJobRequestMessages.SEARCH.INFO
  }
  loggerService.entryLog(data, logObject);
  const errCode = programMessages.EXCEPTION_CODE+'_'+bulkJobRequestMessages.SEARCH.EXCEPTION_CODE
  let searchOffset = data.request.offset || 0;
  var searchLimit = searchResult_Min;
  if(data.request.limit) {
    searchLimit = (data.request.limit < searchResult_Max) ? data.request.limit : searchResult_Max;
  }
  if(!data.request || !data.request.filters) {
    rspObj.errCode = bulkJobRequestMessages.SEARCH.MISSING_CODE;
    rspObj.errMsg = bulkJobRequestMessages.SEARCH.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR
    loggerError(rspObj,errCode+errorCode.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCode.CODE1));
  }
  try {
    const searchResponse = await model.bulk_job_request.findAll({
      where: {
        ...data.request.filters
      },
      ...(data.request.fields && {
        attributes: data.request.fields
      }),
      offset: searchOffset,
      limit: searchLimit,
      order: [
        ['createdon', 'DESC']
      ]
    })
    const searchResponseDataValues = _.map(searchResponse, 'dataValues');
    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = {
      count: searchResponseDataValues.length || 0,
      process: searchResponseDataValues
    };
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(200).send(successResponse(rspObj));
  } catch (error) {
    rspObj.errCode = bulkJobRequestMessages.SEARCH.FAILED_CODE;
    rspObj.errMsg = error.message || bulkJobRequestMessages.SEARCH.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE2);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCode.CODE2));
  }
}


function successResponse(data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result
  return response
}

function errorResponse(data,errCode) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = errCode+'_'+data.responseCode
  response.result = data.result
  return response
}

function getParams(msgId, status, errCode, msg) {
  var params = {}
  params.resmsgid = uuid()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg

  return params
}

function loggerError(data,errCode) {
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


module.exports.createJob = createJob;
module.exports.updateJob = updateJob;
module.exports.readJob = readJob;
module.exports.searchJob = searchJob;
