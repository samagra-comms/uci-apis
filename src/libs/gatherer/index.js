const RestGatherer = require("./RestGatherer");
const TestGatherer = require("./TestGatherer");

const config = {
    "test": new TestGatherer(),
    "rest-service": new RestGatherer()
};



module.exports = function getProcessor(name) {
    if (!config[name] || !config[name].processJob) {
        throw `No processor defined for ${name} type of service`;
    }
    return config[name];
}