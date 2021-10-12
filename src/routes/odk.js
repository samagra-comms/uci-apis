const { Vault } = require("../helpers/vault");
var FormData = require("form-data");
const requestMiddleware = require("../middlewares/request.middleware");
const { digestAuthRequest } = require("../helpers/digestAuthRequest");
const { LocalFileData } = require("get-file-object-from-local-path");
const fetch = require("node-fetch");
const fs = require("fs");
const multer = require("multer");
var parser = require("xml2json");
const os = require("os");
const response = require("./response");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const uuid = require("uuid/v1");
const BASE_URL = "/admin/v1";
const ODK_BASE_URL = process.env.ODK_BASE_URL;
const messageUtils = require("../service/messageUtil");
const OdkMessages = messageUtils.ODK;
const programMessages = messageUtils.PROGRAM;
const errorCode = messageUtils.ERRORCODES;

async function uploadForm(req, res) {
  // const rspObj = req;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + OdkMessages.UPLOAD.EXCEPTION_CODE;
  const vault = new Vault();
  let credentials = vault.getCredentials("", { variable: "ODK" });
  credentials = {
    username: process.env.ODK_USERNAME,
    password: process.env.ODK_PASSWORD,
  };

  const ODK_FILTER_URL = `${ODK_BASE_URL}/Aggregate.html#submissions/filter///`;
  const ODK_FORM_UPLOAD_URL = `${ODK_BASE_URL}/formUpload`;

  var getRequest = new digestAuthRequest(
    "GET",
    ODK_FILTER_URL,
    credentials.username,
    credentials.password
  );
  getRequest.request(
    function (data) {
      //console.log("req:",rspObj)
      var formData = new FormData();
      const file = fs.createReadStream(req.file.path);
      formData.append("form_def_file", file, req.file.originalname);

      var requestOptions = {
        method: "POST",
        headers: {
          Cookie: data.cookie,
        },
        body: formData,
      };

      fetch(ODK_FORM_UPLOAD_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result.includes("Successful form upload.")) {
            fetch(process.env.TRANSFORMER_BASE_URL);
            fs.readFile(req.file.path, (error, data) => {
              if (error) {
                response.sendErrorRes(
                  req,
                  res,
                  OdkMessages.UPLOAD.FAIL_CODE,
                  errorCode,
                  OdkMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
                  error,
                  errCode
                );
              }
              const formDef = JSON.parse(parser.toJson(data.toString()));
              let formID = "";
              try {
                formID = formDef["h:html"]["h:head"].model.instance.data.id;
                response.sendSuccessRes(req, formID, res);
              } catch (e) {
                response.sendErrorRes(
                  req,
                  res,
                  OdkMessages.UPLOAD.EXCEPTION_CODE,
                  errorCode,
                  OdkMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
                  e.message,
                  errCode
                );
              }
            });
          } else {
            console.log("Form Uploaded Failed");
            console.log(result);
            response.sendErrorRes(
              req,
              res,
              OdkMessages.UPLOAD.FAIL_CODE,
              errorCode,
              OdkMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
              "Form Uploaded Failed",
              errCode
            );
          }
        })
        .catch((error) => {
          console.log("error", error);
          response.sendErrorRes(
            req,
            res,
            OdkMessages.UPLOAD.EXCEPTION_CODE,
            errorCode,
            OdkMessages.UPLOAD.UPLOAD_FAIL_MESSAGE,
            error,
            errCode
          );
        });
    },
    function (errorCode) {
      res.status(400).send({
        status: "Error in uploading Form" + error,
      });
    }
  );
}

module.exports = function (app) {
  app.route(BASE_URL + "/forms/upload").post(upload.single("form"), uploadForm);
};
