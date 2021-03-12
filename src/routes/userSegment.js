var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Service } = require("../models/service");
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
    let serviceType = await Service.query().where("name", data.type)[0];
    if (!serviceType)
      serviceType = await Service.query().insert({ name: data.type });

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
      status: `UserSegment already exists with the name ${data.name}`,
    });
  } else {
    let serviceTypeAll = Service.query().where(data.all)[0];

    let serviceTypeByPhone = await Service.query().where(data.byPhone)[0];

    let serviceTypeByID = await Service.query().where(data.byID)[0];

    try {
      const trx = await UserSegment.startTransaction();
      if (!serviceTypeAll)
        serviceTypeAll = await Service.query(trx).insert(data.all);

      if (!serviceTypeByPhone)
        serviceTypeByPhone = await Service.query(trx).insert(data.byPhone);

      if (!serviceTypeByID)
        serviceTypeByID = await Service.query(trx).insert(data.byID);

      // TODO: Refactor this to a better solution using ORM.
      data.all = serviceTypeAll.id;
      data.byID = serviceTypeByID.id;
      data.byPhone = serviceTypeByPhone.id;

      const verified = await Promise.all([
        serviceTypeAll.verify("getAllUsers"),
        serviceTypeByID.verify("getUserByID"),
        serviceTypeByPhone.verify("getUserByPhone"),
      ])
        .then((result) => {
          const reducer = (accumulator, currentValue) =>
            accumulator + (currentValue.status === "Verified" ? 1 : 0);
          console.log(result.reduce(reducer, 0));
          if (result.reduce(reducer, 0) === 3) return true;
          else return false;
        })
        .catch((e) => {
          trx.rollback();
          console.error(e);
          res.send({ data: "UserSegment could not be verified." });
        });
      if (verified) {
        try {
          const inserted = await UserSegment.query(trx).insert(data);
          trx.commit();
          const getAgain = await UserSegment.query().findById(inserted.id);
          getAgain.all = data.all;
          getAgain.byID = data.byID;
          getAgain.byPhone = data.byPhone;
          res.send({ data: getAgain });
        } catch (e) {
          console.log("Here");
        }
      } else {
        trx.rollback();
        res.send({
          data: "UserSegment could not be registered. Services down.",
        });
      }
    } catch (e) {
      trx.rollback();
      console.error(e);
      res.send({ data: "UserSegment could not be registered." });
    }
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
