const fetch = require("node-fetch");
const Knex = require("knex");
const { Queue, Worker } = require("bullmq");
const { setQueues, BullAdapter } = require("bull-board");
const { check } = require("express-validator");
const { Kafka, logLevel } = require("kafkajs");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");

async function checkFusion() {
  let checks = [];
  let result = await fetch(`${process.env.FA_URL}/api/status`);
  if (result.statusText === "OK") {
    checks = { name: "Fusion Auth", healthy: true };
    return checks;
  } else {
    checks = { name: "Fusion Auth", healthy: false };
    return checks;
  }
}

async function checkInbound() {
  let checks = [];
  let result = await fetch(`https://dull-mole-76.loca.lt/health`);
  if (result.statusText === "OK") {
    checks = { name: "Inbound", healthy: true };
    return checks;
  } else {
    checks = { name: "Inbound", healthy: false };
    return checks;
  }
}

async function checkTransformer() {
  let checks;
  let result = await fetch(`https://dull-mole-76.loca.lt/health`);
  if (result.statusText === "OK") {
    checks = { name: "Transformer", healthy: true };
    return checks;
  } else {
    checks = { name: "Transformer", healthy: false };
    return checks;
  }
}

async function checkDB() {
  const knexConfig = {
    development: {
      debug: false,
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.PSQL_DB_URL_DEV,
      pool: {
        min: 20,
        max: 50,
      },
    },
    production: {
      debug: false,
      client: "pg",
      useNullAsDefault: true,
      connection: process.env.PSQL_DB_URL,
      pool: {
        min: 2,
        max: 5,
      },
    },
  };
  let checks;

  // Initialize knex.
  const config =
    process.env.ENV === "dev" ? knexConfig.development : knexConfig.production;
  const knex = Knex(config);
  if (knex) {
    checks = { name: "Postgres", healthy: true };
  }

  let result = knex.select().from("transformer");
  if (result) {
    return checks;
  } else {
    checks = { name: "Postgres", healthy: false };
    return check;
  }
}

async function checkRedis() {
    let checks;
    let result = await fetch(`http://localhost:9999/admin/v1/health/redis`);
    if (result.status === 200) {
      checks = { name: "Redis cache", healthy: true };
      return checks;
    } else {
      checks = { name: "Redis cache", healthy: false };
      return checks;
    }
 
}
async function checkKafka() {
  let kafka;
  if (process.env.ENV === "dev") {
    kafka = new Kafka({
      clientId: "api",
      brokers: [`${process.env.KAFKA_HOST_DEV}`],
    });
  } else {
    const brokers = process.env.KAFKA_HOST.split(",").map(
      (s) => s + ":" + process.env.KAFKA_PORT
    );
    kafka = new Kafka({
      clientId: "api",
      brokers: brokers,
      logLevel: logLevel[process.env.KAFKA_LOG_LEVEL],
    });
  }
  let checks;

  const consumer = kafka.consumer({ groupId: "api-group" });
  let result = consumer.connect();
  if (result) {
    return checks = { name: "Kafka", healthy: true };
  } else{
    return checks = { name: "Kafka", healthy: false };
  }
}

async function checkGQL(req, res){ 
    let checks;  
    const client = getGQLClient() 
    if (client) {
       return checks = {"name":"GQL",
        "healthy":true}   
    }
    
    } 
function getGQLClient() {
    return new ApolloClient({
      link: new HttpLink({
        uri:`${process.env.GRAPHQL_BASE_URL}/v1/graphql`,  
        fetch:fetch ,
        headers:     {
            "x-hasura-admin-secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
          }                       
      }),
      cache: new InMemoryCache(),
    });
  } 

module.exports = {
  checkFusion,
  checkInbound,
  checkTransformer,
  checkDB,
  checkRedis,
  checkKafka,
  checkGQL,
  getGQLClient

};
