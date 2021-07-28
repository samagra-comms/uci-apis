var express = require("express");
const { result } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Service } = require("../models/service");
const { UserSegment } = require("../models/userSegment");
const { Bot } = require("../models/bot");
const { QueryBuilder } = require("../helpers/userSegment/fusionAuth");
const { DeviceManager } = require("../helpers/userSegment/deviceManager");
const messageUtils = require("../service/messageUtil");
const uuid = require("uuid/v1");
const USMessages = messageUtils.USER_SEGMENT;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;

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
  const rspObj = req.rspObj;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + USMessages.READ.EXCEPTION_CODE;
  try {
    const batchSize = req.query.perPage;
    const page = req.query.page - 1;
    const allSegments = await UserSegment.query()
      .page(page, batchSize)
      .withGraphFetched("[allService, byIDService, byPhoneService]");
    const modifiedData = allSegments.results.map((s) => {
      s.all = s.allService;
      s.byID = s.byIDService;
      s.byPhone = s.byPhoneService;
      delete s.allService;
      delete s.byIDService;
      delete s.byPhoneService;
      return s;
    });
    if (allSegments) {
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = { data: modifiedData, total: allSegments.total };
      return res.status(200).send(successResponse(rspObj));
    } else {
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = { data: [], total: 0 };
      return res.status(200).send(successResponse(rspObj));
    }
  } catch (e) {
    rspObj.errCode = USMessages.READ.EXCEPTION_CODE;
    rspObj.errMsg = USMessages.READ.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
  }
}

async function getByID(req, res) {
  const transformer = await UserSegment.query().findById(req.params.id);
  if (transformer) res.send({ data: transformer });
}

async function search(req, res) {
  const rspObj = req.rspObj;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + USMessages.SEARCH.EXCEPTION_CODE;
  if (req.param.name !== undefined) {
    try {
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
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = {
        data: segments,
      };
      return res.status(200).send(successResponse(rspObj));
    } catch (e) {
      rspObj.errCode = USMessages.SEARCH.EXCEPTION_CODE;
      rspObj.errMsg = USMessages.SEARCH.FAILED_MESSAGE;
      rspObj.responseCode = responseCode.CLIENT_ERROR;
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
    }
  } else {
    rspObj.errCode = USMessages.SEARCH.EXCEPTION_CODE;
    rspObj.errMsg = USMessages.SEARCH.MISSING_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
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
  const rspObj = req.rspObj;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + USMessages.CREATE.EXCEPTION_CODE;
  try {
    const data = req.body.data;
    const isExisting =
      (await (await UserSegment.query().where("name", data.name)).length) > 0;

    if (isExisting) {
      res.status(400).send({
        status: `UserSegment already exists with the name ${data.name}`,
      });
    } else {
      let serviceTypeAll = await Service.query()
        .where(data.all)
        .then((s) => s[0])
        .catch((e) => console.log(e));
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
              accumulator + (currentValue.verified ? 1 : 0);
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
          rspObj.responseCode = responseCode.SUCCESS;
          rspObj.result = {
            inserted: getAgain,
          };
          return res.status(200).send(successResponse(rspObj));
        } else {
          await trx.rollback();
          console.error(e);
          trx.rollback();
          rspObj.errCode = USMessages.CREATE.EXCEPTION_CODE;
          rspObj.errMsg = USMessages.CREATE.FAILED_MESSAGE;
          rspObj.responseCode = responseCode.CLIENT_ERROR;
          rspObj.result = {
            error: "UserSegment could not be registered. Services down.",
          };
          return res
            .status(400)
            .send(errorResponse(rspObj, errCode + errorCode.CODE1));
        }
      } catch (e) {
        console.error(e);
        trx.rollback();
        rspObj.errCode = USMessages.CREATE.EXCEPTION_CODE;
        rspObj.errMsg = USMessages.CREATE.FAILED_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return res
          .status(400)
          .send(errorResponse(rspObj, errCode + errorCode.CODE1));
      }
    }
  } catch (e) {
    rspObj.errCode = USMessages.CREATE.EXCEPTION_CODE;
    rspObj.errMsg = USMessages.CREATE.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
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
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = {
        inserted: getAgain,
      };
      return res.status(200).send(successResponse(rspObj));
    } else {
      await trx.rollback();
      return res.send({
        data: "UserSegment could not be updated. Services down.",
      });
    }
  } catch (e) {
    console.error(e);
    await trx.rollback();
    return res.send({ data: "UserSegment could not be updated." });
  }
}

async function queryBuilder(req, res) {
  const rspObj = req.rspObj;
  const errCode =
    programMessages.EXCEPTION_CODE +
    "_" +
    USMessages.QUERY_BUILDER.EXCEPTION_CODE;
  try {
    const builder = new QueryBuilder(req.body.data);
    const queryPrefix = 'query Query {users: getUsersByQuery(queryString: "';
    const querySuffix =
      '") {lastName firstName device customData externalIds framework lastName roles rootOrgId userLocation userType}}';
    const query = builder.buildQuery();
    const cadence = {
      concurrent: true,
      pagination: false,
      perPage: 10000,
      retries: 5,
      "retries-interval": 10,
      timeout: 60,
    };
    const credentials = {
      variable: "dummygql",
      vault: "samagra",
    };

    const allConfig = {
      type: "gql",
      config: {
        pageParam: "page",
        cadence,
        credentials,
        gql: queryPrefix + query + querySuffix,
      },
    };

    const all = Service.fromJson(allConfig);
    const verified = await all.verify("getAllUsers");
    let byIDConfig =
      "Could not construct this since there were 0 users in the search query";
    let byPhoneConfig =
      "Could not construct this since there were 0 users in the search query";
    if (verified.sampleUser !== undefined) {
      byIDConfig = {
        type: "gql",
        config: {
          pageParam: "page",
          cadence,
          credentials,
          gql: `query Query($id: String) {users: getUsersByQuery(queryString: $id) {lastName firstName device customData externalIds framework lastName roles rootOrgId userLocation userType }}`,
          verificationParams: {
            id: `(data.device.deviceID : '${verified.sampleUser.device.deviceID}')`,
          },
        },
      };

      byPhoneConfig = {
        type: "gql",
        config: {
          pageParam: "page",
          cadence,
          credentials,
          gql: `query Query($id: String) {users: getUsersByQuery(queryString: $id) {lastName firstName device customData externalIds framework lastName roles rootOrgId userLocation userType }}`,
          verificationParams: {
            id: `(data.device.deviceID : '${verified.sampleUser.device.deviceID}')`,
          },
        },
      };
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = {
        category: "student",
        count: verified.total,
        all: allConfig,
        byID: byIDConfig,
        byPhone: byPhoneConfig,
      };
      return res.status(200).send(successResponse(rspObj));
    } else {
      rspObj.errCode = USMessages.QUERY_BUILDER.EXCEPTION_CODE;
      rspObj.errMsg = USMessages.QUERY_BUILDER.FAILED_MESSAGE;
      rspObj.responseCode = responseCode.CLIENT_ERROR;
      rspObj.result = {
        byIDConfig,
        byPhoneConfig,
      };
      return res
        .status(400)
        .send(errorResponse(rspObj, errCode + errorCode.CODE1));
    }
  } catch (e) {
    rspObj.errCode = USMessages.QUERY_BUILDER.EXCEPTION_CODE;
    rspObj.errMsg = USMessages.QUERY_BUILDER.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    return res
      .status(400)
      .send(errorResponse(rspObj, errCode + errorCode.CODE1));
  }
}

async function addUserToRegistry(req, res) {
  const botID = req.params.botID;
  const username = req.params.userPhone;

  const deviceManager = new DeviceManager();
  let deviceID = "";

  const globalBot = (await Bot.query().where("name", "Global Bot"))[0];
  if (globalBot.id === botID) {
    deviceID = await deviceManager.addAnonymousDeviceToRegistry(username);
  } else {
    // Check if user is in UserSegments for the particular bot.
    const bot = await Bot.query().findById(botID);
    const userSegments = await UserSegment.query()
      .findByIds(bot.users)
      .withGraphFetched("[allService, byIDService, byPhoneService]");

    let found = false;
    let user;
    for (let i = 0; i < userSegments.length; i++) {
      const userQueryParams = {
        id: `(data.device.deviceID : '${username.split(":")[1]}')`,
      };
      user = await userSegments[i].byPhoneService.getUserByGQL(userQueryParams);
      if (user.verified) {
        found = true;
        break;
      }
    }

    if (found) {
      // If found, save it to the Registry to cache it.
      deviceID = await deviceManager.addDeviceToRegistry(botID, user.user);
    } else {
      // If not found, add an empty user to the Registry to add fields later on.
      const dummyUser = {
        device: {
          deviceID: username.split(":")[1],
          type: username.split(":")[0],
        },
      };
      deviceID = await deviceManager.addDeviceToRegistry(botID, dummyUser);
    }
  }
  res.send({
    status: "Success",
    message: "User Added",
    userID: deviceID,
  });
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

  app
    .route(BASE_URL + "/userSegment/queryBuilder/")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      queryBuilder
    );

  app
    .route(BASE_URL + "/userSegment/addUser/:botID/:userPhone")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      addUserToRegistry
    );
};
