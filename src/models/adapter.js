"use strict";

const { Model } = require("objection");

class Adapter extends Model {
  static get tableName() {
    return "adapter";
  }
}

module.exports = {
  Adapter,
};
