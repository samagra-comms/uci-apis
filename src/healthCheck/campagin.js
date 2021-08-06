const response = require("../routes/response");
const requestMiddleware = require("../middlewares/request.middleware");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const BASE_URL = "/admin/v1";
const errCode = HealthMessages.EXCEPTION_CODE;
const fetch = require("node-fetch");

async function checkCampagin(req, res) {
  let checks = [];
  fetch(`${process.env.CAMPAIGN_URL}`)
    .then(async (s) => {
      if(s.statusText === 'OK'){
      checks.push({"name":"connection",
      "healthy":" true"})
      response.sendHealthSuccessRes(
        req,
        true,
        checks,
        res,
        HealthMessages.CAMPAIGN.SUCCESS_CODE
      );
      } else{
        response.sendHealthErrorRes(
          req,
          res,
          HealthMessages.CAMPAIGN.FAILED_CODE,
          errorCode,
          HealthMessages.CAMPAIGN.FAILED_MESSAGE,
          false,
          errCode
        );
      }
    })
    .catch((e) => {
      response.sendHealthErrorRes(
        req,
        res,
        HealthMessages.CAMPAIGN.FAILED_CODE,
        errorCode,
        HealthMessages.CAMPAIGN.FAILED_MESSAGE,
        false,
        errCode
      );
    });
}
module.exports = function (app) {
  app
    .route(BASE_URL + "/health/campaign")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkCampagin
    );
};
