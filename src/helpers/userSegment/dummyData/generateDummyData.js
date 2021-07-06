const organisations = require("./organisations.json");
const fs = require("fs");

const baseData = {
  id: "96102c3f-2c22-4614-8dcc-6b130cefe586",
  externalIds: ["96102c3f-2c22-4614-8dcc-6b130cefe586"],
  rootOrgId: "Bot Owner",
  firstName: "first name",
  lastName: "last name",
  userLocation: {
    id: "96102c3f-2c22-4614-8dcc-6b130cefe586",
    state: "state 1",
    district: "district 2",
    block: "block 1",
    cluster: "district",
    school: "School 1",
  },
  roles: "PUBLIC",
  userType: {
    subType: null,
    type: "student",
  },
  customData: {},
  framework: {
    board: "State state3",
    gradeLevel: "Class 1",
    id: "ap_k-12_1",
    medium: "English",
    subject: "English",
  },
};

const allStudents = [];
for (let i = 0; i < organisations.length; i++) {
  let rndInt = Math.floor(Math.random() * 5) + 1;
  let studentData = {};

  for (let j = 1; j <= rndInt; j++) {
    studentData = baseData;
    studentData.userLocation = {
      id: organisations[i].id,
      block: organisations[i].block,
      cluster: organisations[i].cluster,
      district: organisations[i].district,
      school: organisations[i].school,
      state: organisations[i].state,
    };

    let userNameRandomness = Math.floor(Math.random() * 500) + 1;

    studentData.firstName =
      organisations[i].school_code + " firstName-" + userNameRandomness;
    studentData.lastName =
      organisations[i].school_code + " lastName-" + userNameRandomness;

    studentData.framework = {
      board: "State-" + j,
      gradeLevel: 6 - j,
    };
    studentData.device = {
      type: "phone",
      deviceID: "96102c3f-2c22-4614-8dcc-6b130cefe586",
    };
    allStudents.push({ ...studentData });
  }
}

console.log(allStudents.slice(1, 50));

module.exports = { students: allStudents };
