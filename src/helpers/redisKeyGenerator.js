const config = require('better-config');

config.set('../config.json');

// Prefix that all keys will start with, taken from config.json
let prefix = config.get('dataStores.redis.keyPrefix');

/**
 * Takes a string containing a Redis key name and returns a
 * string containing that key with the application's configurable
 * prefix added to the front.  Prefix is configured in config.json.
 *
 * @param {string} key - a Redis key
 * @returns {string} - a Redis key with the application prefix prepended to
 *  the value of 'key'
 * @private
 */
const getKey = key => `${prefix}:${key}`;

/**
 * Takes a string and returns the program key
 * value for that param.
 *
 * Key name: prefix:program:[programID]
 * Redis type stored at this key: hash
 *
 * @param {string} key - string of any value.
 * @returns - the redis program key for the provided param.
 */
const getProgramHashKey = key => getKey(`program:${key}`);


/**
 * Takes a string and returns the key for updates feature
 *
 * Key name: prefix:program:updates:[key]
 *
 * @param {string} key - a string
 * @returns - a Redis key for the provided param.
 */
const getProgramUpdatesKey = key => getProgramHashKey(`updates:${key}`);



/**
 * Takes a channelID and returns the channel key
 * value for that channel ID.
 *
 * Key name: prefix:program:updates:channel:[channelId]
 * Redis type stored at this key: set
 *
 * @param {string} channelId - a string of channelId
 * @returns - a Redis key for the provided channelId.
 */
const getProgramUpdatesChannelKey = (channelId) => getProgramUpdatesKey(`channel:${channelId}`)


/**
 * Returns the Redis key used for storing program updates data.
 *
 * Key name: prefix:program:updates
 * Redis type stored at this key: hash
 *
 * @returns {string} - the Redis key used for storing program updates data.
 */
const getProgramUpdatesHashKey = (programId) => getProgramUpdatesKey(`id:${programId}`);


module.exports = {
  getKey,
  getProgramHashKey,
  getProgramUpdatesKey,
  getProgramUpdatesChannelKey,
  getProgramUpdatesHashKey
}

