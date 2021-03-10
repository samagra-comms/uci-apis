const redis = require('redis');
const bluebird = require('bluebird');
const logger = require('sb_logger_util_v2');
const envVariables = require("../envVariables");
var redisClient;
bluebird.promisifyAll(redis);
class RedisManager {
    constructor() {
        this.redisClient = redis.createClient({
            host: envVariables.DOCK_REDIS_HOST,
            port: envVariables.DOCK_REDIS_PORT,
            retry_strategy: (options) => {
                return 5000; //in ms
            }
        });
        /**
         * Redis Event listener for `ready` event
         */
        this.redisClient.on('ready', function () {
            logger.info({msg: `✅ Redis Server connected to [${envVariables.DOCK_REDIS_HOST}:${envVariables.DOCK_REDIS_PORT}]`});
        });
    }
  
    /**
     * Redis Event listener for `connect` event
     */
    isConnected(){
        this.msgredisClient.on('connect', function () {
            logger.info({msg: `✅ Redis Server connecting to [${envVariables.DOCK_REDIS_HOST}:${envVariables.DOCK_REDIS_PORT}]`});
        });
    }

    /**
     * Redis Event listener for `ready` event
     */
    isReady(){
        this.redisClient.on('ready', function () {
            logger.info({msg: `✅ Redis Server connected to [${envVariables.DOCK_REDIS_HOST}:${envVariables.DOCK_REDIS_PORT}]`});
        });
    }

    /**
     * Redis Event listener for `reconnecting` event
     */
    isReconnecting(){
        this.redisClient.on('reconnecting', function () {
            logger.info({msg: `❌ Redis Server reconnecting to [${envVariables.DOCK_REDIS_HOST}:${envVariables.DOCK_REDIS_PORT}]`});
            // throw new Error('Redis Client - Connection failure');
        });
    }

    /**
     * Redis Event listener for `error` event
     */
    isError(){
        this.redisClient.on('error', function (error) {
            logger.info({
              msg: `❌ Redis Server error while connecting to [${envVariables.DOCK_REDIS_HOST}:${envVariables.DOCK_REDIS_PORT}]`,
              error: error
            });
            // throw new Error(error);
        });
    }
  
    /**
     * set data
     */
    setData(data, callback) {
        if(typeof callback !== "function") {
            return;
        }
        this.redisClient.set(data.key, data.value, function(err){
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, {success : true});
            }
        });
    }
    
    /**
     * get data
     */
    getData(key, callback) {
        if(typeof callback !== "function") {
            return;
        }
        this.redisClient.get(key, function(err, cacheData){
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, cacheData);
            }
        });
    }

    getClient() {
        return this.redisClient;
    }

}

module.exports = RedisManager;
