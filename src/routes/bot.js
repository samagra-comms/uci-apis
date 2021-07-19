var express = require("express");
const { result, forEach } = require("lodash");
const requestMiddleware = require("../middlewares/request.middleware");
const { FusionAuthClient } = require("fusionauth-node-client");

const BASE_URL = "/admin/v1";
const { Bot } = require("../models/bot");
const { ConversationLogic } = require("../models/conversationLogic");
const { UserSegment } = require("../models/userSegment");
const { Adapter } = require("../models/adapter");
const fetch = require("node-fetch");

const fusionAuthURL = process.env.FA_URL;
const fusionAuthAPIKey = process.env.FA_API_KEY;
const anonymousBotID = process.env.FA_ANONYMOUS_BOT_ID;

const client = new FusionAuthClient(fusionAuthAPIKey, fusionAuthURL);

const UCI_CORE_URL = `http://${process.env.UCI_CORE_BASE_URL}/campaign`;

// BOT status = "enabled", "disabled", "draft";

// Refactor this to move to service
async function getAll(req, res) {
  const allCL = await Bot.query();
  res.send({ data: allCL });
}

async function getByID(req, res) {
  const bot = await Bot.query().findById(req.params.id);
  if (bot) {
    const conversationLogics = await ConversationLogic.query().findByIds(
      bot.logicIDs
    );
    const userSegments = await UserSegment.query()
      .findByIds(bot.users)
      .withGraphFetched("[allService, byIDService, byPhoneService]");
    for (let j = 0; j < conversationLogics.length; j++) {
      const adapterID = conversationLogics[j].adapter;
      conversationLogics[j].adapter = await Adapter.query().findById(adapterID);
    }
    bot.userSegments = userSegments;
    bot.logic = conversationLogics;
    res.send({ data: bot });
  } else res.send({ error: `Bot with id ${req.params.id} not found` });
}

async function get(req, res) {
  const batchSize = req.query.perPage;
  const page = req.query.page - 1;
  const botsData = await Bot.query().page(page, batchSize);
  const data = [];
  for (let i = 0; i < botsData.results.length; i++) {
    let bot = botsData.results[i];
    const conversationLogics = await ConversationLogic.query().findByIds(
      bot.logicIDs
    );
    for (let j = 0; j < conversationLogics.length; j++) {
      const adapterID = conversationLogics[j].adapter;
      conversationLogics[j].adapter = await Adapter.query().findById(adapterID);
    }
    const userSegments = await UserSegment.query().findByIds(bot.users);
    bot.logic = conversationLogics;
    bot.userSegments = userSegments;
    data.push(bot);
  }
  res.send({ data, total: botsData.total });
}

async function startByID(req, res) {
  const id = req.params.id;
  fetch(`${UCI_CORE_URL}/start?campaignId=${id}`)
    .then(async (s) => {
      await Bot.query().findById(req.params.id).patch({ status: "enabled" });
      res.status(200).send({ status: "Bot Triggered" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ status: "Exception in triggering Bot", error: e.message });
    });
}

async function pauseByID(req, res) {
  const id = req.params.id;
  fetch(`${UCI_CORE_URL}/pause?campaignId=${id}`)
    .then(async (s) => {
      await Bot.query().findById(req.params.id).patch({ status: "disabled" });
      res.status(200).send({ status: "Bot Paused" });
    })
    .catch((e) => {
      res
        .status(400)
        .send({ status: "Exception in triggering Bot", error: e.message });
    });
}

async function getAllUsers(req, res) {
  console.log(req.params);
  const bot = await Bot.query().findById(req.params.id);
  const userSegment = await UserSegment.query()
    .findByIds(bot.users)
    .withGraphFetched("[allService, byIDService, byPhoneService]");
  const allUsers = await userSegment[0].allService.resolve();
  res.send({ data: allUsers });
}

async function getByParam(req, res) {
  if (req.query.name) {
    const bot = (await Bot.query().where("name", req.query.name))[0];
    if (bot instanceof Bot) {
      // Add logic
      let logic = await ConversationLogic.query().findByIds(bot.logicIDs);
      bot.logic = logic;
      res.send({ data: bot });
    } else
      res.status(400).send({ status: "Bot not found with the given name." });
  } else if (req.query.startingMessage) {
    if (req.query.startingMessage === "") {
      res.status(400).send({ status: "Invalid query param" });
    } else {
      const bot = (
        await Bot.query().where("startingMessage", req.query.startingMessage)
      )[0];
      if (bot instanceof Bot) {
        // Add logic
        let logic = await ConversationLogic.query().findByIds(bot.logicIDs);
        bot.logic = logic;
        res.send({ data: bot });
      } else {
        res
          .status(400)
          .send({ status: "Bot not found with the given startingMessage." });
      }
    }
  } else {
    res.status(400).send({ status: "Invalid query param" });
  }
}

async function search(req, res) {
  const batchSize = req.query.perPage;
  const page = req.query.page - 1;
  if (req.query.name) {
    let bots;
    if (req.query.match === "true") {
      console.log("Here");
      bots = await Bot.query()
        .where("name", req.query.name)
        .page(page, batchSize);
    } else {
      bots = await Bot.query()
        .where("name", "ILIKE", `%${req.query.name}%`)
        .page(page, batchSize);
    }

    const botsModified = await Promise.all(
      bots.results.map(async (bot) => {
        const conversationLogics = await ConversationLogic.query().findByIds(
          bot.logicIDs
        );
        const userSegments = await UserSegment.query()
          .findByIds(bot.users)
          .withGraphFetched("[allService, byIDService, byPhoneService]");
        for (let j = 0; j < conversationLogics.length; j++) {
          const adapterID = conversationLogics[j].adapter;
          conversationLogics[j].adapter = await Adapter.query().findById(
            adapterID
          );
        }
        console.log({ userSegments, conversationLogics });
        bot.userSegments = userSegments;
        bot.logic = conversationLogics;
        return bot;
      })
    );
    res.send({ data: botsModified, total: bots.total });
  } else {
    res.status(400).send({ status: "Invalid query param" });
  }
}

async function update(req, res) {
  const data = req.body.data;
  const isExisting = (await Bot.query().findById(req.params.id)) !== undefined;

  if (!isExisting) {
    res.status(400).send({
      status: `ConversationLogic does not exists with the id ${req.params.id}`,
    });
  } else {
    try {
      const trx = await Bot.startTransaction();
      // Loop over transformers to verify if they exist or not.
      const userSegments = data.users;
      let isValidUserSegment = true;
      for (let i = 0; i < userSegments.length; i++) {
        isValidUserSegment =
          isValidUserSegment &&
          (await UserSegment.query().findById(userSegments[i])) instanceof
            UserSegment;
      }
      const CLs = data.logic;
      let isValidCL = true;
      for (let i = 0; i < CLs.length; i++) {
        isValidCL =
          isValidCL &&
          (await ConversationLogic.query().findById(CLs[i])) instanceof
            ConversationLogic;
      }
      data.logicIDs = data.logic;
      delete data.logic;

      if (isValidUserSegment && isValidCL) {
        const inserted = await Bot.query(trx)
          .patch(data)
          .findById(req.params.id);
        await trx.commit();
        res.send({ data: "Patched" });
      } else {
        await trx.rollback();
        res
          .status(400)
          .send({ status: "Error", error: "Invalid transformer ID" });
      }
    } catch (e) {
      console.error(e);
      await trx.rollback();
      res.send({ data: "ConversationLogic could not be registered." });
    }
  }
}

async function deleteByID(req, res) {
  const transformer = await Bot.query().deleteById(req.params.id);
  res.send({ data: `Number of CLs deleted: ${transformer}` });
}

async function insert(req, res) {
  const data = req.body.data;
  const isExisting = (await Bot.query().where(data).length) > 0;

  if (isExisting) {
    res.status(400).send({
      status: `ConversationLogic already exists with the name ${data.name}`,
    });
  } else {
    const trx = await Bot.startTransaction();
    try {
      // Loop over transformers to verify if they exist or not.
      const userSegments = data.users;
      let isValidUserSegment = true;
      for (let i = 0; i < userSegments.length; i++) {
        isValidUserSegment =
          isValidUserSegment &&
          (await UserSegment.query().findById(userSegments[i])) instanceof
            UserSegment;
      }
      const CLs = data.logic;
      let isValidCL = true;
      for (let i = 0; i < CLs.length; i++) {
        isValidCL =
          isValidCL &&
          (await ConversationLogic.query().findById(CLs[i])) instanceof
            ConversationLogic;
      }

      data.logicIDs = data.logic;
      delete data.logic;
      if (isValidUserSegment && isValidCL) {
        const inserted = await Bot.query(trx).insert(data);
        await client
          .createApplication(inserted.id, {
            application: {
              name: inserted.name,
            },
          })
          .then(async (r) => {
            await trx.commit();
            res.send({ data: inserted });
          })
          .catch(async (e) => {
            JSON.stringify(e);
            await trx.rollback();
            res
              .status(400)
              .send({ status: "Error", error: "Invalid transformer ID" });
          });
      } else {
        await trx.rollback();
      }
    } catch (e) {
      console.error(e);
      await trx.rollback();
      res.status(400).send({ data: "Bot could not be registered." });
    }
  }
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/bot/all")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAll
    );

  app
    .route(BASE_URL + "/bot/get")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      get
    );

  app
    .route(BASE_URL + "/bot/create")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      insert
    );

  app
    .route(BASE_URL + "/bot/get/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByID
    );

  app
    .route(BASE_URL + "/bot/update/:id")
    .post(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      update
    );

  app
    .route(BASE_URL + "/bot/delete/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      deleteByID
    );

  app
    .route(BASE_URL + "/bot/getByParam/")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getByParam
    );

  app
    .route(BASE_URL + "/bot/search/")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      search
    );

  app
    .route(BASE_URL + "/bot/start/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      startByID
    );

  app
    .route(BASE_URL + "/bot/pause/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      pauseByID
    );

  app
    .route(BASE_URL + "/bot/getAllUsers/:id")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      getAllUsers
    );
};
