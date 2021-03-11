var express = require("express");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { ServiceType } = require("../models/service");
const { UserSegment } = require("../models/userSegment");

// Refactor this to move to service
async function getAll(req, res) {
  const allSegments = await UserSegment.query();
  if (allSegments) res.send({ data: allTransformers });
  else res.send({ data: [] });
}

async function getByID(req, res) {
  const transformer = await UserSegment.query().findById(req.params.id);
  if (transformer) res.send({ data: transformer });
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting =
    (await UserSegment.query().findById(req.params.id)) !== undefined;

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
    const getAgain = await UserSegment.query().findById(req.params.id);

    res.send({ data: getAgain });
  }
}

async function deleteByID(req, res) {
  const transformer = await UserSegment.query().deleteById(req.params.id);
  res.send({ data: `Number of transformers deleted: ${transformer}` });
}

async function dryRun(req, res) {
  // TODO: Dry Run
  res.send({ data: "Success" });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting =
    (await (await UserSegment.query().where("name", data.name)).length) > 0;

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

    const inserted = await UserSegment.query().insert(data);
    const getAgain = await UserSegment.query().findById(inserted.id);

    res.send({ data: getAgain });
  }
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/userSegment/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/userSegment/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/userSegment/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/userSegment/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/userSegment/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );

  app
    .route(BASE_URL + "/userSegment/dryRun/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      dryRun
    );
};
