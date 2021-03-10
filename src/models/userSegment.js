"use strict";

const { Model } = require("objection");

class UserSegment extends Model {
  static get tableName() {
    return "userSegment";
  }
}

module.exports = {
  Transformer,
};
