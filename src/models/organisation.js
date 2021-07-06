"use strict";

const { Model } = require("objection");

class Organisation extends Model {
  static get tableName() {
    return "bot";
  }
}

module.exports = {
  Organisation,
};
