const { ConsumerGroupStream } = require("kafka-node");
const { Kafka, logLevel } = require("kafkajs");
const fetch = require("node-fetch");
let kafka;
if (process.env.ENV === "dev") {
  kafka = new Kafka({
    clientId: "api",
    brokers: [`${process.env.KAFKA_HOST_DEV}`],
  });
} else {
  let brokers = process.env.KAFKA_HOST;
  if (process.env.KAFKA_HOST.includes(process.env.KAFKA_PORT)) {
    console.log("Kafka brokers have PORT");
  } else {
    brokers = process.env.KAFKA_HOST.split(",").map(
      (s) => s + ":" + process.env.KAFKA_PORT
    );
  }
  console.log(`Trying to connect to ${brokers}`);
  kafka = new Kafka({
    clientId: "api",
    brokers: brokers,
    logLevel: logLevel[process.env.KAFKA_LOG_LEVEL],
  });
}

const _ = require("lodash");
const logger = require("sb_logger_util_v2");
const envVariables = require("../envVariables");
// const consumer = kafka.consumer({ groupId: "api-group" });
const telemetryConsumer = kafka.consumer({ groupId: 'telemetry-group' })

telemetryConsumer.connect().then(async c => {
  console.log("Kafka Telemetry Consumer is connected: ✅");
  telemetryConsumer.subscribe({ topic: process.env.KAFKA_TELEMETRY_TOPIC, fromBeginning: false }).then(async s => {
    console.log("Kafka Telemetry Subscription Status: ✅");
    telemetryConsumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Kafka Telemetry Subscription Status: ✅✅✅");

        const event = {
          "id": "ekstep.telemetry",
          "ver": "3.0",
          "ets": Math.floor(Date.now() / 1000),
          "events": []
        }
        event.events.push(JSON.parse(JSON.parse(message.value.toString())))
        const telemetryResponse = await fetch(process.env.TELEMETRY_BASE_URL + "/v1/telemetry", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
        console.log("Kafka Telemetry Subscription Status: ✅✅✅");
        console.log({ telemetryResponse });
      }
    }).then(s => {
      console.log("success in run");
    }).catch(e => {
      console.log("error in run");
    });
  }).catch(e => {
    console.log("error in subscriber");
  });

}).catch(e => {
  console.log("error in connect");
  console.error(e);
})

// consumer
//   .connect()
//   .then((c) => {
//     console.log("Kafka Connection Status: ✅");
//   })
//   .catch((e) => {
//     console.error("Kafka Connection Status: ❌", e);
//   });

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
    // const { queue } = require("../service/schedulerService");
    // for (let i = 0; i < transformers.length; i++) {
    //   let topic = `com.${transformers[i].service.type}.${transformers[i].name}`;
    //   await consumer.stop();
    //   await consumer.subscribe({ topic, fromBeginning: true });
    //   await consumer.run({
    //     eachMessage: async ({ topic, partition, message }) => {
    //       const { Transformer } = require("../models/transformer");
    //       const { Service } = require("../models/service");
    //       const data = message.value.toString();

    //       const transformerServiceType = topic.split(".")[1];
    //       if (transformerServiceType === "odk") return; //Ignore ODK messages.

    //       const transformerName = topic.split(".")[2];
    //       const transformer = await Transformer.query().where(
    //         "name",
    //         transformerName
    //       );
    //       const service = await Service.query().findById(
    //         transformer[0].service
    //       );
    //       queue.add(
    //         service.type,
    //         {
    //           transformer,
    //           service,
    //           data,
    //           sendRecord,
    //           kafka,
    //         },
    //         {
    //           attempts: service.cadence.retries + 1,
    //           backoff: {
    //             type: "fixed",
    //             delay: 1000 * parseInt(service.cadence["retries-interval"]),
    //           },
    //         }
    //       );
    //       console.log("Scheduled Successfully");
    //     },
    //   });
    // }
  },
};

module.exports = KafkaService;
