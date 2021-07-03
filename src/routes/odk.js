const { Vault } = require("../helpers/vault");
var FormData = require("form-data");
const requestMiddleware = require("../middlewares/request.middleware");
const { digestAuthRequest } = require("../helpers/digestAuthRequest");
const { LocalFileData } = require("get-file-object-from-local-path");
const fetch = require("node-fetch");
const fs = require("fs");
const multer = require("multer");
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

// const Blob = require("cross-blob");

const BASE_URL = "/admin/v1";
const ODK_URL =
  "https://agg.staging.saksham.samagra.io/Aggregate.html#submissions/filter///";

async function uploadForm(req, res) {
  const vault = new Vault();
  const credentials = vault.getCredentials("", { variable: "ODK" });

  var options = {
    uri: ODK_URL,
    auth: {
      user: credentials.username,
      pass: credentials.password,
      sendImmediately: false,
    },
  };
  var getRequest = new digestAuthRequest(
    "GET",
    ODK_URL,
    credentials.username,
    credentials.password
  );
  getRequest.request(
    function (data) {
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

      fetch("https://agg.staging.saksham.samagra.io/formUpload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result.includes("Successful form upload.")) {
            res.send({
              status: "Successfully Uploaded Form",
            });
          } else {
            res.send({
              status: "Error in uploading Form - Contact Admin",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          res.send({
            status: "Error in uploading Form" + error,
          });
        });
    },
    function (errorCode) {
      // error callback
      // tell user request failed
    }
  );
}

module.exports = function (app) {
  app.route(BASE_URL + "/forms/upload").post(
    // requestMiddleware.gzipCompression(),
    // requestMiddleware.createAndValidateRequestBody,
    upload.single("form"),
    uploadForm
  );
};
