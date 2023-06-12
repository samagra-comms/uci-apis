const _ = require('lodash');
const logger = require('sb_logger_util_v2');
const messageUtils = require('./messageUtil');
const configurationMessages = messageUtils.CONFIGURATION;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCodes = messageUtils.ERRORCODES;
const programMessages = messageUtils.PROGRAM;
const model = require('../models');
const uuid = require("uuid/v1");
const { async } = require('rxjs/internal/scheduler/async');
const loggerService = require('./loggerService');

// Advanced feature: Use ES6 destructuring to extract required properties directly
const { entryLog, exitLog } = loggerService;

async function createConfiguration(req, response) {
  let data = req.body;
  const rspObj = req.rspObj;
  const errCode = `${programMessages.EXCEPTION_CODE}_${configurationMessages.CREATE.EXCEPTION_CODE}`;
  const logObject = {
    traceId: req.headers['x-request-id'] || '',
    message: configurationMessages.CREATE.INFO
  };
  entryLog(data, logObject); // Advanced feature: Use destructured function directly

  if (!data.request || !data.request.key || !data.request.value || !data.request.status) {
    rspObj.errCode = configurationMessages.CREATE.MISSING_CODE;
    rspObj.errMsg = configurationMessages.CREATE.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('Error due to missing fields in the request', rspObj, errCode + errorCodes.CODE1);
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(400).send(errorResponse(rspObj, errCode + errorCodes.CODE1));
  }
  const insertObj = data.request;

  try {
    const createdResponse = await model.configuration.create(insertObj);
    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = createdResponse;
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(200).send(successResponse(rspObj));
  } catch (error) {
    const sequelizeErrorMessage = _.first(_.get(error, 'errors'));
    rspObj.errCode = configurationMessages.CREATE.FAILED_CODE;
    rspObj.errMsg = sequelizeErrorMessage ? sequelizeErrorMessage.message : error.message || bulkJobRequestMessages.CREATE.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError('Error while creating a new bulk_job_request', rspObj, errCode + errorCodes.CODE2);
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(500).send(errorResponse(rspObj, errCode + errorCodes.CODE2));
  }
}

// Advanced feature: Use arrow function for concise syntax
const updateConfiguration = async (req, response) => {
  let data = req.body;
  const rspObj = req.rspObj;
  const errCode = `${programMessages.EXCEPTION_CODE}_${configurationMessages.UPDATE.EXCEPTION_CODE}`;
  const logObject = {
    traceId: req.headers['x-request-id'] || '',
    message: configurationMessages.UPDATE.INFO
  };
  entryLog(data, logObject); // Advanced feature: Use destructured function directly

  if (!data.request || (!data.request.id && !data.request.key)) {
    rspObj.errCode = configurationMessages.UPDATE.MISSING_CODE;
    rspObj.errMsg = configurationMessages.UPDATE.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('Error updating configuration request due to missing key field', rspObj, errCode + errorCodes.CODE1);
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(400).send(errorResponse(rspObj, errCode + errorCodes.CODE1));
  }

  const updateStatement = {
    where: {
      ...(data.request.key && { key: data.request.key }),
      ...(data.request.id && { id: data.request.id })
    },
    returning: true,
    invidualHooks: true
  };

  const updateValue = _.cloneDeep(data.request);
  updateValue.updateon = updateValue.updatedon || new Date();

  try {
    const updateResponse = await model.configuration.update(updateValue, updateStatement);

    if (_.isArray(updateResponse) && !updateResponse[0]) {
      rspObj.errCode = configurationMessages.UPDATE.PROCESS_ID_MISSING_CODE;
      rspObj.errMsg = configurationMessages.UPDATE.PROCESS_ID_FAILED_MESSAGE;
      rspObj.responseCode = responseCode.CONFIGURATION_KEY_NOT_FOUND;
      loggerError('Unable to update configuration. key not found.', rspObj, errCode + errorCodes.CODE2);
      exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
      return response.status(404).send(errorResponse(rspObj, errCode + errorCodes.CODE2));
    }

    rspObj.responseCode = responseCode.SUCCESS;
    rspObj.result = {
      'key': data.request.key
    };
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(200).send(successResponse(rspObj));
  } catch (error) {
    rspObj.errCode = configurationMessages.UPDATE.UPDATE_FAILED_CODE;
    rspObj.errMsg = error.message || configurationMessages.UPDATE.UPDATE_FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError('Unable to update configuration.', rspObj, errCode + errorCodes.CODE3);
    exitLog({ responseCode: rspObj.responseCode }, logObject); // Advanced feature: Use destructured function directly
    return response.status(500).send(errorResponse(rspObj, errCode + errorCodes.CODE3));
  }
};

// Rest of the code remains the same

module.exports = {
  createConfigurationAPI: createConfiguration,
  updateConfigurationAPI: updateConfiguration
};
