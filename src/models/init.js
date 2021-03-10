"use strict";

const Knex = require("knex");
const { Model } = require("objection");

const { Transformer } = require("./transformer");

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
    client: "postgresql",
    connection: {
      database: "example",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

// Initialize knex.
const knex = Knex(knexConfig.development);
knex
  .raw("select count(*) from transformer")
  .then((s) => {
    console.log("DB Connected");

    Model.knex(knex);
    Transformer.query()
      .then((ts) => {
        console.log(
          "Models Initialized",
          parseInt(s.rows[0].count) === ts.length
        );
      })
      .catch((e) => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
