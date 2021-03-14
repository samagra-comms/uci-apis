const env = require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
path = require("path");
http = require("http");
indexRouter = require("./routes/index");
(cookieParser = require("cookie-parser")),
  (logger = require("morgan")),
  (bodyParser = require("body-parser")),
  (envVariables = require("./envVariables")),
  (port = envVariables.port);
const telemetryService = require("./service/telemetryService");
const sb_logger = require("sb_logger_util_v2");
const logLevel = process.env.sunbird_service_log_level || "info";
var logFilePath = path.join(__dirname, "./logs/microservice.log");
const KafkaService = require("./helpers/kafkaUtil");
const knexInitializer = require("./models/init");
const { Transformer } = require("./models/transformer");
const { router } = require("bull-board");

const createAppServer = () => {
  const app = express();

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,PATCH,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization," +
        "cid, user-id, x-auth, Cache-Control, X-Requested-With, datatype, *"
    );
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
  });
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/admin/queues", router);
  app.use("/", indexRouter);
  require("./routes/transformer")(app);
  require("./routes/userSegment")(app);
  require("./routes/adapter")(app);
  require("./routes/conversationLogic")(app);
  require("./routes/bot")(app);
  app.use(cookieParser());
  module.exports = app;
  return app;
};
sb_logger.init({
  path: logFilePath,
  logLevel,
});

const app = createAppServer();

app.listen(port, async () => {
  console.log(
    `program-service is running in test env on port ${port} with ${process.pid} pid`
  );
  telemetryService.initializeTelemetryService();
});
