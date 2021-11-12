"use strict";

const { Model } = require("objection");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const encodedBase64Key = process.env.ENCRYPTION_KEY;
const parsedBase64Key = CryptoJS.enc.Base64.parse(encodedBase64Key);

class Vault extends Model {
  static get tableName() {
    return "vault";
  }

  static encrypt = (plainString) => {
    const encryptedString = AES.encrypt(plainString, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
    });
    return encryptedString;
  };

  static decrypt = (encryptedString) => {
    const plainString = AES.decrypt(encryptedString, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8);
    return plainString;
  };

  static getEncrypted(data) {
    return this.encrypt(data);
  }

  static getPlainText(data) {
    return this.decrypt(data);
  }
}

module.exports = {
  Vault,
};
