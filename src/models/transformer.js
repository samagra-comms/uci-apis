"use strict";

const { Model } = require("objection");

class Transformer extends Model {
  static get tableName() {
    return "transformer";
  }
}

module.exports = {
  Transformer,
};
