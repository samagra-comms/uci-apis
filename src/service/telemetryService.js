const TelemetryServiceInstance = require('sb_telemetry_util');
const envVariables = require('../envVariables');
const _ = require("lodash");
const telemetryEventConfig = require('../config/telemetryEventConfig.json');

const telemetryInstance = new TelemetryServiceInstance();

function initTelemetry() {
    config = {
        host: envVariables.telemetryConfig.host,
        endpoint: envVariables.telemetryConfig.endpoint,
        method: envVariables.telemetryConfig.method,
        batchsize: 10
    }
    telemetryInstance.init(config);
}

function generateAuditEvent(DBinstance, model, action) {
    const event = {};
        event['context'] = {
           pdata: telemetryEventConfig.pdata,
           env: model.name,
           channel: ''
        }
        event['edata'] = {
            state: DBinstance.status || '',
            prevstate: action === 'create' ? '' : DBinstance.previous().status || DBinstance.status,
            props: _.keys(DBinstance.previous())
        }
        event['object'] = {
           id: DBinstance[model.primaryKeyAttributes[0]] || '',
           type: model.name
        }
    telemetryInstance.audit(event);
}

module.exports.initializeTelemetryService = initTelemetry
module.exports.generateAuditEvent = generateAuditEvent