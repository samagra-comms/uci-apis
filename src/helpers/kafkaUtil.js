const kafka = require('kafka-node')
const _ = require('lodash')
var logger = require('sb_logger_util_v2')
const envVariables = require("../envVariables");

const client = new kafka.KafkaClient({
  kafkaHost: envVariables.SUNBIRD_KAFKA_HOST,
  maxAsyncRequests: 100
})

const producer = new kafka.HighLevelProducer(client)
producer.on('ready', function () {
  console.log('Kafka Producer is connected and ready.')
  logger.info({msg: 'Kafka Producer is connected and ready.'})
})

// For this demo we just log producer errors to the console.
producer.on('error', function (error) {
  logger.error({msg: 'Error from Kafka producer', error})
  console.error(error)
})

const KafkaService = {
  sendRecord: (data, callback = () => { }) => {
    if (_.isEmpty(data)) {
      logger.error({msg: 'Data must be provided to send Record', additionalInfo: {data}})
      return callback(new Error('Event Data must be provided.'))
    }

    // Create a new payload
    const record = [
      {
        topic: envVariables.SUNBIRD_AUTO_CREATION_TOPIC,
        messages: JSON.stringify(data)
      }
    ]
    logger.info({msg: 'Kafka record', additionalInfo: {record}})
    // Send record to Kafka and log result/error
    producer.send(record, callback)
  }
}

module.exports = KafkaService
