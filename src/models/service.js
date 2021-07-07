"use strict";

const { Vault } = require("../helpers/vault");
const { Model } = require("objection");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require("graphql-tag");
const fetch = require("node-fetch");
const userSchema = require("./schema/user-schema");

const Ajv = require("ajv");
const ajv = new Ajv();

class Service extends Model {
  static get tableName() {
    return "service";
  }

  static get relationMappings() {
    const { Service } = require("./service");
    return {
      transformer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "service.id",
          to: "transformer.service",
        },
      },
    };
  }

  resolve() {
    if (this.type === "gql") {
      try {
        const userQuery = this.config.gql;
        const v = new Vault();
        const credentials = v.getCredentials(
          this.type,
          this.config.credentials
        );

        const client = this.__getGQLClient(credentials);
        const variables = this.config.verificationParams;
        return client
          .query({
            query: gql`
              ${userQuery}
            `,
            variables,
          })
          .then(async (resp) => {
            return resp.data.users;
          });
      } catch (e) {
        return [];
      }
    }
  }

  verify(tag) {
    if (this.type === "gql") {
      try {
        const userQuery = this.config.gql;
        const v = new Vault();
        const credentials = v.getCredentials(
          this.type,
          this.config.credentials
        );

        const client = this.__getGQLClient(credentials);
        const variables = this.config.verificationParams;
        return client
          .query({
            query: gql`
              ${userQuery}
            `,
            variables,
          })
          .then(async (resp) => {
            if (tag === "getAllUsers") {
              console.log(resp.data.users.length);
              const users = resp.data.users;
              const validate = ajv.compile(userSchema);
              const valid = validate(resp.data.users[0]);

              console.log(valid);
              return {
                total: users.length,
                verified: valid,
                schemaValidated: valid,
                sampleUser: users[0],
              };
            } else if (tag === "getUserByPhone") {
              const user = resp.data.users[0];
              const validate = ajv.compile(userSchema);
              const valid = validate(user);
              console.log(valid);

              return {
                schemaValidated: valid,
                verified: valid,
                total: 1,
              };
            } else if (tag === "getUserByID") {
              const user = resp.data.users[0];
              const validate = ajv.compile(userSchema);
              const valid = validate(user);
              console.log(valid);

              return {
                verified: valid,
                total: 1,
              };
            } else {
              return {
                verified: false,
                error: "Not a valid tag",
                total: null,
              };
            }
          })
          .catch((e) => {
            console.log(e);
            return {
              verified: false,
              error: e.message,
              total: null,
            };
          });
      } catch (e) {
        console.log(e);
        return {
          verified: false,
          error: e.message,
          total: null,
        };
      }
    } else {
      return Promise.resolve({
        verified: true,
        total: 10,
      });
    }
  }

  __getGQLClient(credentials) {
    return new ApolloClient({
      link: new HttpLink({
        uri: credentials.uri,
        fetch: fetch,
        headers: credentials.headers,
      }),
      cache: new InMemoryCache(),
    });
  }

  __getUserPhone(resp) {
    return resp.data.users
      .filter((user) => user.profile)
      .filter((user) => user.profile.data)
      .filter((user) => user.profile.data.phone)
      .map((user) => user.profile.data.phone);
  }
}

module.exports = {
  Service,
};
