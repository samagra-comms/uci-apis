const health = require("./overAllHealths");
const requestMiddleware = require("../middlewares/request.middleware");
const BASE_URL = "/";
const response = require("../routes/response");

async function checkOverAllHealth(req, res) {
  let checks = [];
  let healthstatus = true;
  let fusionAuth = await health.checkFusion();
  await checks.push(fusionAuth);
  let inbound = await health.checkInbound();
  await checks.push(inbound);
  let transformer = await health.checkTransformer();
  await checks.push(transformer);
  let postgres = await health.checkDB();
  await checks.push(postgres);
  let kafka = await health.checkKafka();
  await checks.push(kafka);
  let gql = await health.checkGQL();
  await checks.push(gql);
  let redis = await health.checkRedis();
  await checks.push(redis);

  if (
    fusionAuth.healthy &&
    inbound.healthy &&
    transformer.healthy &&
    postgres.healthy &&
    kafka.healthy &&
    gql.healthy &&
    redis.healthy
  ) {
    healthstatus = true;
  } else {
    healthstatus = false;
  }

  response.sendHealthSuccessRes(req, healthstatus, checks, res, "SUCCESS");
}

module.exports = function (app) {
  app
    .route(BASE_URL + "health")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkOverAllHealth
    );
};
