"use strict";

const { Vault } = require("../helpers/vault");
const { Model } = require("objection");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require("graphql-tag");
const fetch = require("node-fetch");

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
              if ("profile" in resp.data.users[0]) {
                const users = this.__getUserPhone(resp);
                return {
                  total: users.length,
                  users,
                };
              } else {
                const users = resp.data.users;
                return {
                  status: "Verified",
                  data: { total: users.length, users },
                };
              }
            } else if (tag === "getUserByPhone") {
              const user = resp.data.users[0];
              return {
                status: "Verified",
                data: user,
              };
            } else if (tag === "getUserByID") {
              const user = resp.data.users[0];
              return {
                status: "Verified",
                data: user,
              };
            } else {
              return {
                status: "Failed",
                error: "Not a valid tag",
              };
            }
          })
          .catch((e) => {
            console.log(e);
            return {
              status: "Failed",
              error: e.message,
            };
          });
      } catch (e) {
        console.log(e);
        return {
          status: "Failed",
          error: e.message,
        };
      }
    } else {
      return Promise.resolve({ status: "Success", data: {} });
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
