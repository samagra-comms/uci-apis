"use strict";

const { Model } = require("objection");

class Bot extends Model {
  static get tableName() {
    return "bot";
  }
}

module.exports = {
  Bot,
};
