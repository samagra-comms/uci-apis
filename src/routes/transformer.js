var express = require("express");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Transformer } = require("../models/transformer");
const { ServiceType } = require("../models/serviceType");

// Refactor this to move to service
async function getAll(req, res) {
  const allTransformers = await Transformer.query();
  res.send({ data: allTransformers });
}

async function getByID(req, res) {
  const transformer = await Transformer.query().findById(req.params.id);
  res.send({ data: transformer });
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting =
    (await Transformer.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    res.status(400).send({
      status: `Transformer does not exists with the id ${req.params.id}`,
    });
  } else {
    let serviceType = await ServiceType.query().where("name", data.type)[0];
    if (!serviceType)
      serviceType = await ServiceType.query().insert({ name: data.type });

    data.type = serviceType.id;
    // TODO: Verify data

    await Transformer.query().patch(data);
    const getAgain = await Transformer.query().findById(req.params.id);

    res.send({ data: getAgain });
  }
}

async function deleteByID(req, res) {
  const transformer = await Transformer.query().deleteById(req.params.id);
  res.send({ data: `Number of transformers deleted: ${transformer}` });
}

async function dryRun(req, res) {
  // TODO: Dry Run
  res.send({ data: "Success" });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting =
    (await (await Transformer.query().where("name", data.name)).length) > 0;

  if (isExisting) {
    res.status(400).send({
      status: `Transformer already exists with the name ${data.name}`,
    });
  } else {
    let serviceType = await ServiceType.query().where("name", data.type)[0];
    if (!serviceType)
      serviceType = await ServiceType.query().insert({ name: data.type });

    data.type = serviceType.id;
    // TODO: Verify data

    const inserted = await Transformer.query().insert(data);
    const getAgain = await Transformer.query().findById(inserted.id);

    res.send({ data: getAgain });
  }
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/transformer/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/transformer/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/transformer/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/transformer/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/transformer/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );

  app
    .route(BASE_URL + "/transformer/dryRun/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      dryRun
    );
};
