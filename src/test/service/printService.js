process.env.NODE_ENV = "test";

const envVariables = require("../../envVariables");
const chai = require("chai");
const nock = require("nock");
const moment = require("moment");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
chai.use(require("chai-sorted"));
chai.use(require("chai-match"));
const _ = require("lodash");

const programData = require("../testData/program.json");
const dummyData = require("../testData/dummyData");

const BASE_URL = "/program/v1";
var rewire = require("rewire");
const { getData } = require("../../service/print/dataImporter");
const dataImporter = rewire("../../service/print/dataImporter.js");
const pdf = rewire("../../service/print/pdf.js");

const getQuestionForSection = dataImporter.__get__("getQuestionForSection");
const getItemsFromItemset = dataImporter.__get__("getItemsFromItemset");
const getQuestionFromItem = dataImporter.__get__("getQuestionFromItem");

var cheerio = require("cheerio");
var cheerioTableparser = require("cheerio-tableparser");

// eslint-disable-next-line no-undef
describe("Print Service", () => {
  it("[Integration test] should output error for wrong heirarchy ID", (done) => {
    getQuestionForSection("test").then((res) => {
      expect(res.error).to.equal(true);
      expect(res.errorMsg).to.equal(
        "Invalid Response for Hierarchy ID :: test"
      );
      done();
    });
  });

  it("[Integration test] should respond with question data for correct ID", (done) => {
    getQuestionForSection("do_1132132525993082881105")
      .then((response) => {
        expect(response).to.not.be.undefined;
        expect(response.itemType).to.equal("UNIT");
        expect(response).to.have.property("itemType");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] should get Items from itemset for correct itemset ID", (done) => {
    getItemsFromItemset("do_113213256596070400127")
      .then((response) => {
        expect(response).to.not.be.undefined;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] should throw PDFDataImportError from itemset for incorrect itemset ID", (done) => {
    getItemsFromItemset("any")
      .then((response) => {
        expect(response).to.not.be.undefined;
      })
      .catch((e) => {
        expect(e.name).to.equal("PDFDataImportError");
        expect(e.message).to.equal("Invalid Response for Itemset ID :: any");
        done();
      });
  });

  it("[Integration test] should throw PDFDataImportError for incorrect item ID", (done) => {
    getQuestionFromItem("any")
      .then((response) => {
        done();
      })
      .catch((e) => {
        expect(e.name).to.equal("PDFDataImportError");
        expect(e.message).to.equal("Invalid Response for Question ID :: any");
        done();
      });
  });

  it("[Integration test] should return Question Object for correct item ID", (done) => {
    getQuestionFromItem("do_1132132526040596481722")
      .then((response) => {
        expect(response).to.not.be.undefined;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] should getData for correct DO ID", (done) => {
    dataImporter
      .getData("do_113213251762339840191")
      .then((response) => {
        expect(response).to.not.be.undefined;
        expect(response).to.have.property("paperData");
        expect(response).to.have.property("sectionData");
        expect(response.sectionData).to.be.an("Array");
        expect(response.sectionData[0].questions).to.be.an("Array");
        expect(response.sectionData[0].section).to.be.an("Object");
        expect(response).to.have.property("error");
        expect(response.error).to.be.false;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("[Integration test] should return a PDF for correct Hierarchy ID", (done) => {
    pdf.buildPDFWithCallback(
      "do_113213251762339840191",
      (base64PDF, error, errorMsg) => {
        expect(error).to.be.false;
        expect(errorMsg).to.equal("");
        done();
      }
    );
  });

  it("[Integration test] should return a an error for incorrect Hierarchy ID", (done) => {
    pdf.buildPDFWithCallback("any", (base64PDF, error, errorMsg) => {
      expect(error).to.be.true;
      expect(errorMsg).to.equal("Invalid ID");
      done();
    });
  });

  it("[Integration test] should return and error for incorrect Hierarchy ID", (done) => {
    getQuestionFromItem("do_1132132526040596481722")
      .then((response) => {
        expect(response).to.not.be.undefined;
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("Should parse table", (done) => {
    const table = `<p>Match the following:</p><figure class="table"><table><tbody><tr><td><strong>Column 1</strong></td><td><strong>Column 2</strong></td></tr><tr><td>1</td><td>1</td></tr></tbody></table></figure>`;
    $ = cheerio.load(table);
    cheerioTableparser($);
    var data = [];
    var columns = $("table").parsetable(false, false, false);
    const transposeColumns = columns[0].map((_, colIndex) =>
      columns.map((row) => row[colIndex])
    );
    const heading = $("p").text();

    console.log(heading);
    done();
  });
});
