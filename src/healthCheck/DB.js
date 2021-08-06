const requestMiddleware = require("../middlewares/request.middleware");
const Knex = require("knex");
const response = require("../routes/response");
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const BASE_URL = "/admin/v1";

async function checkDB(req, res) {
  const errCode = HealthMessages.EXCEPTION_CODE;
  const knexConfig = {
    development: {
      debug: false,
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.PSQL_DB_URL_DEV,
      pool: {
        min: 20,
        max: 50,
      
      },
    },
    production: {
      debug: false,
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.PSQL_DB_URL,
      pool: {
        min: 2,
        max: 5,
      },
    },
  };
  let checks = []

  // Initialize knex.
  const config =
    process.env.ENV === "dev" ? knexConfig.development : knexConfig.production;
  const knex = Knex(config);
  if(knex){
    checks.push({"name":"connection",
    "healthy":" true"})
  } else {
    checks.push({"name":"connection",
    "healthy":" false"})
  }

  knex
    .select()
    .from("transformer")
    .then((data) => {
      console.log("trans", data);
      checks.push({"name":"migration",
    "healthy":" true"})
      checks.push({"name":"test-query",
    "healthy":" true"})
      response.sendHealthSuccessRes(
        req,
        true,
        checks,
        res,
        HealthMessages.POSTGRES_DB.SUCCESS_CODE
      );
    })
    .catch((err) => {
      response.sendHealthErrorRes(
        req,
        res,
        HealthMessages.POSTGRES_DB.FAILED_CODE,
        errorCode,
        HealthMessages.POSTGRES_DB.FAILED_MESSAGE,
        false,
        errCode
      );
    });
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/health/DB")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkDB
    );
};
