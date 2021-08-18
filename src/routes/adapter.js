var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");
const response = require("./response");
const BASE_URL = "/admin/v1";
const { Service } = require("../models/service");
const { Adapter } = require("../models/adapter");
const { Vault } = require("../helpers/vault");
const uuid = require("uuid/v1");
const messageUtils = require("../service/messageUtil");
const AdapterMessages = messageUtils.ADAPTER;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;

// Refactor this to move to service
async function getAll(req, res) {
  const rspObj = req;
  const allAdapters = await Adapter.query();
  response.sendSuccessRes(req, allAdapters, res);
  //   res.send({ data: allAdapters });
}

async function getByID(req, res) {
  const errCode =
    programMessages.EXCEPTION_CODE +
    "_" +
    AdapterMessages.UPDATE.EXCEPTION_CODE;
  const transformer = await Adapter.query().findById(req.params.id);
  if (transformer) {
    response.sendSuccessRes(req, transformer, res);
  } else {
    response.sendErrorRes(
      req,
      res,
      AdapterMessages.UPDATE.FAIL_CODE,
      errorCode,
      AdapterMessages.UPDATE.FAIL_MESSAGE,
      `Adapter not exist with ${req.params.id}`,
      errCode
    );
  }
}

async function update(req, res) {
  const data = req.body.data;
  const errCode =
    programMessages.EXCEPTION_CODE +
    "_" +
    AdapterMessages.UPLOAD.EXCEPTION_CODE;

  const isExisting =
    (await Adapter.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    response.sendErrorRes(
      req,
      res,
      AdapterMessages.UPDATE.FAIL_CODE,
      errorCode,
      AdapterMessages.UPDATE.FAIL_MESSAGE,
      `Adapter not exist with ${req.params.id}`,
      errCode
    );
  } else {
    const trx = await Adapter.startTransaction();
    try {
      await Adapter.query().patch(data).findById(req.params.id);
      await trx.commit();
      const getAgain = await Adapter.query().findById(req.params.id);
      response.sendSuccessRes(req, getAgain, res);
    } catch (e) {
      console.log(e);
      await trx.rollback();
      response.sendErrorRes(
        req,
        res,
        AdapterMessages.UPDATE.EXCEPTION_CODE,
        errorCode,
        AdapterMessages.UPDATE.FAIL_MESSAGE_1,
        e,
        errCode
      );
    }
  }
}

async function deleteByID(req, res) {
  const transformer = await Adapter.query().deleteById(req.params.id);
  let resData = `Number of adapters deleted: ${transformer}`;
  response.sendSuccessRes(req, resData, res);
}

async function dryRun(req, res) {
  // TODO: Dry Run
  response.sendSuccessRes(req, responseCode.SUCCESS, res);
}

async function insert(req, res) {
  const data = req.body.data;
  const errCode =
    programMessages.EXCEPTION_CODE +
    "_" +
    AdapterMessages.INSERT.EXCEPTION_CODE;

  const isExisting = (await (await Adapter.query().where(data)).length) > 0;
  console.log("Existing", isExisting);
  if (isExisting) {
    response.sendErrorRes(
      req,
      res,
      AdapterMessages.INSERT.ALREADY_EXIST_CODE,
      errorCode,
      AdapterMessages.INSERT.ALREADY_EXIST_MESSAGE,
      "Adapter already exists",
      errCode
    );
  } else {
    const trx = await Adapter.startTransaction();
    try {
      const inserted = await Adapter.query(trx).insert(data);
      await trx.commit();
      const getAgain = await Adapter.query().findById(inserted.id);
      response.sendSuccessRes(req, getAgain, res);
    } catch (e) {
      console.log(e);
      await trx.rollback();
      response.sendErrorRes(
        req,
        res,
        AdapterMessages.INSERT.EXCEPTION_CODE,
        errorCode,
        AdapterMessages.INSERT.CANNOT_CREATE,
        e,
        errCode
      );
    }
  }
}

async function getCredentials(req, res) {
  const id = req.params.id;
  const adapter = await Adapter.query().findById(id);
  const vault = new Vault();

  const credentials = vault.getCredentials(
    "Gupshup-Whatsapp",
    adapter.config.credentials
  );
  response.sendSuccessRes(req, credentials, res);
}

module.exports = (app) => {
  app
    .route(BASE_URL + "/adapter/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/adapter/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/adapter/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/adapter/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/adapter/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );

  app
    .route(BASE_URL + "/adapter/dryRun/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      dryRun
    );

  app
    .route(BASE_URL + "/adapter/getCredentials/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getCredentials
    );
};
