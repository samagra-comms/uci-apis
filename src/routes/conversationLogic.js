var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { ConversationLogic } = require("../models/conversationLogic");
const { Vault } = require("../helpers/vault");
const { Adapter } = require("../models/adapter");
const { Transformer } = require("../models/transformer");

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
  const isExisting =
    (await ConversationLogic.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    res.status(400).send({
      status: `ConversationLogic does not exists with the id ${req.params.id}`,
    });
  } else {
    if (data.adapter) {
      let adapter = await Adapter.query().findById(data.adapter)[0];
      if (!adapter)
        res.status(400).send({
          status: "Error",
          error: "Adapter with the given ID does not exist",
        });
      return;
    }

    const trx = await ConversationLogic.startTransaction();

    try {
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
          .patch({ transformers: JSON.stringify(data.transformers) })
          .findById(req.params.id);
        await trx.commit();
        res.send({ data: "Patched" });
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
  const transformer = await ConversationLogic.query().deleteById(req.params.id);
  res.send({ data: `Number of CLs deleted: ${transformer}` });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting = (await ConversationLogic.query().where(data).length) > 0;

  if (isExisting) {
    res.status(400).send({
      status: `ConversationLogic already exists with the name ${data.name}`,
    });
  } else {
    console.log(data.adapter);
    let adapter = await Adapter.query().findById(data.adapter);
    if (!(adapter instanceof Adapter))
      res.status(400).send({
        status: "Error",
        error: "Adapter with the given ID does not exist",
      });
    else {
      // TODO: Verify data
      const trx = await ConversationLogic.startTransaction();
      try {
        // Loop over transformers to verify if they exist or not.
        const transformers = data.transformers;
        let isValid = true;
        for (let i = 0; i < transformers.length; i++) {
          isValid =
            isValid &&
            (await Transformer.query().findById(transformers[i].id)) instanceof
              Transformer;
        }
        console.log({ isValid });
        if (isValid) {
          console.log({ data });
          const inserted = await ConversationLogic.query(trx).insert({
            transformers: JSON.stringify(data.transformers),
            adapter: data.adapter,
            name: data.name,
          });
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
        res
          .status(400)
          .send({ data: "Conversation Logic could not be registered." });
      }
    }
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
