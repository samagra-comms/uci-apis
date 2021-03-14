var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Vault } = require("../helpers/vault");
const { Bot } = require("../models/bot");
const { Transformer } = require("../models/transformer");
const { ConversationLogic } = require("../models/conversationLogic");
const { UserSegment } = require("../models/userSegment");

// Refactor this to move to service
async function getAll(req, res) {
  const allCL = await Bot.query();
  res.send({ data: allCL });
}

async function getByID(req, res) {
  const conversationLogic = await Bot.query().findById(req.params.id);
  if (conversationLogic) res.send({ data: conversationLogic });
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting = (await Bot.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    res.status(400).send({
      status: `ConversationLogic does not exists with the id ${req.params.id}`,
    });
  } else {
    let adapter = await Adapter.query().findById(data.adapter)[0];
    if (!adapter)
      res.status(400).send({
        status: "Error",
        error: "Adapter with the given ID does not exist",
      });

    try {
      const trx = await Bot.startTransaction();
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
        const inserted = await Bot.query(trx).insert(data);
        await trx.commit();
        res.send({ data: inserted });
      } else {
        await trx.rollback();
        res
          .status(400)
          .send({ status: "Error", error: "Invalid transformer ID" });
      }
    } catch (e) {
      console.error(e);
      await trx.rollback();
      res.send({ data: "ConversationLogic could not be registered." });
    }
  }
}

async function deleteByID(req, res) {
  const transformer = await Bot.query().deleteById(req.params.id);
  res.send({ data: `Number of CLs deleted: ${transformer}` });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting = (await Bot.query().where(data).length) > 0;

  if (isExisting) {
    res.status(400).send({
      status: `ConversationLogic already exists with the name ${data.name}`,
    });
  } else {
    const trx = await Bot.startTransaction();
    try {
      // Loop over transformers to verify if they exist or not.
      const userSegments = data.users;
      let isValidUserSegment = true;
      for (let i = 0; i < userSegments.length; i++) {
        isValidUserSegment =
          isValidUserSegment &&
          (await UserSegment.query().findById(userSegments[i])) instanceof
            UserSegment;
      }
      const CLs = data.logic;
      let isValidCL = true;
      for (let i = 0; i < CLs.length; i++) {
        isValidCL =
          isValidCL &&
          (await ConversationLogic.query().findById(CLs[i])) instanceof
            ConversationLogic;
      }
      console.log({ isValidUserSegment, isValidCL });
      if (isValidUserSegment && isValidCL) {
        console.log({ data });
        const inserted = await Bot.query(trx).insert(data);
        await trx.commit();
        res.send({ data: inserted });
      } else {
        await trx.rollback();
        res
          .status(400)
          .send({ status: "Error", error: "Invalid transformer ID" });
      }
    } catch (e) {
      console.error(e);
      await trx.rollback();
      res.status(400).send({ data: "Bot could not be registered." });
    }
  }
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/bot/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/bot/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/bot/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/bot/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/bot/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );
};
