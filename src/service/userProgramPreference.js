const _ = require("lodash");
const uuid = require("uuid/v1");
const logger = require('sb_logger_util_v2');
const messageUtils = require('./messageUtil');
const Sequelize = require('sequelize');
const moment = require('moment');
const responseCode = messageUtils.RESPONSE_CODE;
const programMessages = messageUtils.PROGRAM;
const errorCodes = messageUtils.ERRORCODES;
const model = require('../models');
const loggerService = require('./loggerService');
const {
  forkJoin
} = require('rxjs');
const envVariables = require('../envVariables');
const stackTrace_MaxLimit = 500;
const RedisManager = require('../helpers/redisUtil');
var async = require('async');
const redisManager = new RedisManager();

function getPreferences(req, response) {
  var data = req.body;
  var rspObj = req.rspObj;
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : programMessages.PREFERENCES.READ.INFO
   }
   loggerService.entryLog(data, logObject);
  const errCode = programMessages.EXCEPTION_CODE+'_'+programMessages.PREFERENCES.READ.EXCEPTION_CODE
  rspObj.apiId = 'api.preference.read';
  rspObj.apiVersion = '1.0'

  if (!data.request || !data.request.program_id || !data.request.user_id) {
    rspObj.errCode = programMessages.PREFERENCES.READ.MISSING_CODE
    rspObj.errMsg = programMessages.PREFERENCES.READ.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('',rspObj,errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }

  var redisKey = data.request.user_id + ':' + data.request.program_id;
  redisManager.getData(redisKey, (err, cacheData) => {
    if (err || !cacheData) {
      // If redis cache is failed to give the response
      getPreferencefromtable(data.request.user_id, data.request.program_id).then((result) => {
        if (!result.error) {
          setDatainRedis(data.request.user_id, data.request.program_id, result.res, true, req);

          rspObj.result = {
            'contributor_preference': {},
            'sourcing_preference': {},
            'synced': true
          }
          if (result.res !== null) {
            rspObj.result.contributor_preference = result.res.contributor_preference,
            rspObj.result.sourcing_preference = result.res.sourcing_preference
          }
          rspObj.responseCode = 'OK';
          loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
          return response.status(200).send(successResponse(rspObj));
        } else {
          rspObj.responseCode = 'ERR_GET_USER_PREFERENCE_FAILED';
          rspObj.result = result.result;
          loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
          loggerError(rspObj.responseCode,rspObj,errCode+errorCodes.CODE2);
          return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE2));
        }
      });
    } else {
      // sync back cache data to user_preferences table
      syncCacheToPreferenceTable(data.request.user_id, data.request.program_id, cacheData);
      rspObj.responseCode = 'OK'
      rspObj.result = JSON.parse(cacheData);
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(200).send(successResponse(rspObj))
    }
  });
}

function getPreferencefromtable(userId, programId) {
  return new Promise((resolve, reject) => {
    const retObj = { error: false, res: {} };
    model.user_program_preference.findOne({
      where: {
        user_id: userId,
        program_id: programId,
      }
    }).then(function (res) {
      retObj.res = res;
      return resolve(retObj);
    }).catch(function (err) {
        retObj.error = true;
        retObj.res = err;
        return reject(retObj);
    });
  });
}

function addPreferencetotable(userId, programId, preferenceObj) {
  return new Promise((resolve, reject) => {
    const retObj = { error: false, res: {} };
    // add preference
    const insertObj = {
      user_id: userId,
      program_id: programId,
      contributor_preference: preferenceObj.contributor_preference,
      sourcing_preference: preferenceObj.sourcing_preference,
      createdby: userId,
      createdon: new Date(),
    }

    model.user_program_preference.create(insertObj).then(res => {
      retObj.res = res.dataValues;
      return resolve(retObj);
    }).catch(function (err) {
      retObj.error = true;
      retObj.res = err;
      return reject(retObj);
    });
  });
}

function updatePreferencetotable(userId, programId, preferenceObj) {
  return new Promise((resolve, reject) => {
    const retObj = { error: false, res: {} };
    const updateQuery = {
      where: {
        user_id: userId,
        program_id: programId
      }
    };
    const updateValue = {
      contributor_preference: preferenceObj.contributor_preference,
      sourcing_preference: preferenceObj.sourcing_preference,
      updatedBy: userId,
      updatedOn: new Date(),
    }

    model.user_program_preference.update(updateValue, updateQuery).then(resData => {
      if (_.isArray(resData) && !resData[0]) {
        retObj.error = true;
        retObj.res = "Record not found";
        return resolve(retObj);
      }
      else {
        retObj.res = updateValue;
        return resolve(retObj);
      }
    }).catch(function (err) {
      retObj.error = true;
      retObj.res = err;
      return reject(retObj);
    });
  });
}

function setDatainRedis(userId, programId, obj, syncFlag, req = {}) {
  const redisValue = {
    'contributor_preference': {},
    'sourcing_preference': {},
    'synced': syncFlag
  }

  // So if the data is being written in redis only, the sync flag will be false and hence to keep the timestamp when data was first updated, the timestamp should be updated when synced
  redisValue.timestamp = (!syncFlag && obj.timestamp !== undefined) ? obj.timestamp : new Date();
  redisValue.contributor_preference = (!_.isEmpty(obj) && obj.contributor_preference !== undefined) ? obj.contributor_preference : {};
  redisValue.sourcing_preference = (!_.isEmpty(obj) && obj.sourcing_preference !== undefined) ? obj.sourcing_preference : {};

  redisManager.setData({ key: `${userId}:${programId}`, value: JSON.stringify(redisValue) },
    function (err, cacheCSVData) {
      if (err) {
        logger.error({ msg: 'Error - caching', err, additionalInfo: { preference: obj } }, req);
      } else {
        // Whenever writing to redis, if the syncFlag is false, i.e. data is not synched yet, sync it to database
        if (syncFlag == false) {
          syncCacheToPreferenceTable(userId, programId, redisValue);
        }
        logger.debug({ msg: 'Caching preferences - done', additionalInfo: { preference: obj } }, req);
      }
    });
}

function syncCacheToPreferenceTable(userId, programId, cacheObj) {
  // check if the cacheObj.timestamp and current time has 4 Hours of difference
  if (cacheObj.timestamp && diffinHours(cacheObj.timestamp) > 4 && !cacheObj.synced) {
    // sync the cache data back to userpreference table
    // find if the entry for the user_id and program_id exists
    getPreferencefromtable(userId, programId).then((result) => {
      if (result.error) {
        logger.error({
          msg: 'syncing caching preferences - failed - error while checking if record exists',
          additionalInfo: {
            key: `${userId} : ${programId}`,
            preference: cacheObj
          }
        }, {});
      }

      if (!result.res) {
        addPreferencetotable(userId, programId, cacheObj).then((addRes) => {
          if (addRes.error) {
            logger.error({
              msg: 'syncing caching preferences - failed',
              additionalInfo: {
                key: `${userId} : ${programId}`,
                preference: cacheObj
              }
            }, {});
          }
          else {
            const tableRes = addRes.res;
            setDatainRedis(userId, programId, tableRes, true);
            logger.info({
              msg: 'syncing caching preferences - done',
              additionalInfo: {
                key: `${userId} : ${programId}`,
                preference: cacheObj
              }
            }, {});
          }
        });
      } else if (result.res.id) {
        updatePreferencetotable(userId, programId, cacheObj).then((updateRes) => {
          if (updateRes.error) {
            logger.error({
              msg: 'syncing caching preferences - failed',
              additionalInfo: {
                key: `${userId} : ${programId}`,
                preference: cacheObj
              }
            }, {});
          }
          else {
            setDatainRedis(userId, programId, cacheObj, true);
            logger.info({
              msg: 'syncing caching preferences - done',
              additionalInfo: {
                key: `${userId} : ${programId}`,
                preference: cacheObj
              }
            }, {});
          }
        });
      }
    });
  }
}

function setPreferences(req, response) {
  var data = req.body
  var rspObj = req.rspObj
  
  rspObj.apiId = 'api.preference.create';
  rspObj.apiVersion = '1.0';
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : programMessages.PREFERENCES.CREATE.INFO
   }
   loggerService.entryLog(data, logObject);
  if (!data.request || !data.request.program_id || !data.request.user_id || !data.request.preference) {
    const errCode = programMessages.EXCEPTION_CODE+'_'+programMessages.PREFERENCES.SET.EXCEPTION_CODE
    rspObj.errCode = programMessages.PREFERENCES.SET.MISSING_CODE
    rspObj.errMsg = programMessages.PREFERENCES.SET.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('',rspObj,errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }
  // Todo- check if the preferences is json of MSG
  const userId = data.request.user_id;
  const programId = data.request.program_id;
  const preference = data.request.preference;

  data.request.sourcing_preference = {};
  data.request.contributor_preference = {};
  if (data.request.type && data.request.type === 'sourcing') {
    data.request.sourcing_preference = preference;
  } else {
    data.request.contributor_preference = preference;
  }

  rspObj.result = _.cloneDeep(data.request);
  delete(rspObj.result['preference']);

  var redisKey = userId + ':' + programId;
  redisManager.getData(redisKey, (err, cacheData) => {
    if (err || !cacheData) {
      // If redis cache is failed to give the response
      getPreferencefromtable(userId, programId).then((result) => {
        if (result.error) {
          const errCode = programMessages.EXCEPTION_CODE+'_'+programMessages.PREFERENCES.READ.EXCEPTION_CODE
          rspObj.responseCode = 'ERR_GET_USER_PREFERENCE_FAILED';
          rspObj.result = result.result;
          loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
          loggerError(rspObj.responseCode,rspObj,errCode+errorCodes.CODE2);
          return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE2));
        }

        if (!result.res) {
          addPreferencetotable(userId, programId, data.request).then((addRes) => {
            if (addRes.error) {
              const errCode = programMessages.EXCEPTION_CODE+'_'+programMessages.PREFERENCES.CREATE.EXCEPTION_CODE
              rspObj.errMsg = programMessages.PREFERENCES.CREATE.FAILED_MESSAGE
              rspObj.responseCode = programMessages.PREFERENCES.CREATE.FAILED_CODE;
              rspObj.result = addRes.res;
              loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
              loggerError('',rspObj,errCode+errorCodes.CODE3);
              return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE3));
            }
            else {
              const tableRes = addRes.res;
              setDatainRedis(userId, programId, tableRes, true);
              rspObj.responseCode = 'OK';
              loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
              return response.status(200).send(successResponse(rspObj));
            }
          });
        } else if (result.res.id) {
          updatePreferencetotable(userId, programId, data.request).then((updateRes) => {
            if (updateRes.error) {
              const errorCode = programMessages.EXCEPTION_CODE+'_'+programMessages.PREFERENCES.UPDATE.EXCEPTION_CODE
              rspObj.errMsg = programMessages.PREFERENCES.UPDATE.FAILED_MESSAGE
              rspObj.responseCode = programMessages.PREFERENCES.UPDATE.FAILED_CODE;
              rspObj.result = updateRes.res;
              loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
              loggerError('',rspObj,errorCode+errorCodes.CODE1);
              return response.status(400).send(errorResponse(rspObj,errorCode+errorCodes.CODE1));
            }
            else {
              const tableRes = updateRes.res;
              setDatainRedis(userId, programId, tableRes, true);
              rspObj.responseCode = 'OK';
              loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
              return response.status(200).send(successResponse(rspObj));
            }
          });
        }
      });
    } else {
      data.request.timestamp = JSON.parse(cacheData).timestamp;
      setDatainRedis(data.request.user_id, data.request.program_id, data.request, false);
      rspObj.responseCode = 'OK';
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(200).send(successResponse(rspObj));
    }
  });
}

function diffinHours(checkDateTime) {
  var cacheTime = moment(checkDateTime, 'YYYY-MM-DD HH:mm:ss');
  var now = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
  var duration = moment.duration(now.diff(cacheTime));
  return duration.asHours();
}

function loggerError(errmsg,data,errCode) {
  var errObj = {}
  errObj.eid = 'Error'
  errObj.edata = {
    err : errCode,
    errtype : errmsg || data.errMsg,
    requestid : data.msgId || uuid(),
    stacktrace : _.truncate(JSON.stringify(data), { 'length': stackTrace_MaxLimit})
  }
  logger.error({msg: 'Error log', errObj})
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

/**
 * function create error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
function errorResponse(data,errCode) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = errCode +'_'+ data.responseCode
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

module.exports.setUserPreferences = setPreferences;
module.exports.getUserPreferences = getPreferences;

