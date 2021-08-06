const requestMiddleware = require("../middlewares/request.middleware");
const { Kafka, logLevel } = require("kafkajs");
const response = require("../routes/response");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const BASE_URL = "/admin/v1";
const errCode = HealthMessages.EXCEPTION_CODE;
async function checkKafka(req, res) {
  let kafka;
  if (process.env.ENV === "dev") {
    kafka = new Kafka({
      clientId: "api",
      brokers: [`${process.env.KAFKA_HOST_DEV}`],
    });
  } else {
    const brokers = process.env.KAFKA_HOST.split(",").map(
      (s) => s + ":" + process.env.KAFKA_PORT
    );   
    kafka = new Kafka({
      clientId: "api",
      brokers: brokers,
      logLevel: logLevel[process.env.KAFKA_LOG_LEVEL],
    });
  }
  let checks = []

  const consumer = kafka.consumer({ groupId: "api-group" });
  consumer
    .connect()
    .then((c) => {       
        checks.push({"name":"connection",
    "healthy":" true"})
      response.sendHealthSuccessRes(req, true,checks, res,HealthMessages.KAFKA.SUCCESS_CODE);
    })
    .catch((e) => {
      response.sendHealthErrorRes(
        req,
        res,
        HealthMessages.KAFKA.FAILED_CODE,
        errorCode,
        HealthMessages.KAFKA.FAILED_MESSAGE,
        false,
        errCode
      );
    });
}
module.exports = function (app) {
  app
    .route(BASE_URL + "/health/kafka")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkKafka
    );
};
