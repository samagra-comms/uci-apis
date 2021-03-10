// import app from '../../app'

process.env.NODE_ENV = "test";

const app = require("../../app");
const envVariables = require("../../envVariables");
const chai = require("chai");
const nock = require("nock");
const moment = require("moment");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
chai.use(require("chai-sorted"));
const _ = require("lodash");

const programData = require("../testData/program.json");
const dummyData = require("../testData/dummyData");

// const host = 'http://localhost:5000'
const BASE_URL = "/program/v1";

// eslint-disable-next-line no-undef
describe("Program Service", () => {
  let programId;
  let programId2;

  beforeEach(() => {
    nock(envVariables.OPENSABER_SERVICE_URL)
      .post("/search", dummyData.regUserSearch)
      .reply(200, {
        result: {
          User: [{ name: "sumi", userId: dummyData.nominationAdd.user_id }],
        },
      });

    nock(envVariables.OPENSABER_SERVICE_URL)
      .post("/search", dummyData.regOrgSearch)
      .reply(200, {
        result: {
          Org: [
            {
              name: "contributingOrg ABC",
              osid: dummyData.nominationAdd.organisation_id,
            },
          ],
        },
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET all programs", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            status: "Live",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        if (!err) {
          expect(res.body.result).to.have.property("programs");
          expect(res.body.result.programs).to.be.a("array");
        }
        expect(res.status).to.equal(200);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should create a programs", (done) => {
    const program = { request: programData };
    chai
      .request(app)
      .post(BASE_URL + "/create")
      .set("Accept", "application/json")
      .send(program)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("program_id");
        programId = res.body.result.program_id;
        done();
      });
  });

  it("it should also create a programs even if rootOrgId is not sent", (done) => {
    const program = { request: programData };
    delete program.request.rootorg_id;
    chai
      .request(app)
      .post(BASE_URL + "/create")
      .set("Accept", "application/json")
      .send(program)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("program_id");
        programId2 = res.body.result.program_id;
        done();
      });
  });

  _.forEach(dummyData.mandatoryFieldsProgramCreate, (field) => {
    // eslint-disable-next-line no-undef
    /*
    it(`it should not create a program if ${field} is not sent`, (done) => {
      const reqData = JSON.stringify(programData)
      const program = { request: JSON.parse(reqData) }
      delete program.request[field]
      chai.request(app)
        .post(BASE_URL + '/create')
        .set('Accept', 'application/json')
        .send(program)
        // eslint-disable-next-line handle-callback-err
        .end((err, res) => {
          expect(res.status).to.equal(400)
          done()
        })
    })*/
  });

  // eslint-disable-next-line no-undef
  it("it should get program", (done) => {
    chai
      .request(app)
      .get(BASE_URL + "/read/" + programId)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should update a program", (done) => {
    const programUpdate = { request: dummyData.programUpdate };
    programUpdate.request.program_id = programId;
    chai
      .request(app)
      .post(BASE_URL + "/update")
      .set("Accept", "application/json")
      .send(programUpdate)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        if (!programId) {
          expect(res.status).to.equal(400);
        } else {
          expect(res.status).to.equal(200);
        }
        done();
      });
  });

  _.forEach(dummyData.mandatoryFieldsProgramUpdate, (field) => {
    // eslint-disable-next-line no-undef
    it(`it should not update a program if ${field} is missing`, (done) => {
      const reqData = JSON.stringify(dummyData.programUpdate);
      const programUpdate = { request: JSON.parse(reqData) };
      programUpdate.request.program_id = programId;
      delete programUpdate.request[field];
      chai
        .request(app)
        .post(BASE_URL + "/update")
        .set("Accept", "application/json")
        .send(programUpdate)
        // eslint-disable-next-line handle-callback-err
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  it("it should add a nomination", (done) => {
    const nominationAdd = { request: dummyData.nominationAdd };
    nominationAdd.request.program_id = programId;
    chai
      .request(app)
      .post(BASE_URL + "/nomination/add")
      .set("Accept", "application/json")
      .send(nominationAdd)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("it should add a nomination with different programId and same user_id", (done) => {
    const nominationAdd = { request: dummyData.nominationAdd };
    nominationAdd.request.program_id = programId2;
    chai
      .request(app)
      .post(BASE_URL + "/nomination/add")
      .set("Accept", "application/json")
      .send(nominationAdd)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  _.forEach(dummyData.mandatoryFieldsNominationAdd, (field) => {
    // eslint-disable-next-line no-undef
    it(`it should not add a nomination if ${field} is missing`, (done) => {
      const reqData = JSON.stringify(dummyData.nominationAdd);
      const nominationAdd = { request: JSON.parse(reqData) };
      nominationAdd.request.program_id = programId;
      delete nominationAdd.request[field];
      chai
        .request(app)
        .post(BASE_URL + "/nomination/add")
        .set("Accept", "application/json")
        .send(nominationAdd)
        // eslint-disable-next-line handle-callback-err
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  it("it should update a nomination", (done) => {
    const nominationUpdate = { request: dummyData.nominationUpdate };
    nominationUpdate.request.program_id = programId;
    chai
      .request(app)
      .post(BASE_URL + "/nomination/update")
      .set("Accept", "application/json")
      .send(nominationUpdate)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  _.forEach(dummyData.mandatoryFieldsNominationUpdate, (field) => {
    // eslint-disable-next-line no-undef
    it(`it should not update a nomination if ${field} is missing`, (done) => {
      const reqData = JSON.stringify(dummyData.nominationUpdate);
      const nominationUpdate = { request: JSON.parse(reqData) };
      nominationUpdate.request.program_id = programId;
      delete nominationUpdate.request[field];
      chai
        .request(app)
        .post(BASE_URL + "/nomination/update")
        .set("Accept", "application/json")
        .send(nominationUpdate)
        // eslint-disable-next-line handle-callback-err
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  it("it should list nominations", (done) => {
    const nominationList = { request: { filters: { program_id: programId } } };
    chai
      .request(app)
      .post(BASE_URL + "/nomination/list")
      .set("Accept", "application/json")
      .send(nominationList)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.be.a("array");
        expect(res.body.result[0]).to.have.property("userData");
        expect(res.body.result[0]).to.have.property("orgData");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should list nominations with facets", (done) => {
    const nominationList = {
      request: {
        filters: { user_id: dummyData.nominationAdd.user_id },
        facets: ["status"],
      },
    };
    chai
      .request(app)
      .post(BASE_URL + "/nomination/list")
      .set("Accept", "application/json")
      .send(nominationList)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.be.a("array");
        expect(res.body.result[0]).to.have.property("status");
        expect(res.body.result[0]).to.have.property("count");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should list nominations with limit = 0", (done) => {
    const nominationList = {
      request: { fields: ["status", "content_types"], limit: 0 },
    };
    chai
      .request(app)
      .post(BASE_URL + "/nomination/list")
      .set("Accept", "application/json")
      .send(nominationList)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result.nomination).to.have.property("count");
        expect(res.body.result.nomination).to.have.property("fields");
        expect(_.find(res.body.result.nomination.fields, { name: "status" })).to
          .not.be.undefined;
        expect(
          _.find(res.body.result.nomination.fields, { name: "content_types" })
        ).to.have.property("count");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET all programs with enrolledId in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            enrolled_id: {
              user_id: dummyData.nominationAdd.user_id,
            },
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        expect(res.body.result.programs[0]).to.have.property("program");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET all programs with enrolledId in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            role: ["REVIEWER"],
            user_id: dummyData.nominationAdd.user_id,
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with status in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            status: ["Live"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        if (res.body.result.programs.length) {
          expect(res.body.result.programs.map((e) => e.status)).to.include(
            "Live"
          );
        }
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with medium in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            medium: ["English"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(JSON.parse(val.medium)).to.include.members(["English"]);
        });
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with gradeLevel in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            gradeLevel: ["Class 1"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(JSON.parse(val.gradeLevel)).to.include.members(["Class 1"]);
        });
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with subject in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            subject: ["Mathematics"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(JSON.parse(val.subject)).to.include.members(["Mathematics"]);
        });
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with content_types in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            content_types: ["FocusSpot"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(val.content_types).to.include.members(["FocusSpot"]);
        });
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("it should GET programs with nomination date in request", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            nomination_enddate: "open",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(val).to.have.property("nomination_enddate");
          expect(new Date(val.nomination_enddate)).to.be.gte(
            new Date(moment())
          );
        });
        done();
      });
  });

  it("it should GET nomination closed programs", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            nomination_enddate: "closed",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(val).to.have.property("nomination_enddate");
          expect(new Date(val.nomination_enddate)).to.be.lt(new Date(moment()));
        });
        done();
      });
  });

  it("it should GET contribution open programs", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            content_submission_enddate: "open",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(val).to.have.property("content_submission_enddate");
          expect(new Date(val.content_submission_enddate)).to.be.gte(
            new Date(moment())
          );
        });
        done();
      });
  });

  it("it should GET contribution closed programs", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            content_submission_enddate: "closed",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((val) => {
          expect(val).to.have.property("content_submission_enddate");
          expect(new Date(val.content_submission_enddate)).to.be.lt(
            new Date(moment())
          );
        });
        done();
      });
  });

  it("it should GET data for individual contributor", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {
            enrolled_id: {
              user_id: "cca53828-8111-4d71-9c45-40e569f13bad",
            },
            status: ["Live"],
            medium: ["English"],
            content_types: ["TeachingMethod"],
            nomination_enddate: "open",
            content_submission_enddate: "open",
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result).to.have.property("count");
        expect(res.body.result.programs).to.be.a("array");
        if (res.body.result.programs.length) {
          expect(
            res.body.result.programs.map((e) => e.program.status)
          ).to.include("Live");
        }
        res.body.result.programs.forEach((val) => {
          expect(val.user_id).to.be.equal(
            "cca53828-8111-4d71-9c45-40e569f13bad"
          );
          expect(JSON.parse(val.program.medium)).to.have.include.members([
            "English",
          ]);
          expect(val.program.content_types).to.have.include.members([
            "TeachingMethod",
          ]);
          expect(new Date(val.program.nomination_enddate)).to.be.gte(
            new Date(moment())
          );
          expect(new Date(val.program.content_submission_enddate)).to.be.gte(
            new Date(moment())
          );
        });
        done();
      });
  });

  // eslint-disable-next-line no-undef
  /*
  it('it should get contentTypes', (done) => {
    chai.request(app)
      .get(BASE_URL + '/contenttypes/list')
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('contentType');
        expect(res.body.result.contentType).to.be.a('array');
        if (res.body.result.contentType.length) {
          expect(res.body.result.contentType[0]).to.have.property('name');
          expect(res.body.result.contentType[0]).to.have.property('value');
        }
        done()
      })
  })*/

  // eslint-disable-next-line no-undef
  /*
  it('it should search configuration with key', (done) => {
    chai.request(app)
      .post(BASE_URL + '/configuration/search')
      .set('Accept', 'application/json')
      .send({request: {key: 'contentVideoSize', status: 'active'}})
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('configuration');
        expect(res.body.result.configuration).to.have.property('value');
        done()
      })
  })
  */
  // eslint-disable-next-line no-undef
  it("it should not get program details", (done) => {
    const programDetails = {
      request: { filters: { program_id: [programId2] } },
    };
    dummyData.getCollectionWithProgramId.request.filters.programId = programId2;
    dummyData.getSampleContentWithOrgId.request.filters.programId = programId2;
    dummyData.getSampleContentWithCreatedBy.request.filters.programId = programId2;
    dummyData.getContributionWithProgramId.request.filters.programId = programId2;
    nock(envVariables.baseURL)
      .post("/api/composite/v1/search", dummyData.getCollectionWithProgramId)
      .reply(400, dummyData.resultsGetCollectionWithProgramId);

    nock(envVariables.baseURL)
      .post("/api/composite/v1/search", dummyData.getSampleContentWithOrgId)
      .reply(200, dummyData.resultsGetSampleContentWithOrgId);

    nock(envVariables.baseURL)
      .post("/api/composite/v1/search", dummyData.getSampleContentWithCreatedBy)
      .reply(200, dummyData.resultsGetSampleContentWithCreatedBy);

    nock(envVariables.baseURL)
      .post("/api/composite/v1/search", dummyData.getContributionWithProgramId)
      .reply(200, dummyData.resultGetContributionWithProgramId);
    chai
      .request(app)
      .post(BASE_URL + "/list/download")
      .set("Accept", "application/json")
      .send(programDetails)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  /*
  it('it should get program details', (done) => {
    const programDetails = {request: {filters: {program_id: [programId2]}} }
    dummyData.getCollectionWithProgramId.request.filters.programId = programId2;
    dummyData.getSampleContentWithOrgId.request.filters.programId = programId2;
    dummyData.getSampleContentWithCreatedBy.request.filters.programId = programId2;
    dummyData.getContributionWithProgramId.request.filters.programId = programId2;
    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getCollectionWithProgramId)
    .reply(200, dummyData.resultsGetCollectionWithProgramId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithOrgId)
    .reply(200, dummyData.resultsGetSampleContentWithOrgId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithCreatedBy)
    .reply(200, dummyData.resultsGetSampleContentWithCreatedBy )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getContributionWithProgramId)
    .reply(200, dummyData.resultGetContributionWithProgramId )
    chai.request(app)
      .post(BASE_URL + '/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('tableData');
        expect(res.body.result.tableData.length).to.equal(1);
        expect(_.keys(res.body.result.tableData[0].values[0]).length).to.equal(13) // bez of some mandatory properties
        done()
      })
  })

  // eslint-disable-next-line no-undef
  it('it should get program details from cache', (done) => {
    const programDetails = {request: {filters: {program_id: [programId2]}} }
    dummyData.getCollectionWithProgramId.request.filters.programId = programId2;
    dummyData.getSampleContentWithOrgId.request.filters.programId = programId2;
    dummyData.getSampleContentWithCreatedBy.request.filters.programId = programId2;
    dummyData.getContributionWithProgramId.request.filters.programId = programId2;
    chai.request(app)
      .post(BASE_URL + '/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('tableData');
        expect(res.body.result.tableData.length).to.equal(1);
        expect(_.keys(res.body.result.tableData[0].values[0]).length).to.equal(13) // bez of some mandatory properties
        done()
      })
  })

  it('it should exclude sample counts whose nomination is in initiated status', (done) => {
    const programDetails = {request: {filters: {program_id: [programId2]}} }
    dummyData.getCollectionWithProgramId.request.filters.programId = programId2;
    dummyData.getSampleContentWithOrgId.request.filters.programId = programId2;
    dummyData.getSampleContentWithCreatedBy.request.filters.programId = programId2;
    dummyData.getContributionWithProgramId.request.filters.programId = programId2;
    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getCollectionWithProgramId)
    .reply(200, dummyData.resultsGetCollectionWithProgramId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithOrgId)
    .reply(200, dummyData.resultsGetSampleContentWithOrgId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithCreatedBy)
    .reply(200, dummyData.resultsGetSampleContentWithCreatedBy )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getContributionWithProgramId)
    .reply(200, dummyData.resultGetContributionWithProgramId )
    chai.request(app)
      .post(BASE_URL + '/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(_.get(res.body.result.tableData[0].values[0], 'Samples Received')).to.equal(1) // (Total - samples under Initiated state) = (3 - 2)
        done()
      })
  });

  it('it should return total sample counts if there is no samples under initiated status', (done) => {
    const programDetails = {request: {filters: {program_id: [programId]}} }
    dummyData.getCollectionWithProgramId.request.filters.programId = programId;
    dummyData.getSampleContentWithOrgId.request.filters.programId = programId;
    dummyData.getSampleContentWithCreatedBy.request.filters.programId = programId;
    dummyData.getContributionWithProgramId.request.filters.programId = programId;
    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getCollectionWithProgramId)
    .reply(200, dummyData.resultsGetCollectionWithProgramId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithOrgId)
    .reply(200, dummyData.resultsGetSampleContentWithOrgId )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getSampleContentWithCreatedBy)
    .reply(200, dummyData.resultsGetSampleContentWithOrgId_01 )

    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.getContributionWithProgramId)
    .reply(200, dummyData.resultGetContributionWithProgramId )
    chai.request(app)
      .post(BASE_URL + '/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(_.get(res.body.result.tableData[0].values[0], 'Samples Received')).to.equal(3) // (Total - samples under Initiated state) = (3 - 0)
        done()
      })
  });
  */
  // eslint-disable-next-line no-undef
  it("it should not download nomination list details", (done) => {
    const programDetails = {
      request: {
        filters: {
          program_id: programId,
          program_name: "Test case",
          status: "Pending",
        },
      },
    };
    dummyData.searchSampleContents.request.filters.programId = programId;
    _.forEach(
      dummyData.resultSearchSampleContents.result.content,
      (con) => (con.programId = programId)
    );
    nock(envVariables.baseURL)
      .post("/api/composite/v1/search", dummyData.searchSampleContents)
      .reply(400, { error: "Something went wrong" });

    chai
      .request(app)
      .post(BASE_URL + "/nomination/list/download")
      .set("Accept", "application/json")
      .send(programDetails)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  /*
  // eslint-disable-next-line no-undef
  it('it should download nomination list details', (done) => {
    const programDetails = {request: {filters: {program_id: programId, program_name: 'Test case', status: 'Pending'}} }
    dummyData.searchSampleContents.request.filters.programId = programId;
    _.forEach(dummyData.resultSearchSampleContents.result.content, con => con.programId = programId);
    nock(envVariables.baseURL)
    .post('/api/composite/v1/search', dummyData.searchSampleContents)
    .reply(200, dummyData.resultSearchSampleContents )

    chai.request(app)
      .post(BASE_URL + '/nomination/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('stats');
        expect(res.body.result.stats).to.be.a('array');
        expect(_.keys(res.body.result.stats[0]).length).to.equal(7) // bez of some mandatory properties
        expect(res.body.result.stats[0].sample).to.equal(2);
        done()
      })
  })

  // eslint-disable-next-line no-undef
  it('it should download nomination list details from cache', (done) => {
    const programDetails = {request: {filters: {program_id: programId, program_name: 'Test case', status: 'Pending'}} }
    dummyData.searchSampleContents.request.filters.programId = programId;
    _.forEach(dummyData.resultSearchSampleContents.result.content, con => con.programId = programId);
    // nock(envVariables.baseURL)
    // .post('/api/composite/v1/search', dummyData.searchSampleContents)
    // .reply(400, {error: 'Something went wrong'} )

    chai.request(app)
      .post(BASE_URL + '/nomination/list/download')
      .set('Accept', 'application/json')
      .send(programDetails)
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.result).to.have.property('stats');
        expect(res.body.result.stats).to.be.a('array');
        expect(_.keys(res.body.result.stats[0]).length).to.equal(7) // bez of some mandatory properties
        expect(res.body.result.stats[0].sample).to.equal(2);
        done()
      })
  })
  */
  it("Sort the program by medium, gradeLevel and subject", (done) => {
    chai
      .request(app)
      .post(BASE_URL + "/list")
      .set("Accept", "application/json")
      .send({
        request: {
          filters: {},
          sort: {
            medium: ["Hindi", "English"],
            gradeLevel: ["Class 10"],
            subject: ["Science", "English"],
          },
        },
      })
      // eslint-disable-next-line handle-callback-err
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.result).to.have.property("programs");
        expect(res.body.result.programs).to.be.a("array");
        res.body.result.programs.forEach((program) => {
          expect(program).to.have.property("matchCount");
        });

        if (res.body.result.programs.length) {
          expect(res.body.result.programs).to.be.sortedBy("matchCount", {
            descending: true,
          });
        }
        done();
      });
  });
});
