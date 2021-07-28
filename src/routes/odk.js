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
const ODK_BASE_URL = "https://agg.staging.saksham.samagra.io";
const messageUtils = require("../service/messageUtil");
const OdkMessages = messageUtils.ODK;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;

async function uploadForm(req, res) {
  const rspObj = req;
  const errCode =
    programMessages.EXCEPTION_CODE + "_" + OdkMessages.UPLOAD.EXCEPTION_CODE;
  const vault = new Vault();
  const credentials = vault.getCredentials("", { variable: "ODK" });

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
                rspObj.errCode = OdkMessages.UPLOAD.FAIL_CODE;
                rspObj.errMsg = OdkMessages.UPLOAD.FAIL_MESSAGE;
                rspObj.responseCode = responseCode.CLIENT_ERROR;
                rspObj.result = {
                  error: error,
                };
                return res
                  .status(400)
                  .send(errorResponse(rspObj, errCode + errorCode.CODE1));
                // res.status(400).send({
                //   status: "Error in uploading Form - Error in parsing form",
                // });
              }
              const formDef = JSON.parse(parser.toJson(data.toString()));
              let formID = "";
              try {
                formID = formDef["h:html"]["h:head"].model.instance.data.id;
                rspObj.responseCode = responseCode.SUCCESS;
                rspObj.result = { data: formID };
                return res.status(200).send(successResponse(rspObj));

                // res.send({
                //   status: "Successfully Uploaded Form",
                //   formID,
                // });
              } catch (e) {
                rspObj.errCode = OdkMessages.UPLOAD.EXCEPTION_CODE;
                rspObj.errMsg = OdkMessages.UPLOAD.FORMID_FAIL_MESSAGE;
                rspObj.responseCode = responseCode.CLIENT_ERROR;
                rspObj.result = {
                  error: e.message,
                };
                return res
                  .status(400)
                  .send(errorResponse(rspObj, errCode + errorCode.CODE1));
                // res.status(400).send({
                //   status: "FormID could not be parsed. Please check the form",
                // });
              }
            });
          } else {
            console.log("Form Uploaded Failed");
            console.log(result);
            rspObj.errCode = OdkMessages.UPLOAD.FAIL_CODE;
            rspObj.errMsg = OdkMessages.UPLOAD.UPLOAD_FAIL_ADMIN;
            rspObj.responseCode = responseCode.CLIENT_ERROR;
            rspObj.result = {
              error: "Form Uploaded Failed",
            };
            return res
              .status(400)
              .send(errorResponse(rspObj, errCode + errorCode.CODE1));
            // res.status(400).send({
            //   status: "Error in uploading Form - Contact Admin",
            // });
          }
        })
        .catch((error) => {
          console.log("error", error);
          rspObj.errCode = OdkMessages.UPLOAD.EXCEPTION_CODE;
          rspObj.errMsg = OdkMessages.UPLOAD.UPLOAD_FAIL_MESSAGE;
          rspObj.responseCode = responseCode.CLIENT_ERROR;
          rspObj.result = {
            error: error,
          };
          return res
            .status(400)
            .send(errorResponse(rspObj, errCode + errorCode.CODE1));
          // res.status(400).send({
          //   status: "Error in uploading Form" + error,
          // });
        });
    },
    function (errorCode) {
      res.status(400).send({
        status: "Error in uploading Form" + error,
      });
    }
  );
}
function getParams(msgId, status, errCode, msg) {
  var params = {};
  params.resmsgid = uuid();
  params.msgid = msgId || null;
  params.status = status;
  params.err = errCode;
  params.errmsg = msg;

  return params;
}

function successResponse(data) {
  var response = {};
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgid, "successful", null, null);
  response.responseCode = data.responseCode || "OK";
  response.result = data.result;
  return response;
}

function errorResponse(data, errCode) {
  var response = {};
  response.id = data.apiId;
  response.ver = data.apiVersion;
  response.ts = new Date();
  response.params = getParams(data.msgId, "failed", data.errCode, data.errMsg);
  response.responseCode = errCode + "_" + data.responseCode;
  response.result = data.result;
  return response;
}

module.exports = function (app) {
  // app
  //   .route(BASE_URL + "/forms/upload")
  //   .post(
  //     requestMiddleware.gzipCompression(),
  //     requestMiddleware.createAndValidateRequestBody,
  //     upload.single("form"),
  //     uploadForm
  //   )
   app.route(BASE_URL + "/forms/upload").post(upload.single("form"), uploadForm);
};
