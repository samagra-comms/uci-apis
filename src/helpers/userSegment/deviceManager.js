const { FusionAuthClient } = require("fusionauth-node-client");
const env = require("dotenv").config();

// For staging server
const fusionAuthURL = process.env.FA_URL;
const fusionAuthAPIKey = process.env.FA_API_KEY;
const anonymousBotID = process.env.FA_ANONYMOUS_BOT_ID;

const client = new FusionAuthClient(fusionAuthAPIKey, fusionAuthURL);

class DeviceManager {
  addAnonymousBotID = async () => {
    addBotToRegistry(anonymousBotID);
  };

  addBotToRegistry = async (botID) => {
    return await client.createApplication(botID, {});
  };

  addDeviceToRegistry = async (botID, user) => {
    // TODO: Encrypt
    const username = user.device.type + ":" + user.device.deviceID;
    let fullName = "";
    if (user.firstName && user.lastName)
      fullName = user.firstName + " " + user.lastName;
    let userRequestJSON = {
      user: {
        username: username,
        password: "dummyUser",
        fullName: fullName,
        active: true,
        data: user,
      },
      registration: {
        applicationId: botID,
        username: username,
      },
    };

    if (fullName === "") delete userRequestJSON.user.fullName;
    return await client.createUser(undefined, userRequestJSON);
  };

  addAnonymousDeviceToRegistry = async (username) => {
    const user = {
      device: {
        deviceID: username.split(":")[1],
        type: username.split(":")[0],
      },
    };
    return addDeviceToRegistry(anonymousBotID, user);
  };
}

module.exports = {
  DeviceManager,
};
