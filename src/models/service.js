"use strict";

const { Model } = require("objection");

class Service extends Model {
  static get tableName() {
    return "service";
  }
  static get relationMappings() {
    const { Service } = require("./service");
    return {
      transformer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "service.id",
          to: "transformer.service",
        },
      },
    };
  }
}

module.exports = {
  Service,
};
