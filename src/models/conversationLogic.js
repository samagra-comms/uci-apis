"use strict";

const { Model } = require("objection");

class ConversationLogic extends Model {
  static get tableName() {
    return "conversationLogic";
  }
}

module.exports = {
  ConversationLogic,
};
