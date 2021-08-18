"use strict";

const Knex = require("knex");
const { Model } = require("objection");

const { Transformer } = require("./transformer");
const KafkaService = require("../helpers/kafkaUtil");
const { Vault: VaultModel } = require("./vault");

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
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 5,
    },
  },
};

// Initialize knex.
const config =
  process.env.ENV === "dev" ? knexConfig.development : knexConfig.production;
const knex = Knex(config);
knex
  .raw("select count(*) from transformer")
  .then(async (s) => {
    console.log("DB Connection ✅");
    Model.knex(knex);
    Transformer.query()
      .then(async (ts) => {
        await VaultModel.query()
          .findById(1)
          .then((d) => {
            return JSON.parse(VaultModel.decrypt(d.data));
          })
          .catch((e) => {
            const data = require("./../helpers/vaultDataMock.json");
            const encryptedText = VaultModel.encrypt(
              JSON.stringify(data)
            ).toString();
            return VaultModel.query()
              .insert({ id: 1, data: encryptedText })
              .then((s) => data);
          })
          .then((data) => {
            process.env["vault"] = JSON.stringify(data);
          });
        console.log(
          `Model Initialization: ${
            parseInt(s.rows[0].count) === ts.length ? "✅" : "❌"
          }`
        );
        try {
          let allTransformers = await Transformer.query().withGraphFetched(
            "service"
          );
          KafkaService.refreshSubscribers(allTransformers);
          console.log("========--=-=-=-=-=-");
        } catch (tError) {
          console.log("============");
          console.log(tError);
          console.log("============");
        }
      })
      .catch((e) => {
        console.log("--------------------");
        console.log(e);
        console.log("--------------------");

        process.exit(1);
      });
  })
  .catch((err) => {
    console.log("DB Connection: ❌");
    console.log("Config", config);
    console.error(err);
    // process.exit(1);
  });
