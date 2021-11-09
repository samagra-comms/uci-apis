const uuid = require("uuid/v1");
const messageUtils = require("../service/messageUtil");
const responseCode = messageUtils.RESPONSE_CODE;

function successResponse(data) {
  var response = {};
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgid, "successful", null, null);
  response.responseCode = data.responseCode || "OK";
  response.result = data.result;
  return response;
}

function errorResponse(data, errCode) {
  var response = {};
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgId, "failed", data.errCode, data.errMsg);
  response.responseCode = errCode + "_" + data.responseCode;
  response.result = data.result;
  return response;
}

function getParams(msgId, status, errCode, msg) {
  var params = {};
  params.resmsgid = uuid();
  params.msgid = msgId || null;
  params.status = status;
  params.err = errCode;
  params.errmsg = msg;

  return params;
}

function sendErrorRes(
  rspObj,
  res,
  errCode,
  errorCode,
  errMsg,
  error,
  errCode1
) {
  rspObj.errCode = errCode;
  rspObj.errMsg = errMsg;
  rspObj.responseCode = responseCode.CLIENT_ERROR;
  rspObj.result = {
    error: error,
  };
  return res
    .status(400)
    .send(errorResponse(rspObj, errCode1 + errorCode.CODE1));
}

function sendSuccessRes(rspObj, resData, res) {
  rspObj.responseCode = responseCode.SUCCESS;
  rspObj.result = { data: resData };
  return res.status(200).send(successResponse(rspObj));
}

function sendHealthSuccessRes(rspObj, resData, checks, res, success) {
  rspObj.responseCode = success;
  rspObj.result = { checks: checks, healty: resData };
  return res.status(200).send(successResponse(rspObj));
}

function sendHealthErrorRes(
  rspObj,
  res,
  errCode,
  errorCode,
  errMsg,
  error,
  errCode1
) {
  rspObj.errCode = errCode;
  rspObj.errMsg = errMsg;
  rspObj.responseCode = responseCode.CLIENT_ERROR;
  rspObj.result = {
    healty: false,
  };
  return res
    .status(400)
    .send(errorResponse(rspObj, errCode1 + errorCode.CODE1));
}

exports.sendErrorRes = sendErrorRes;
exports.sendSuccessRes = sendSuccessRes;
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.sendHealthSuccessRes = sendHealthSuccessRes;
exports.sendHealthErrorRes = sendHealthErrorRes;
