const fs = require("fs");

class Vault {
  constructor() {
    const data = require("./vaultDataMock.json");
    this.data = data;
  }

  getCredentials = (serviceType, credentials) => {
    const variableName = credentials.variable;
    if (serviceType === "gql") {
      return {
        uri: this.data[variableName].service,
        headers: this.data[variableName].headers,
      };
    } else if (serviceType === "odk") {
      return this.data[variableName];
    } else {
      return this.data[variableName];
    }
  };

  // for testing the mock class and nothing else [Will be removed]
  __addCredentails = async (variableName, config) => {
    try {
      const fileName = "./vaultDataMock.json";
      const data = require(fileName);
      data[variableName] = config;

      const isUpdated = await fs.writeFile(
        fileName,
        JSON.stringify(file, null, 2),
        function writeJSON(err) {
          if (err) return false;
          console.log(JSON.stringify(file));
          console.log("writing to " + fileName);
          return true;
        }
      );
      if (isUpdated) this.data = data;
      return isUpdated;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // for testing the mock class and nothing else [Will be removed]
  __updateCredentails = (variableName, config) => {
    return this.addCredentails(variableName, config);
  };
}

module.exports = {
  Vault,
};
