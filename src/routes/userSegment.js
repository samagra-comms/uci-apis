var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Service } = require("../models/service");
const { UserSegment } = require("../models/userSegment");

// Refactor this to move to service
async function getAll(req, res) {
  const allSegments = await UserSegment.query().withGraphFetched(
    "[allService, byIDService, byPhoneService]"
  );
  const modifiedData = allSegments.map((s) => {
    s.all = s.allService;
    s.byID = s.byIDService;
    s.byPhone = s.byPhoneService;
    delete s.allService;
    delete s.byIDService;
    delete s.byPhoneService;
    return s;
  });
  if (allSegments) res.send({ data: modifiedData });
  else res.send({ data: [] });
}

async function get(req, res) {
  const batchSize = req.query.perPage;
  const page = req.query.page - 1;
  const allSegments = await UserSegment.query()
    .page(page, batchSize)
    .withGraphFetched("[allService, byIDService, byPhoneService]");
  console.log({ allSegments });
  const modifiedData = allSegments.results.map((s) => {
    s.all = s.allService;
    s.byID = s.byIDService;
    s.byPhone = s.byPhoneService;
    delete s.allService;
    delete s.byIDService;
    delete s.byPhoneService;
    return s;
  });
  if (allSegments) res.send({ data: modifiedData, total: allSegments.total });
  else res.send({ data: [], total: 0 });
}

async function getByID(req, res) {
  const transformer = await UserSegment.query().findById(req.params.id);
  if (transformer) res.send({ data: transformer });
}

async function search(req, res) {
  if (req.param.name !== undefined) {
    const segments = await UserSegment.query()
      .where("name", "ILIKE", `%${req.query.name}%`)
      .withGraphFetched("[allService, byIDService, byPhoneService]");
    await segments.forEach(async (s) => {
      s.all = s.allService;
      s.byID = s.byIDService;
      s.byPhone = s.byPhoneService;
      delete s.allService;
      delete s.byIDService;
      delete s.byPhoneService;
      return s;
    });
    res.send({ data: segments });
  } else {
    return res.send({ error: "Incorrect search param" });
  }
}

// async function update(req, res) {
//     const data = req.body.data;
//     const isExisting =
//         (await UserSegment.query().findById(req.params.id)) !== undefined;
//
//     if (!isExisting) {
//         res.status(400).send({
//             status: `User does not exists with the id ${req.params.id}`,
//         });
//     } else {
//         console.log('user Id ----1 ', data.type);
//
//         let serviceType = await Service.query().where("name", data.type)[0];
//         if (!serviceType)
//             serviceType = await Service.query().patch({name: data.type});
//         console.log('user Id ---- 2', isExisting, req.params.id);
//
//         data.type = serviceType.id;
//         // TODO: Verify data
//         console.log('user Id ---- 3', isExisting, req.params.id);
//
//         await Transformer.query().patch(data).findById(req.params.id);
//         const getAgain = await UserSegment.query().findById(req.params.id);
//
//         res.send({data: getAgain});
//     }
// }

async function deleteByID(req, res) {
  const transformer = await UserSegment.query().deleteById(req.params.id);
  res.send({ data: `Number of transformers deleted: ${transformer}` });
}

async function dryRun(req, res) {
  // TODO: Dry Run
  res.send({ data: "Success" });
}

async function getAllUsers(req, res) {
  console.log(req.params);
  const userSegment = await UserSegment.query()
    .findById(req.params.id)
    .withGraphFetched("[allService, byIDService, byPhoneService]");
  console.log({ userSegment });
  const allUsers = await userSegment.allService.resolve();
  res.send({ data: allUsers });
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
    let serviceTypeAll = await Service.query().where(data.all)[0];

    let serviceTypeByPhone = await Service.query().where(data.byPhone)[0];

    let serviceTypeByID = await Service.query().where(data.byID)[0];

    const trx = await UserSegment.startTransaction();
    try {
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
      data.count = data.count;

      const verified = await Promise.all([
        serviceTypeAll.verify("getAllUsers"),
        serviceTypeByID.verify("getUserByID"),
        serviceTypeByPhone.verify("getUserByPhone"),
      ])
        .then((result) => {
          const reducer = (accumulator, currentValue) =>
            accumulator + (currentValue.status === "Verified" ? 1 : 0);
          if (result.reduce(reducer, 0) === 3) return true;
          else return false;
        })
        .catch((e) => {
          trx.rollback();
          console.error(e);
          res.send({ data: "UserSegment could not be verified." });
        });
      if (verified) {
        const inserted = await UserSegment.query(trx).insert(data);
        await trx.commit();
        const getAgain = await UserSegment.query()
          .findById(inserted.id)
          .withGraphFetched("[allService, byIDService, byPhoneService]");
        getAgain.all = getAgain.allService;
        getAgain.byID = getAgain.byIDService;
        getAgain.byPhone = getAgain.byPhoneService;
        delete getAgain.allService;
        delete getAgain.byIDService;
        delete getAgain.byPhoneService;
        res.send({ data: getAgain });
      } else {
        await trx.rollback();
        res.send({
          data: "UserSegment could not be registered. Services down.",
        });
      }
    } catch (e) {
      console.error(e);
      trx.rollback();
      res.send({ data: "UserSegment could not be registered." });
    }
  }
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting = await UserSegment.query().findById(req.params.id);

  if (!isExisting) {
    return res.status(400).send({
      status: `User Segment does not exists with the id ${req.params.id}`,
    });
  }
  let serviceTypeAll = await Service.query().findById(isExisting.all);

  let serviceTypeByPhone = await Service.query().findById(isExisting.byPhone);

  let serviceTypeByID = await Service.query().findById(isExisting.byID);

  const trx = await UserSegment.startTransaction();
  try {
    if (!serviceTypeAll)
      serviceTypeAll = await Service.query(trx).insert(data.all);
    if (!serviceTypeByPhone)
      serviceTypeByPhone = await Service.query(trx).insert(data.byPhone);
    if (!serviceTypeByID)
      serviceTypeByID = await Service.query(trx).insert(data.byID);
    const verified = await Promise.all([
      serviceTypeAll.verify("getAllUsers"),
      serviceTypeByID.verify("getUserByID"),
      serviceTypeByPhone.verify("getUserByPhone"),
    ])
      .then((result) => {
        const reducer = (accumulator, currentValue) =>
          accumulator + (currentValue.status === "Verified" ? 1 : 0);
        if (result.reduce(reducer, 0) === 3) return true;
        else return false;
      })
      .catch((e) => {
        trx.rollback();
        console.error(e);
        return res.send({ data: "UserSegment could not be verified." });
      });
    if (verified) {
      const updateObject = {};
      if (data.count !== undefined) {
        updateObject = { name: data.name, count: data.count };
      } else {
        updateObject = { name: data.name };
      }

      if (data.category !== undefined) {
        updateObject.category = data.category;
      }

      const patched = await UserSegment.query(trx)
        .patch(updateObject)
        .findById(req.params.id);
      const d = await trx.commit();
      const getAgain = await UserSegment.query()
        .findById(req.params.id)
        .withGraphFetched("[allService, byIDService, byPhoneService]");
      getAgain.all = getAgain.allService;
      getAgain.byID = getAgain.byIDService;
      getAgain.byPhone = getAgain.byPhoneService;
      delete getAgain.allService;
      delete getAgain.byIDService;
      delete getAgain.byPhoneService;
      return res.send({ data: getAgain });
    } else {
      await trx.rollback();
      return res.send({
        data: "UserSegment could not be updated. Services down.",
      });
    }
  } catch (e) {
    console.error(e);
    console.error("======12");
    await trx.rollback();
    return res.send({ data: "UserSegment could not be updated." });
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
    .route(BASE_URL + "/userSegment/get")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      get
    );

  app
    .route(BASE_URL + "/userSegment/search")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      search
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

  app
    .route(BASE_URL + "/userSegment/getAllUsers/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAllUsers
    );
};
