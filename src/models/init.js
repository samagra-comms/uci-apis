"use strict";

const Knex = require("knex");
const { Model } = require("objection");

const { Transformer } = require("./transformer");
const KafkaService = require("../helpers/kafkaUtil");

const knexConfig = {
  development: {
    debug: false,
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.PSQL_DB_URL_DEV,
    pool: {
      min: 2,
      max: 5,
    },
  },

  production: {
    debug: false,
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.PSQL_DB_URL_DEV,
    pool: {
      min: 2,
      max: 5,
    },
  },
};

// Initialize knex.
const knex = Knex(knexConfig.development);
knex
  .raw("select count(*) from transformer")
  .then(async (s) => {
    console.log("DB Connection ✅");
    Model.knex(knex);
    Transformer.query()
      .then(async (ts) => {
        console.log(
          `Model Initialization: ${
            parseInt(s.rows[0].count) === ts.length ? "✅" : "❌"
          }`
        );
        const allTransformers = await Transformer.query().withGraphFetched(
          "service"
        );
        KafkaService.refreshSubscribers(allTransformers);
      })
      .catch((e) => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.log("DB Connection: ❌");
    console.error(err);
    process.exit(1);
  });
