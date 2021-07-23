var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { ConversationLogic } = require("../models/conversationLogic");
const { Vault } = require("../helpers/vault");
const messageUtils = require("../service/messageUtil");
const { Adapter } = require("../models/adapter");
const { Transformer } = require("../models/transformer");
const CLMessages = messageUtils.CONVERSATION_LOGIC;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;
const uuid = require("uuid/v1");

// Refactor this to move to service
async function getAll(req, res) {
  const allCL = await ConversationLogic.query();
  res.send({ data: allCL });
}

async function getByID(req, res) {
  const conversationLogic = await ConversationLogic.query().findById(
    req.params.id
  );
  if (conversationLogic) res.send({ data: conversationLogic });
}

async function update(req, res) {
  const data = req.body.data;
  const rspObj = req.rspObj;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + CLMessages.UPDATE.EXCEPTION_CODE;

  try {
    const isExisting =
      (await ConversationLogic.query().findById(req.params.id)) !== undefined;

    if (!isExisting) {
      rspObj.errCode = CLMessages.UPDATE.MISSING_CODE_CL;
      rspObj.errMsg = CLMessages.UPDATE.MISSING_CL_MESSAGE;
      rspObj.responseCode = responseCode.CLIENT_ERROR;
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
    } else {
      if (data.adapter) {
        let adapter = await Adapter.query().findById(data.adapter);
        if (!adapter) {
          rspObj.errCode = CLMessages.UPDATE.MISSING_CODE_ADAPTER;
          rspObj.errMsg = CLMessages.UPDATE.MISSING_ADAPTER_MESSAGE;
          rspObj.responseCode = responseCode.CLIENT_ERROR;
          return res
            .status(400)
            .send(errorResponse(rspObj, errCode + errorCode.CODE1));
        }
      }

      const trx = await ConversationLogic.startTransaction();
      // Loop over transformers to verify if they exist or not.
      const transformers = data.transformers;
      let isValid = true;
      for (let i = 0; i < transformers.length; i++) {
        isValid =
          isValid &&
          (await Transformer.query().findById(transformers[i].id)) instanceof
            Transformer;
      }
      if (isValid) {
        const inserted = await ConversationLogic.query(trx)
          .patch({ name: data.name, adapter: data.adapter })
          .findById(req.params.id);
        const d = await trx.commit();
        rspObj.responseCode = responseCode.SUCCESS;
        rspObj.result = inserted;
        loggerService.exitLog({ responseCode: rspObj.responseCode }, logObject);
        return res.status(200).send(successResponse(rspObj));
      } else {
        await trx.rollback();
        rspObj.errCode = CLMessages.UPDATE.MISSING_CODE_TRANSFORMER;
        rspObj.errMsg = CLMessages.UPDATE.MISSING_TRANSFORMER_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return res
          .status(400)
          .send(errorResponse(rspObj, errCode + errorCode.CODE1));
      }
    }
  } catch (e) {
    console.error(e);
    await trx.rollback();
    rspObj.errCode = CLMessages.UPDATE.UPDATE_FAILED_CODE;
    rspObj.errMsg = CLMessages.UPDATE.UPDATE_FAILED_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
  }
}

async function deleteByID(req, res) {
  const rspObj = req.rspObj;
  return ConversationLogic.query()
    .deleteById(req.params.id)
    .then((results) => {
      if (result) {
        res.send({ data: `Number of CLs deleted: ${transformer}` });
      } else {
        const errCode =
          programMessages.EXCEPTION_CODE +
          "_" +
          CLMessages.DELETE.EXCEPTION_CODE;
        return res
          .status(400)
          .send(errorResponse(rspObj, errCode + errorCode.CODE1));
      }
    })
    .catch((e) => {
      const errCode =
        programMessages.EXCEPTION_CODE + "_" + CLMessages.DELETE.EXCEPTION_CODE;
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
    });
}

async function insert(req, res) {
  const data = req.body.data;
  const rspObj = req.rspObj;
  const isExisting = (await ConversationLogic.query().where(data).length) > 0;

  const errCode =
    programMessages.EXCEPTION_CODE + "_" + CLMessages.CREATE.EXCEPTION_CODE;
  const trx = await ConversationLogic.startTransaction();
  try {
    if (isExisting) {
      rspObj.errCode = CLMessages.CREATE.ALREADY_EXIST_CODE;
      rspObj.errMsg = CLMessages.CREATE.ALREADY_EXIST_MESSAGE;
      rspObj.responseCode = responseCode.CLIENT_ERROR;
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
    } else {
      let adapter = await Adapter.query().findById(data.adapter);
      if (!(adapter instanceof Adapter)) {
        rspObj.errCode = CLMessages.CREATE.MISSING_CODE_ADAPTER;
        rspObj.errMsg = CLMessages.CREATE.MISSING_ADAPTER_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return res
          .status(400)
          .send(errorResponse(rspObj, errCode + errorCode.CODE1));
      } else {
        // TODO: Verify data
        // Loop over transformers to verify if they exist or not.
        const transformers = data.transformers;
        let isValid = true;
        for (let i = 0; i < transformers.length; i++) {
          isValid =
            isValid &&
            (await Transformer.query().findById(transformers[i].id)) instanceof
              Transformer;
        }
        if (isValid) {
          const inserted = await ConversationLogic.query(trx).insert({
            transformers: JSON.stringify(data.transformers),
            adapter: data.adapter,
            name: data.name,
          });
          await trx.commit();
          rspObj.responseCode = responseCode.SUCCESS;
          rspObj.result = {
            inserted,
          };
          return res.status(200).send(successResponse(rspObj));
        } else {
          await trx.rollback();
          rspObj.errCode = CLMessages.CREATE.MISSING_CODE_TRANSFORMER;
          rspObj.errMsg = CLMessages.CREATE.MISSING_TRANSFORMER_MESSAGE;
          rspObj.responseCode = responseCode.CLIENT_ERROR;
          return res
            .status(400)
            .send(errorResponse(rspObj, errCode + errorCode.CODE1));
        }
      }
    }
  } catch (e) {
    console.error(e);
    await trx.rollback();
    rspObj.errCode = CLMessages.CREATE.CREATE_FAILED_CODE;
    rspObj.errMsg = CLMessages.CREATE.CREATE_FAILED_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
  }
}

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

module.exports = function (app) {
  app
    .route(BASE_URL + "/conversationLogic/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/conversationLogic/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/conversationLogic/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/conversationLogic/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/conversationLogic/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );
};
