const response = require("../routes/response");
const requestMiddleware = require("../middlewares/request.middleware");
const BASE_URL = "/admin/v1";
const messageUtils = require("../service/messageUtil");
const HealthMessages = messageUtils.HEALTH_CHECK;
const errorCode = messageUtils.ERRORCODES;
const errCode = HealthMessages.EXCEPTION_CODE;
const { Queue, Worker } = require("bullmq");
const { setQueues, BullAdapter } = require("bull-board");
 

  

async function checkRedis(req, res) {
  // const { queue } = require("../service/schedulerService");
  // queue.add("test",{})
  try {
    const connection = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    };
    
    const workerConfig = {
      connection,
      concurrency: 1,
    };
    
    const queueConfig = {
      connection,
    };
      let checks = [];
    
      const queueID = "queue1";
      const queue = new Queue(queueID, queueConfig);
      const resultQueue = new Queue("resultQueue", queueConfig);
      setQueues([new BullAdapter(queue), new BullAdapter(resultQueue)]);
     
    const worker = new Worker(
      queueID,
      async (job) => {
  
        await checks.push({ name: "connection", healthy: " true" });
        if (job.name === "test1") {
         await checks.push({ name: "test-query", healthy: " true" });
         await response.sendHealthSuccessRes(
            req,
            true,
            checks,
            res,
            HealthMessages.REDIS.SUCCESS_CODE,
            errorCode
          );
          await worker.close();
        } else {
          await response.sendHealthErrorRes(
            req,
            res,
            HealthMessages.REDIS.FAILED_CODE,
            errorCode,
            HealthMessages.REDIS.FAILED_MESSAGE,
            false,
            errCode
          ); 
        }
      },
      workerConfig
    );
  
    queue.add("test1", {});
  
    worker.on("completed", (job, returnvalue) => {
      
      console.log("Complete")
    });
    worker.on("progress", (job, progress) => {
      console.log("Progress")
    })
  
    worker.on("failed", (job, failedReason) => {
      console.log("Failed")
      console.log(failedReason);
    });

    worker.connection.on("error", onError());

    function onError() {
      return (error) => {
        console.log("Got an error");
      };
    }
  
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = function (app) {
  app
    .route(BASE_URL + "/health/redis")
    .get(
      requestMiddleware.gzipCompression(),
      requestMiddleware.createAndValidateRequestBody,
      checkRedis
    );
};
