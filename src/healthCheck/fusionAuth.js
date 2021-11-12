const response = require("../routes/response");
const requestMiddleware = require("../middlewares/request.middleware");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const { DeviceManager } = require("../helpers/userSegment/deviceManager");
const BASE_URL = "/admin/v1";
const errCode = HealthMessages.EXCEPTION_CODE;
const fetch = require("node-fetch");

async function checkFusion(req, res) {
  let checks = [];
  fetch(`${process.env.FUSIONAUTH_URL}/api/status`)
    .then(async (s) => {
      console.log("Result:", s.status);
      if (s.statusText === "OK") {
        checks.push({ name: "connection", healthy: " true" });
        response.sendHealthSuccessRes(
          req,
          true,
          checks,
          res,
          HealthMessages.FUSION.SUCCESS_CODE
        );
      } else {
        response.sendHealthErrorRes(
          req,
          res,
          HealthMessages.FUSION.FAILED_CODE,
          errorCode,
          HealthMessages.FUSION.FAILED_MESSAGE,
          false,
          errCode
        );
      }
    })
    .catch((e) => {
      response.sendHealthErrorRes(
        req,
        res,
        HealthMessages.FUSION.FAILED_CODE,
        errorCode,
        HealthMessages.FUSION.FAILED_MESSAGE,
        false,
        errCode
      );
    });
}
module.exports = function (app) {
  app
    .route(BASE_URL + "/health/fusionAuth")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkFusion
    );
};
