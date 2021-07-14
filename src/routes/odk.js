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

const BASE_URL = "/admin/v1";
const ODK_BASE_URL = "https://agg.staging.saksham.samagra.io";

async function uploadForm(req, res) {
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
                res.status(400).send({
                  status: "Error in uploading Form - Error in parsing form",
                });
              }
              const formDef = JSON.parse(parser.toJson(data.toString()));
              let formID = "";
              try {
                formID = formDef["h:html"]["h:head"].model.instance.data.id;
                res.send({
                  status: "Successfully Uploaded Form",
                  formID,
                });
              } catch (e) {
                res.status(400).send({
                  status: "FormID could not be parsed. Please check the form",
                });
              }
            });
          } else {
            console.log("Form Uploaded Failed");
            console.log(result);
            res.status(400).send({
              status: "Error in uploading Form - Contact Admin",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          res.status(400).send({
            status: "Error in uploading Form" + error,
          });
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
