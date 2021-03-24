"use strict";

const { Model } = require("objection");

class UserSegment extends Model {
  static get tableName() {
    return "userSegment";
  }
  static get relationMappings() {
    const { Service } = require("./service");
    return {
      allService: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "userSegment.all",
          to: "service.id",
        },
      },
      byIDService: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "userSegment.byID",
          to: "service.id",
        },
      },
      byPhoneService: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "userSegment.byPhone",
          to: "service.id",
        },
      },
    };
  }
}

module.exports = {
  UserSegment,
};
