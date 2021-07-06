const { students } = require("./generateDummyData");
const { FusionAuthClient } = require("fusionauth-node-client");
const env = require("dotenv").config();

// For staging server
const fusionAuthURL = process.env.FA_URL;
const fusionAuthAPIKey = process.env.FA_API_KEY;
const applicationId = "281c68c4-97f0-4aba-8b2e-cff59fbc038f";

const registerSingleClient = (data, counter) => {
  const client = new FusionAuthClient(fusionAuthAPIKey, fusionAuthURL);
  return client
    .register(undefined, data)
    .then((response) => {
      console.log("User Created", counter);
    })
    .catch((response) => {
      console.log(JSON.stringify(response));
      console.log("Failed to register", data.username);
      // console.log(response.errorResponse.fieldErrors);
      return client
        .retrieveUserByLoginId(data.user.username)
        .then((u) => {
          console.log(u.successResponse.user.id);
          return u.successResponse.user.id;
        })
        .then((id) => {
          console.log("id", id);
          delete data.user.password;
          return client
            .updateUser(id, data)
            .then((r) => {
              console.log("User Updated", counter);
              return r;
            })
            .catch((r) => {
              console.log("Error in updating user");
              console.log(util.inspect(r, { showHidden: false, depth: null }));
              return r;
            });
        });
    });
};

const bulkAdd = async () => {
  const data = students;
  await addOneByOne(data);
};

async function addOneByOne(data) {
  const requestJSON = data.map((user) => {
    let userRequestJSON = {
      user: {
        username: user.firstName,
        password: "dummyUser",
        fullName: user.firstName + " " + user.lastName,
        active: true,
        data: user,
      },
      registration: {
        applicationId: applicationId,
        username: user.firstName,
      },
    };
    return userRequestJSON;
  });
  const start = Date.now();
  const chunkSize = 50;
  let promises = [];
  for (let i = 0; i < requestJSON.length; i++) {
    if (promises.length < chunkSize) {
      console.log("Sending ", i, "to process");
      promises.push(registerSingleClient(requestJSON[i], i));
    } else {
      await Promise.all(promises)
        .then((response) => {
          console.log("Done till", i);
        })
        .catch((e) => console.log);
      promises = [];
    }
  }
}

bulkAdd();
