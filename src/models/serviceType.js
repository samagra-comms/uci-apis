"use strict";

const { Model } = require("objection");

class ServiceType extends Model {
  static get tableName() {
    return "serviceType";
  }
}

module.exports = {
  ServiceType,
};
