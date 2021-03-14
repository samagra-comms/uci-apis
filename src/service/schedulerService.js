const { Queue, Worker } = require("bullmq");
const { setQueues, BullMQAdapter, BullAdapter } = require("bull-board");
const fetch = require("node-fetch");
var xml2js = require("xml2js");
const getProcessor = require("../libs/gatherer");
const Redis = require("ioredis");
async () => {
  const db = await new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST, {
    password: process.env.REDIS_PASS,
    lazyConnect: true,
  }).connect((s) => {
    console.log("Scheduler DB Status: ✅");
  });
  db.disconnect();
};

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

const worker = new Worker(
  queueID,
  job => getProcessor(job.name).processJob(job, resultQueue),
  workerConfig
);

const getNextTranformer = (r) => {
  return "outbound";
};

const pushWorker = new Worker("resultQueue", async (job) => {
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
      const kafka = new Kafka({
        clientId: "api",
        brokers: ["127.0.0.1:9092"],
      });

      const producer = kafka.producer();
      await producer.connect();
      await producer.send(data);

      // job.data.sendRecord(data, (error, result) => {});
      console.log("Pushing to kafka again", data);
    }
  } catch (e) {
    console.log(e);
  }
});

worker.on("completed", (job, returnvalue) => {});

worker.on("progress", (job, progress) => {});

worker.on("failed", (job, failedReason) => {
  console.log(failedReason);
});

module.exports = {
  queue,
};
