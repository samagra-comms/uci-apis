process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
chai.use(require("chai-sorted"));
chai.use(require("chai-match"));
const { Service } = require("../../models/service");

// eslint-disable-next-line no-undef
describe("External Service", () => {
  it("[Integration test] Verify a valid GQL service for all users", (done) => {
    let service = new Service();
    service.type = "gql";
    service.config = {
      pageParam: "page",
      cadence: {
        concurrent: true,
        pagination: false,
        perPage: 10000,
        retries: 0,
        "retries-interval": 10,
        timeout: 60,
      },
      credentials: {
        variable: "commsgql",
        vault: "samagra",
      },
      gql:
        'query getMissionPrernaUsers {users: getUsersByApplication(application: "SamagraX Testing App", limit: 2000) {id full_name mobilePhone data: jdata}}',
    };
    service
      .verify("getAllUsers")
      .then((response) => {
        expect(response).to.not.be.undefined;
        expect(response).to.have.property("status");
        expect(response).to.have.property("data");
        expect(response.data).to.have.property("users");
        expect(response.data.users).to.be.an("Array");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] Verify a valid GQL service for getUserByPhone", (done) => {
    let service = new Service();
    service.type = "gql";
    service.params = {
      phoneNo: "9415787824",
    };
    service.config = {
      cadence: {
        concurrent: true,
        pagination: false,
        perPage: 10000,
        retries: 0,
        "retries-interval": 10,
        timeout: 60,
      },
      verificationParams: {
        phoneNo: "9415787824",
      },
      credentials: {
        variable: "commsgql",
        vault: "samagra",
      },
      gql:
        "query Query($phoneNo: String) {users: getUsersByQuery(queryString: $phoneNo) {id username mobilePhone data: jdata}}",
    };
    service
      .verify("getUserByPhone")
      .then((response) => {
        expect(response).to.not.be.undefined;
        expect(response).to.have.property("status");
        expect(response).to.have.property("data");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] Verify a valid GQL service for getUserByID", (done) => {
    let service = new Service();
    service.type = "gql";
    service.params = {
      id: "f5c49bcc-b96c-4206-950e-a2ba4319f149",
    };
    service.config = {
      cadence: {
        concurrent: true,
        pagination: false,
        perPage: 10000,
        retries: 0,
        "retries-interval": 10,
        timeout: 60,
      },
      verificationParams: {
        id: "f5c49bcc-b96c-4206-950e-a2ba4319f149",
      },
      credentials: {
        variable: "commsgql",
        vault: "samagra",
      },
      gql:
        "query Query($id: String) {users: getUsersByQuery(queryString: $id) {id username mobilePhone data: jdata}}",
    };
    service
      .verify("getUserByID")
      .then((response) => {
        expect(response).to.not.be.undefined;
        expect(response).to.have.property("status");
        expect(response).to.have.property("data");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
