try {
  const { Queue, Worker } = require("bullmq");
  const { setQueues, BullMQAdapter, BullAdapter } = require("bull-board");
  const fetch = require("node-fetch");
  var xml2js = require("xml2js");
  const Redis = require("ioredis");
  const AbortController = require("abort-controller");

  const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  };

  const workerConfig = {
    connection,
    concurrency: 1,
  };

  const queueConfig = {
    connection,
  };

  const queueID = "queue";
  const queue = new Queue(queueID, queueConfig);
  const resultQueue = new Queue("resultQueue", queueConfig);

  setQueues([new BullAdapter(queue), new BullAdapter(resultQueue)]);

  const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
    const controller = new AbortController();
    const promise = fetch(url, { signal: controller.signal, ...options });
    if (signal) signal.addEventListener("abort", () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return promise.finally(() => clearTimeout(timeout));
  };

  const worker = new Worker(
    queueID,
    async (job) => {
      if (job.name === "test") {
        console.log("Scheduler DB Status: ✅");
        console.log("Scheduler Status: ✅");
      } else {
        if (job.name === "rest-service") {
          // Rest Service Resolver
          // User Service Resolver {getAllUsers, getUserByID, getUserByPhone}
          // GraphQL resolver
          // FusionAuth resolver

          const r = job.data.data.trim().substring(1, job.data.data.length - 1);
          const service = job.data.service;
          let serviceHeaders = {};
          try {
            serviceHeaders = service.config.credentials.headers;
          } catch (e) {}
          const headers = {
            "Content-Type": "application/json",
            ...serviceHeaders,
          };
          const timeoutInSeconds = service.cadence.timeout;
          const controller = new AbortController();

          var requestOptions = {
            method: "POST",
            signal: controller.signal,
            headers,
            body: JSON.stringify({
              data: r,
            }),
            redirect: "follow",
          };
          let response = await fetchTimeout(
            service.config.url,
            timeoutInSeconds * 1000,
            requestOptions
          )
            .then(async (response) => response.json())
            .then((response) => response.data)
            .then((response) => response.replace(/\\\\"/g, /\\"/))
            .then((response) => response.replace(/\\n/g, ""))
            .then(async (response) => {
              return xml2js
                .parseStringPromise(response)
                .then(function (result) {
                  return result;
                })
                .catch(function (err) {
                  console.log(err);
                  return undefined;
                });
            })
            .catch((error) => {
              console.log("error", error);
              if (error.name === "AbortError") {
                // fetch aborted either due to timeout or due to user clicking the cancel button
                throw new Error("Cadence Failure");
              } else {
                throw new Error("Network/Parsing Failure");
              }
            });

          //Push to next transformer
          resultQueue.add("push", {
            xMessage: response,
            sendRecord: job.data.sendRecord,
            kafka: job.data.kafka,
          });
        }
      }
    },
    workerConfig
  );

  const getNextTranformer = (r) => {
    return "outbound";
  };

  const pushWorker = new Worker(
    "resultQueue",
    async (job) => {
      try {
        if (job.name === "push") {
          let xMessage = job.data.xMessage;

          console.log(xMessage);
          const nextTransformer = getNextTranformer(xMessage);
          // xMessage.transformers.shift();
          var builder = new xml2js.Builder();
          var stringResponse = builder.buildObject(xMessage);

          const data = {
            topic: nextTransformer,
            messages: [
              {
                value: JSON.stringify(stringResponse),
                headers: { __TypeId__: "java.lang.String" },
              },
            ],
            kafka: job.data.kafka,
          };

          const { Kafka } = require("kafkajs");
          let kafka;
          if (process.env.ENV === "dev") {
            kafka = new Kafka({
              clientId: "api",
              brokers: [`${process.env.KAFKA_HOST}`],
            });
          } else {
            const brokers = process.env.KAFKA_HOST.split(",").map(
              (s) => s + ":" + process.env.KAFKA_PORT
            );
            console.log(`Trying to connect to ${brokers}`);
            kafka = new Kafka({
              clientId: "api",
              brokers: brokers,
            });
          }

          const producer = kafka.producer();
          await producer.connect();
          await producer.send(data);

          // job.data.sendRecord(data, (error, result) => {});
          console.log("Pushing to kafka again", data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    workerConfig
  );

  queue.add("test", {});
  // queue.add("rest-service", {
  //   transformer: [
  //     {
  //       name: "PassThrough",
  //       id: "02f010b8-29ce-41e5-be3c-798536a2818b",
  //       service: "3fb0e35f-46dc-44cf-95cc-43d1df1c9a11",
  //     },
  //   ],
  //   service: {
  //     id: "3fb0e35f-46dc-44cf-95cc-43d1df1c9a11",
  //     type: "rest-service",
  //     config: {
  //       url: "http://localhost:8888",
  //     },
  //     cadence: {
  //       retries: 0,
  //       timeout: 60,
  //       concurrent: true,
  //       "retries-interval": 10,
  //     },
  //   },
  //   data: '"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\" standalone=\\"yes\\"?>\\n<xMessage>\\n    <app>Sam-Bitly [B-TC]</app>\\n    <channel>WhatsApp</channel>\\n    <channelURI>WhatsApp</channelURI>\\n    <conversationStage>\\n        <stage>0</stage>\\n        <state>STARTING</state>\\n    </conversationStage>\\n    <from>\\n        <bot>false</bot>\\n        <broadcast>false</broadcast>\\n        <meta>\\n            <entry>\\n                <key>senderID</key>\\n                <value>HPGOVT</value>\\n            </entry>\\n        </meta>\\n        <userID>hpgovt-hpssa</userID>\\n    </from>\\n    <messageState>NOT_SENT</messageState>\\n    <messageType>HSM_WITH_BUTTON</messageType>\\n    <payload>\\n        <text>नमस्कार प्रिय शिक्षा अधिकारी, \\n\\nविद्यालय शिक्षा विभाग के *समीक्षा ऐप* पर आवशयक सूचना I\\n\\nपिछ्ले हफ्ते आपके स्कूल / खंड के कई स्कूलों में *Attendance और Temperature रिकॉर्डिंग के लिए अनुपालन कम था* I\\n\\nरिपोर्ट देखने के लिए नीचे दिए गए नीले बटन *Hi SamikshaBot* पर क्लिक करें ।</text>\\n    </payload>\\n    <provider>gupshup</provider>\\n    <providerURI>gupshup</providerURI>\\n    <timestamp>1615423372987</timestamp>\\n    <to>\\n        <bot>false</bot>\\n        <broadcast>false</broadcast>\\n        <groups>82c95b41-22e5-445c-b5ff-1d383bc8a7df</groups>\\n        <userID>9415787824</userID>\\n    </to>\\n    <transformers>\\n        <id>1</id>\\n    </transformers>\\n</xMessage>\\n"',
  // });

  worker.on("completed", (job, returnvalue) => {});

  worker.on("progress", (job, progress) => {});

  worker.on("failed", (job, failedReason) => {
    console.log(failedReason);
  });

  worker.connection.on("error", onError());
  worker.connection.on("exit", onError());
  queue.connection.on("error", onError());
  resultQueue.connection.on("error", onError());
  pushWorker.connection.on("error", onError());

  module.exports = {
    queue,
  };
  function onError() {
    return (error) => {
      console.log("Got an error");
    };
  }
} catch (e) {
  console.log(e.stack);
}
