const telemetryService = require("../service/telemetryService");

function manageModelHooks(db) {
  db.program.addHook("beforeUpdate", (instance) => {
    telemetryService.generateAuditEvent(instance, db.program, "update");
  });
  db.program.addHook("afterCreate", (instance) => {
    telemetryService.generateAuditEvent(instance, db.program, "create");
  });
  db.nomination.addHook("beforeUpdate", (instance) => {
    telemetryService.generateAuditEvent(instance, db.nomination, "update");
  });
  db.nomination.addHook("afterCreate", (instance) => {
    telemetryService.generateAuditEvent(instance, db.nomination, "create");
  });
}

module.exports.AttachModelHooks = manageModelHooks;
