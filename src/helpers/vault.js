const fs = require("fs");

class Vault {
  consttructor() {
    const data = require("./vaultDataMock.json");
    this.data = data;
  }
  getCredentials = (variableName) => {
    return data[variableName];
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
