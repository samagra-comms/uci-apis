const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
chai.use(require("chai-sorted"));
chai.use(require("chai-match"));
const { DeviceManager } = require("../../helpers/userSegment/deviceManager");

describe("Device Manager", () => {
  it("[Encryption Test] Testing encryption and Decryption", (done) => {
    const dm = new DeviceManager();
    const sampleText = "abcd1234";
    const encryptedText = dm.encrypt(sampleText);
    const decryptedString = dm.decrypt(encryptedText.toString());

    expect(decryptedString).to.be.equal(sampleText);
    done();
  });
});
