// const { FusionAuthClient } = require('fusionauth-node-client');
// const env = require('dotenv').config();
// const CryptoJS = require('crypto-js');
// const AES = require('crypto-js/aes');
// const assert = require('assert');
// const { response } = require('express');
// const _ = require('lodash');

// CryptoJS.lib.WordArray.words;

// // For staging server
// const fusionAuthURL = process.env.FUSIONAUTH_URL;
// const fusionAuthAPIKey = process.env.FUSIONAUTH_KEY;
// const anonymousBotID = process.env.FA_ANONYMOUS_BOT_ID;

// const client = new FusionAuthClient(fusionAuthAPIKey, fusionAuthURL);
// const encodedBase64Key = process.env.ENCRYPTION_KEY;
// const parsedBase64Key = CryptoJS.enc.Base64.parse(encodedBase64Key);

// class DeviceManager {
//   getUserNameEncrypted = (username) => {
//     return this.encrypt(username).toString();
//   };

//   encrypt = (plainString) => {
//     const encryptedString = AES.encrypt(plainString, parsedBase64Key, {
//       mode: CryptoJS.mode.ECB,
//     });
//     return encryptedString;
//   };

//   decrypt = (encryptedString) => {
//     const plainString = AES.decrypt(encryptedString, parsedBase64Key, {
//       mode: CryptoJS.mode.ECB,
//     }).toString(CryptoJS.enc.Utf8);
//     return plainString;
//   };

//   addAnonymousBotID = async () => {
//     addBotToRegistry(anonymousBotID);
//   };

//   addBotToRegistry = async (botID) => {
//     return await client
//       .createApplication(botID, { application: { name: botID } })
//       .then((response) => {
//         console.log(JSON.stringify(response));
//       })
//       .catch((e) => {
//         console.log(JSON.stringify(e));
//       });
//   };

//   botExists = async (botID) => {
//     return client
//       .retrieveApplication(botID)
//       .then((response) => {
//         console.log({ response });
//         return { status: true, user: response.successResponse };
//       })
//       .catch((e) => {
//         console.log(e);
//         return { status: false, user: null };
//       });
//   };

//   isDeviceAlreadyExisting = async (username) => {
//     return client
//       .retrieveUserByUsername(username)
//       .then((response) => {
//         console.log({ response });
//         return { status: true, user: response.successResponse.user };
//       })
//       .catch((e) => ({ status: false, user: null }));
//   };

//   addDeviceToRegistry = async (botID, user) => {
//     // TODO: Encrypt
//     console.log({ botID, user });
//     const deviceString = user.device.type + ':' + user.device.deviceID;
//     const username = this.encrypt(deviceString).toString();

//     const isDeviceExisting = await this.isDeviceAlreadyExisting(username);
//     const isBotExisting = await this.botExists(botID);

//     if (!isBotExisting.status) {
//       await this.addBotToRegistry(botID);
//     }

//     if (!isDeviceExisting.status) {
//       let fullName = '';
//       if (user.firstName && user.lastName)
//         fullName = user.firstName + ' ' + user.lastName;

//       user.device.consent = true;

//       let userRequestJSON = {
//         user: {
//           username: username,
//           password: 'dummyUser',
//           fullName: fullName,
//           active: true,
//           data: user,
//         },
//         registration: {
//           applicationId: botID,
//           username: username,
//         },
//       };

//       if (fullName === '') delete userRequestJSON.user.fullName;
//       return await client
//         .register(null, userRequestJSON)
//         .then((response) => {
//           console.log('User Added Successfully');
//           console.log({ response });
//           return response.successResponse.user.id;
//         })
//         .catch((e) => {
//           console.log(JSON.stringify(e));
//         });
//     } else {
//       //Register user to existing bot
//       const user = isDeviceExisting.user;
//       let isUserRegistered;
//       try {
//         isUserRegistered = _.includes(
//           user.registrations.map((s) => s.applicationId),
//           botID,
//         );
//       } catch (e) {
//         isUserRegistered = false;
//       }

//       if (isUserRegistered) return user.id;
//       else {
//         return await client
//           .register(isDeviceExisting.user.id, {
//             registration: {
//               applicationId: botID,
//             },
//           })
//           .then((response) => {
//             console.log('User Added Successfully');
//             console.log({ response });
//             return response.successResponse.user.id;
//           })
//           .catch((e) => console.log(JSON.stringify(e)));
//       }
//     }
//   };

//   addAnonymousDeviceToRegistry = async (username) => {
//     const user = {
//       device: {
//         deviceID: username.split(':')[1],
//         type: username.split(':')[0],
//       },
//     };
//     return this.addDeviceToRegistry(anonymousBotID, user);
//   };
// }

// module.exports = {
//   DeviceManager,
// };
