var express = require("express");
const requestMiddleware = require("../middlewares/request.middleware");

const BASE_URL = "/admin/v1";
const { Transformer } = require("../models/transformer");
const { Service } = require("../models/service");

const { queue } = require("../service/schedulerService");
const KafkaService = require("../helpers/kafkaUtil");
const { Vault } = require("../helpers/vault");

// Refactor this to move to service
async function getAll(req, res) {
  const allTransformers = await Transformer.query().withGraphFetched("service");
  console.log({ allTransformers });
  KafkaService.refreshSubscribers(allTransformers);
  res.send({ data: allTransformers });
}

async function getByID(req, res) {
  const transformer = await Transformer.query()
    .findById(req.params.id)
    .withGraphFetched("service");
  res.send({ data: transformer });
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting =
    (await Transformer.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    res.status(400).send({
      status: `Transformer does not exists with the id ${req.params.id}`,
    });
  } else {
    console.log("Here");
    const serviceParams = {
      type: data.type,
      config: data.config,
    };
    let serviceType = await Service.query().where(serviceParams)[0];
    if (!serviceType)
      serviceType = await Service.query()
        .insert(serviceParams)
        .catch(console.log);
    data.service_id = serviceType.id;
    delete data.service;
    // TODO: Verify data

    await Transformer.query().patch(data).findById(req.params.id);
    const getAgain = await Transformer.query().findById(req.params.id);

    res.send({ data: getAgain });
  }
}

async function deleteByID(req, res) {
  const transformer = await Transformer.query().deleteById(req.params.id);
  res.send({ data: `Number of transformers deleted: ${transformer}` });
}

async function dryRun(req, res) {
  // TODO: Dry Run
  res.send({ data: "Success" });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting =
    (await (await Transformer.query().where("name", data.name)).length) > 0;

  if (isExisting) {
    res.status(400).send({
      status: `Transformer already exists with the name ${data.name}`,
    });
  } else {
    let serviceType = await Service.query().where(data.service)[0];

    // TODO: Verify data

    try {
      const trx = await Transformer.startTransaction();
      if (!serviceType)
        serviceType = await Service.query(trx).insert(data.service);
      data.service_id = serviceType.id;

      const inserted = await Transformer.query(trx).insert(data);
      const topicCreated = await KafkaService.addTransformer(
        inserted,
        serviceType
      );
      if (topicCreated === undefined) {
        await trx.rollback();
        res.send({ data: "Transformer could not be registered." });
      } else {
        await trx.commit();
        const transformer = await Transformer.query()
          .findById(inserted.id)
          .withGraphFetched("service");
        console.log({ transformer });
        KafkaService.refreshSubscribers([transformer]);
        transformer.service = serviceType;
        res.send({ data: transformer });
      }
    } catch (e) {
      console.error(e);
      res.send({ data: "Transformer could not be registered." });
    }
  }
}

async function getForms(req, res) {
  const transformer = await Transformer.query()
    .findById(req.params.id)
    .withGraphFetched("service");

  if (transformer.service.type === "odk") {
    const util = require("util");
    const { parseString } = require("xml2js");
    const DigestFetch = require("digest-fetch");

    const getODKForms = async (credentials) => {
      const client = new DigestFetch(
        credentials.username,
        credentials.password,
        {
          logger: console,
        }
      );

      return client
        .fetch(`${credentials.uri}/formList`)
        .then((resp) => resp.text())
        .then(async (data) => {
          data = await util.promisify(parseString)(data);
          let flatForms = [];
          if (data && data.forms && data.forms.form) {
            flatForms = data.forms.form.map((f) => {
              return { name: f._, id: `${f.$ && f.$.url.split("=")[1]}` };
            });
          }
          return flatForms;
        })
        .catch((e) => console.log("DIGEST FETCH", e));
    };

    const vault = new Vault();
    const credentials = vault.getCredentials(
      "odk",
      transformer.service.config.credentials
    );
    const forms = await getODKForms(credentials);
    res.send({ data: forms });
  } else {
    res
      .status(400)
      .send({ status: "Error", error: "Transformer is not of ODK type" });
  }
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/transformer/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/transformer/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/transformer/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/transformer/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/transformer/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );

  app
    .route(BASE_URL + "/transformer/dryRun/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      dryRun
    );

  app
    .route(BASE_URL + "/transformer/getForms/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getForms
    );
};
