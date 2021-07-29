var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { ConversationLogic } = require("../models/conversationLogic");
const { Vault } = require("../helpers/vault");
const messageUtils = require("../service/messageUtil");
const { Adapter } = require("../models/adapter");
const { Transformer } = require("../models/transformer");
const response = require("./response");
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
      response.sendErrorRes(req,res,
        CLMessages.UPDATE.MISSING_CODE_CL,
        errorCode,
        CLMessages.UPDATE.MISSING_CL_MESSAGE,
        CLMessages.UPDATE.MISSING_CL_MESSAGE,
        errCode)
    } else {
      if (data.adapter) {
        let adapter = await Adapter.query().findById(data.adapter);
        if (!adapter) {
          response.sendErrorRes(req,res,
            CLMessages.UPDATE.MISSING_CODE_ADAPTER,
            errorCode,
            CLMessages.UPDATE.MISSING_ADAPTER_MESSAGE,
            CLMessages.UPDATE.MISSING_ADAPTER_MESSAGE,
            errCode)
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
        loggerService.exitLog({ responseCode: rspObj.responseCode }, logObject);
        response.sendSuccessRes(req,inserted,res);
      } else {
        await trx.rollback();
        response.sendErrorRes(req,res,
          CLMessages.UPDATE.MISSING_CODE_TRANSFORMER,
          errorCode,
          CLMessages.UPDATE.MISSING_TRANSFORMER_MESSAGE,
          CLMessages.UPDATE.MISSING_TRANSFORMER_MESSAGE,
          errCode)
      }
    }
  } catch (e) {
    console.error(e);
    await trx.rollback();
    response.sendErrorRes(req,res,
      CLMessages.UPDATE.UPDATE_FAILED_CODE,
      errorCode,
      CLMessages.UPDATE.UPDATE_FAILED_MESSAGE,
      CLMessages.UPDATE.UPDATE_FAILED_MESSAGE,
      errCode)
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
          response.sendErrorRes(req,res,
            null,
            errorCode,
            null,
            null,
            errCode)
      }
    })
    .catch((e) => {
      const errCode =
        programMessages.EXCEPTION_CODE + "_" + CLMessages.DELETE.EXCEPTION_CODE;
        response.sendErrorRes(req,res,
          null,
          errorCode,
          null,
          null,
          errCode)
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
      response.sendErrorRes(req,res,
        CLMessages.CREATE.ALREADY_EXIST_CODE,
        errorCode,
        CLMessages.CREATE.ALREADY_EXIST_MESSAGE,
        CLMessages.CREATE.ALREADY_EXIST_MESSAGE,
        errCode)
    } else {
      let adapter = await Adapter.query().findById(data.adapter);
      if (!(adapter instanceof Adapter)) {
        response.sendErrorRes(req,res,
          CLMessages.CREATE.MISSING_CODE_ADAPTER,
          errorCode,
          CLMessages.CREATE.MISSING_ADAPTER_MESSAGE,
          CLMessages.CREATE.MISSING_ADAPTER_MESSAGE,
          errCode)
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
          response.sendSuccessRes(req,inserted,res);
        } else {
          await trx.rollback();
          response.sendErrorRes(req,res,
            CLMessages.CREATE.MISSING_CODE_TRANSFORMER,
            errorCode,
            CLMessages.CREATE.MISSING_TRANSFORMER_MESSAGE,
            CLMessages.CREATE.MISSING_TRANSFORMER_MESSAGE,
            errCode)
        }
      }
    }
  } catch (e) {
    console.error(e);
    await trx.rollback();
    response.sendErrorRes(req,res,
      CLMessages.CREATE.CREATE_FAILED_CODE,
      errorCode,
      CLMessages.CREATE.CREATE_FAILED_MESSAGE,
      CLMessages.CREATE.CREATE_FAILED_MESSAGE,
      errCode)
  }
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
