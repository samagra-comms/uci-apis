// import { InMemoryCache } from 'apollo-cache-inmemory';
// import gql from 'graphql-tag';
// import fetch from 'node-fetch';
// import userSchema from '../service/schema/user.schema.json';

// import Ajv from 'ajv';
// import { Service } from 'prisma/generated/prisma-client-js';
// const ajv = new Ajv();

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class GQLResolverService {
//   resolve = (service: Service) => {
//     console.log('Resolving users now', this);
//     if (service.type === 'gql') {
//       try {
//         const userQuery = service.config.gql;
//         const v = new Vault();
//         const credentials = v.getCredentials(
//           service.type,
//           service.config.credentials,
//         );
//         const client = this.getGQLClient(credentials);
//         const variables = service.config.verificationParams;
//         const query = {
//           query: gql`
//             ${userQuery}
//           `,
//           variables,
//         };
//         console.log(query);
//         if (query.variables === undefined) {
//           console.log('AllService Query');
//           delete query.variables;
//         }
//         return client.query(query).then(async (resp) => {
//           console.log({ resp });
//           return resp.data.users;
//         });
//       } catch (e) {
//         return [];
//       }
//     } else if (service.type === 'GET') {
//     } else if (service.type === 'POST') {
//     } else {
//       return null;
//     }
//   };

//   getUserByGQL = async (userParams) => {
//     try {
//       const userQuery = service.config.gql;
//       console.log({ userQuery });
//       console.log(service.config.credentials);
//       const v = new Vault();
//       const credentials = v.getCredentials(
//         service.type,
//         service.config.credentials,
//       );

//       const client = this.getGQLClient(credentials);
//       const variables = userParams;
//       return client
//         .query({
//           query: gql`
//             ${userQuery}
//           `,
//           variables,
//         })
//         .then(async (resp) => {
//           console.log(resp.data);
//           const user = resp.data.users[0];
//           const validate = ajv.compile(userSchema);
//           const valid = validate(user);

//           return {
//             verified: valid,
//             user,
//           };
//         })
//         .catch((e) => {
//           console.log(e);
//           return {
//             verified: false,
//             user: null,
//           };
//         });
//     } catch (e) {
//       console.log(e);
//       return {
//         verified: false,
//         user: null,
//       };
//     }
//   };

//   verify = (tag, service: Service) => {
//     if (service.type === 'gql') {
//       try {
//         const userQuery = service.config.gql;
//         const v = new Vault();
//         const credentials = v.getCredentials(
//           service.type,
//           service.config.credentials,
//         );

//         const client = this.getGQLClient(credentials);
//         const variables = service.config.verificationParams;
//         return client
//           .query({
//             query: gql`
//               ${userQuery}
//             `,
//             variables,
//           })
//           .then(async (resp) => {
//             if (tag === 'getAllUsers') {
//               console.log(resp.data.users.length);
//               const users = resp.data.users;
//               const validate = ajv.compile(userSchema);
//               const valid = validate(resp.data.users[0]);

//               console.log(validate.errors);
//               console.log(users[0]);
//               return {
//                 total: users.length,
//                 verified: valid,
//                 schemaValidated: valid,
//                 sampleUser: users[0],
//               };
//             } else if (tag === 'getUserByPhone') {
//               const user = resp.data.users[0];
//               const validate = ajv.compile(userSchema);
//               const valid = validate(user);
//               console.log(valid);

//               return {
//                 schemaValidated: valid,
//                 verified: valid,
//                 total: 1,
//               };
//             } else if (tag === 'getUserByID') {
//               const user = resp.data.users[0];
//               const validate = ajv.compile(userSchema);
//               const valid = validate(user);
//               console.log(valid);

//               return {
//                 verified: valid,
//                 total: 1,
//               };
//             } else {
//               return {
//                 verified: false,
//                 error: 'Not a valid tag',
//                 total: null,
//               };
//             }
//           })
//           .catch((e) => {
//             console.log(e);
//             return {
//               verified: false,
//               error: e.message,
//               total: null,
//             };
//           });
//       } catch (e) {
//         console.log(e);
//         return {
//           verified: false,
//           error: e.message,
//           total: null,
//         };
//       }
//     } else {
//       return Promise.resolve({
//         verified: true,
//         total: 10,
//       });
//     }
//   };

//   getGQLClient = (credentials) => {
//     return new ApolloClient({
//       link: new HttpLink({
//         uri: credentials.uri,
//         fetch: fetch,
//         headers: credentials.headers,
//       }),
//       cache: new InMemoryCache(),
//     });
//   };

//   getUserPhone = (resp) => {
//     return resp.data.users
//       .filter((user) => user.profile)
//       .filter((user) => user.profile.data)
//       .filter((user) => user.profile.data.phone)
//       .map((user) => user.profile.data.phone);
//   };
// }
