# Comms Manager Service

This is a layer over top of the comms service to

- manage bots
- ensure service level agreement and executing federation jobs

## Contibution Guide

The template has been taken from Sunbird's program service and extended for our purposed for creating APIs.

### Step 1: Create a .env file will the following credentials.

```sh
PSQL_DB_URL=postgres://postgresql:yoursupersecret@comms:5432/comms
PSQL_DB_URL_DEV=postgres://postgresql:yoursupersecret@localhost:55001/comms
HASURA_GRAPHQL_DATABASE_URL=postgres://postgresql:yoursupersecret@comms:5432/comms
HASURA_GRAPHQL_ENABLE_CONSOLE=true
HASURA_GRAPHQL_ENABLED_LOG_TYPES=startup, http-log, webhook-log, websocket-log, query-log
HASURA_GRAPHQL_ADMIN_SECRET=4GeEB2JCU5rBdLvQ4Abeq
POSTGRES_PASSWORD=yoursupersecret
POSTGRES_USER=postgresql
POSTGRES_DB=comms
DATABASE_DEBUG=true
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASS=foobared
KAFKA_HOST=127.0.0.1:9092
KAFKA_USER=admin
KAFKA_PASS=cttsamagra
KAFKA_PORT=9092
```

### Step 2: Setting up Kafka using Lenses dev env

The key can be obtained easily form [here](https://lenses.io/lenses-download/)

```yml
version: "3"

services:
  lenses:
    container_name: lenses
    image: lensesio/box
    environment:
      ADV_HOST: "127.0.0.1"
      EULA: "https://dl.lenses.io/d/?id=xxxxx-xxxxxxx"
      USER: user
      PASSWORD: password
      SAMPLEDATA: 0
      RUNTESTS: 0
      DEBUG: 1
    volumes:
      - kafka-data:/data/storage
    ports:
      - "3030:3030"
      - "9092:9092"
      - "8081:8081"

volumes:
  license.json:
```

### Step 3: Setting up the server

`docker-compose up -d` should setup the development environment.
