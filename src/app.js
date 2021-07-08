try {
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
  var proxy = require("express-http-proxy");
  const url = require("url");

  if (env.error) {
    throw env.error;
  }

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
      console.log(req.method);
      if (req.method === "OPTIONS") res.sendStatus(200);
      else next();
    });
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(logger("dev"));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/admin/queues", router);
    app.use(
      "/v1/graphql",
      proxy(`${process.env.GRAPHQL_BASE_URL}/v1/graphql`, {
        proxyReqPathResolver: (req) => {
          console.log(url.parse(req.baseUrl).path);
          return url.parse(req.baseUrl).path;
        },
      })
    );

    app.use("/", indexRouter);
    app.use(cookieParser());
    require("./routes/transformer")(app);
    require("./routes/userSegment")(app);
    require("./routes/adapter")(app);
    require("./routes/conversationLogic")(app);
    require("./routes/bot")(app);
    require("./routes/odk")(app);
    module.exports = app;
    return app;
  };
  sb_logger.init({
    path: logFilePath,
    logLevel,
  });

  const app = createAppServer();

  if (process.env.ENV === "dev") {
    const portfinder = require("portfinder");
    portfinder.basePort = 9999;
    portfinder.highestPort = 10010;
    portfinder
      .getPortPromise()
      .then((devPort) => {
        startServer(app, telemetryService, devPort);
      })
      .catch((err) => {
        console.log(err.stack);
      });
  } else {
    startServer(app, telemetryService, port);
  }
} catch (e) {
  console.log(e.stack);
}

function startServer(app, telemetryService, port) {
  app.listen(port, async () => {
    console.log(
      `Server running in ${process.env.ENV} env on port ${port} with ${process.pid} pid ✅`
    );
    telemetryService.initializeTelemetryService();
  });
}
