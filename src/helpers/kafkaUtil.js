const { ConsumerGroupStream } = require("kafka-node");
const { Kafka } = require("kafkajs");
let kafka;
if (process.env.ENV === "dev") {
  kafka = new Kafka({
    clientId: "api",
    brokers: [`${process.env.KAFKA_HOST}`],
    // sasl: {
    //   mechanism: "plain",
    //   username: process.env.KAFKA_USER,
    //   password: process.env.KAFKA_PASS,
    // },
  });
} else {
  const brokers = process.env.KAFKA_HOST.split(",").map(
    (s) => s + process.env.KAFKA_PORT
  );
  console.log(`Trying to connect to ${brokers}`);
  kafka = new Kafka({
    clientId: "api",
    brokers: brokers,
  });
}

const _ = require("lodash");
const logger = require("sb_logger_util_v2");
const envVariables = require("../envVariables");
const consumer = kafka.consumer({ groupId: "api-group" });
consumer
  .connect()
  .then((c) => {
    console.log("------------ Consumer connected Kafka - ", c);
  })
  .catch((e) => {
    console.error("---------- Error while connecting consumer Kafka", e);
  });

const sendRecord = async (data, callback) => {
  if (_.isEmpty(data)) {
    logger.error({
      msg: "Data must be provided to send Record",
      additionalInfo: { data },
    });
    return callback(new Error("Event Data must be provided."));
  }

  const record = [
    {
      topic: data.topic,
      messages: [{ key: "VALUE", value: data.data }],
    },
  ];
  logger.info({ msg: "Kafka record", additionalInfo: { record } });
  await data.kafka.producer().send(record);
};

const KafkaService = {
  sendRecord: sendRecord,

  addTransformer: async (transformer, service) => {
    const admin = kafka.admin();
    await admin.connect();

    try {
      const topicsToCreate = [
        {
          topic: `com.${service.type}.${transformer.name}`,
        },
      ];
      return await admin.createTopics({
        topics: topicsToCreate,
      });
    } catch (e) {
      console.error("Error occured in creating topic", e);
      return undefined;
    }
  },

  refreshSubscribers: async (transformers) => {
    const { queue } = require("../service/schedulerService");
    for (let i = 0; i < transformers.length; i++) {
      let topic = `com.${transformers[i].service.type}.${transformers[i].name}`;
      await consumer.stop();
      await consumer.subscribe({ topic, fromBeginning: true });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const { Transformer } = require("../models/transformer");
          const { Service } = require("../models/service");
          const data = message.value.toString();

          const transformerServiceType = topic.split(".")[1];
          if (transformerServiceType === "odk") return; //Ignore ODK messages.

          const transformerName = topic.split(".")[2];
          const transformer = await Transformer.query().where(
            "name",
            transformerName
          );
          const service = await Service.query().findById(
            transformer[0].service
          );
          console.log("Here");
          queue.add(
            service.type,
            {
              transformer,
              service,
              data,
              sendRecord,
              kafka,
            },
            {
              attempts: service.cadence.retries + 1,
              backoff: {
                type: "fixed",
                delay: 1000 * parseInt(service.cadence["retries-interval"]),
              },
            }
          );
          console.log("Scheduled Successfully");
        },
      });
    }
  },
};

module.exports = KafkaService;
