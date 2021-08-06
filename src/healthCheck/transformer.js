const response = require("../routes/response");
const requestMiddleware = require("../middlewares/request.middleware");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const BASE_URL = "/admin/v1";
const errCode = HealthMessages.EXCEPTION_CODE;
const fetch = require("node-fetch");

async function checkTransformer(req, res) {
  let checks = [];
  fetch(`${process.env.INBOUND_URL}/health`)
    .then(async (s) => {
        console.log("rsult:",s)
      if(s.result.healthy === true){
      checks.push({"name":"connection",
      "healthy":" true"})
      response.sendHealthSuccessRes(
        req,
        true,
        checks,
        res,
        HealthMessages.TRANSFORMER.SUCCESS_CODE
      );
      } else{
        response.sendHealthErrorRes(
          req,
          res,
          HealthMessages.TRANSFORMER.FAILED_CODE,
          errorCode,
          HealthMessages.TRANSFORMER.FAILED_MESSAGE,
          false,
          errCode
        );
      }
    })
    .catch((e) => {
        console.log("EXX")
      response.sendHealthErrorRes(
        req,
        res,
        HealthMessages.TRANSFORMER.FAILED_CODE,
        errorCode,
        HealthMessages.TRANSFORMER.FAILED_MESSAGE,
        false,
        errCode
      );
    });
}
module.exports = function (app) {
  app
    .route(BASE_URL + "/health/transformer")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkTransformer
    );
};
