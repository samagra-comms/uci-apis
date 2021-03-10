const _ = require('lodash');
const messageUtils = require('./messageUtil');
const programFeedMessages = messageUtils.PROGRAM_FEED;
const programMessages = messageUtils.PROGRAM;
const responseCode = messageUtils.RESPONSE_CODE;
const errorCode = messageUtils.ERRORCODES;
const keyGenerator = require('../helpers/redisKeyGenerator');
const RedisManager = require('../helpers/redisUtil');
const { successResponse, errorResponse, loggerError } = require('../helpers/responseUtil');
const { searchNominations, searchContributions, splitProgramIdFromKey, getNumberOfDays,
  generateUpdatesMap, getActionPendingContents, findAll, insertAndSetExpiry} = require('../helpers/programFeedHelper');
const redisManager = new RedisManager();
const config = require('better-config');
config.set('../config.json');
const loggerService = require('./loggerService');


const DEFAULT_CONTENT_STATUS = config.get('application.feed.defaultContentStatus');
const DEFAULT_NOMINATION_STATUS = config.get('application.feed.defaultNominationStatus');
const DEFAULT_FEED_DAYS = config.get('application.feed.defaultFeedDays');

const searchForUpdates = async (req, response) => {
  let data = req.body
  const rspObj = req.rspObj;
  const entryExitlog = {
    traceId : req.headers['x-request-id'] || '',
    message : programFeedMessages.SEARCH.INFO
   }
   loggerService.entryLog(data, entryExitlog);
  const client =  redisManager.getClient();
  const errCode = programMessages.EXCEPTION_CODE+'_'+programFeedMessages.SEARCH.EXCEPTION_CODE;

  const nominationRequest = _.get(data, 'request.nomination');
  const contributionRequest = _.get(data, 'request.contribution');
  const channel = _.get(data, 'request.channel');
  try {
    const channelPrograms = await client.smembersAsync(keyGenerator.getProgramUpdatesChannelKey(channel));
    const numberOfDays = await getNumberOfDays({key: 'projectFeedDays', status: 'active'})
    const stripRedisKey = keyGenerator.getProgramUpdatesHashKey('');
    const existingProgramUpdates = splitProgramIdFromKey(channelPrograms, stripRedisKey);
    const userRequestedNominations =  nominationRequest ? _.uniq(nominationRequest.programId) : [];
    const userRequestedContributions = contributionRequest ? _.uniq(contributionRequest.programId) : [];
    const nonExistingNominations = _.difference(userRequestedNominations, existingProgramUpdates);
    const nonExistingContributions = _.difference(userRequestedContributions, existingProgramUpdates);
    let logObject = {
      msg: programFeedMessages.SEARCH.INFO,
      channel: 'programFeedService',
      level: 'INFO',
      env: 'searchForUpdates',
      traceId : req.headers['x-request-id'] || '',
      actorId: '',
      params: {}
    }
    if (!channelPrograms.length) {
      let programByNominationCount = {}
      let programByContentCount = {}
      if(nominationRequest) {
        const nominationSearchRequest = {
          program_id: userRequestedNominations,
          status: nominationRequest.status || DEFAULT_NOMINATION_STATUS,
          days: numberOfDays || DEFAULT_FEED_DAYS
        }
        const newNominations = await searchNominations(nominationSearchRequest);
        logObject.params = { newNominations: `${JSON.stringify(newNominations)}`}
        console.log("newNominations", loggerService.logFormate(logObject));
        if(newNominations.length) {
          const nominationsByProgram = _.groupBy(_.map(newNominations, 'dataValues'), 'program_id');
          programByNominationCount = generateUpdatesMap(nominationsByProgram, 'nominationCount');
        } else {
          programByNominationCount = generateUpdatesMap(userRequestedNominations, 'nominationCount');
        }
        logObject.params = { programByNominationCount: programByNominationCount}
        console.log('programByNominationCount',loggerService.logFormate(logObject));
      }
      if(contributionRequest) {
        const contributionSearchRequest = {
          program_id: userRequestedContributions,
          status: contributionRequest.status || DEFAULT_CONTENT_STATUS,
          days: numberOfDays || DEFAULT_FEED_DAYS
        }
        const newContributions = await searchContributions(contributionSearchRequest, req.headers);
        const contents = _.get(newContributions, 'data.result.content');
        logObject.params = { newContributions: `${JSON.stringify(contents)}`}
        console.log('newContributions',loggerService.logFormate(logObject));
        const notActedUponContents = await getActionPendingContents(contents, req.headers);
        if(notActedUponContents && notActedUponContents.length){
          const contentsByProgram = _.groupBy(notActedUponContents, 'programId');
          programByContentCount = generateUpdatesMap(contentsByProgram, 'contributionCount');
        } else {
          programByContentCount = generateUpdatesMap(userRequestedContributions, 'contributionCount');
        }
        logObject.params = { programByContentCount: programByContentCount}
        console.log('programByContentCount',loggerService.logFormate(logObject));
      }
      const mergedUpdates = _.merge(programByNominationCount, programByContentCount);
      const result = await insertAndSetExpiry(mergedUpdates, channel, true);
      console.log(result)
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = mergedUpdates;
      return response.status(200).send(successResponse(rspObj));
    } else if(channelPrograms.length && (nonExistingNominations.length || nonExistingContributions.length)) {
      let programByNominationCount = {};
      let programByContentCount = {};

      logObject.params = { nonExistingNominations: `${nonExistingNominations}`}
      console.log('nonExistingNominations',loggerService.logFormate(logObject));

      logObject.params = { nonExistingContributions: `${nonExistingContributions}`}
      console.log('nonExistingContributions',loggerService.logFormate(logObject));

      if(nonExistingNominations.length) {
        const nominationSearchRequest = {
          program_id: nonExistingNominations,
          status: nominationRequest ? nominationRequest.status : DEFAULT_NOMINATION_STATUS,
          days: numberOfDays || DEFAULT_FEED_DAYS
        }
        const newNominations = await searchNominations(nominationSearchRequest);
        logObject.params = { newNominations: `${JSON.stringify(newNominations)}`}
        console.log('newNominations',loggerService.logFormate(logObject));
        if(newNominations.length) {
          const nominationsByProgram = _.groupBy(_.map(newNominations, 'dataValues'), 'program_id');
          programByNominationCount = generateUpdatesMap(nominationsByProgram, 'nominationCount')
        } else {
          programByNominationCount = generateUpdatesMap(nonExistingNominations, 'nominationCount');
        }
        logObject.params = { programByNominationCount: programByNominationCount}
        console.log('programByNominationCount',loggerService.logFormate(logObject));

        logObject.params = { programByNominationCount: `${JSON.stringify(programByNominationCount)}`}
        console.log('programByNominationCount',loggerService.logFormate(logObject));

      }
      if(nonExistingContributions.length) {
        const contributionSearchRequest = {
          program_id: nonExistingContributions,
          status: contributionRequest.status || DEFAULT_CONTENT_STATUS,
          days: numberOfDays || DEFAULT_FEED_DAYS
        }
        const newContributions = await searchContributions(contributionSearchRequest, req.headers);
        const contents = _.get(newContributions, 'data.result.content');
        logObject.params = { 'contents': `${JSON.stringify(contents)}`}
        console.log('Contents',loggerService.logFormate(logObject));
        const notActedUponContents = await getActionPendingContents(contents, req.headers);
        logObject.params = { notActedUponContents: `${JSON.stringify(notActedUponContents)}`}
        console.log('notActedUponContents',loggerService.logFormate(logObject));
        if(notActedUponContents && notActedUponContents.length) {
          const contentsByProgram = _.groupBy(notActedUponContents, 'programId');
          logObject.params = { contentsByProgram: `${JSON.stringify(contentsByProgram)}`}
          console.log('contentsByProgram',loggerService.logFormate(logObject));
          programByContentCount = generateUpdatesMap(contentsByProgram, 'contributionCount');
        } else {
          programByContentCount = generateUpdatesMap(nonExistingContributions, 'contributionCount');
        }
        logObject.params = { programByContentCount: `${JSON.stringify(programByContentCount)}`}
        console.log('programByContentCount',loggerService.logFormate(logObject));
      }
      const newUpdates = _.merge(programByNominationCount, programByContentCount);
      logObject.params = { 'New updates': `${JSON.stringify(newUpdates)}`}
      console.log('newUpdates',loggerService.logFormate(logObject));
      const existingUpdates = await findAll(channelPrograms, stripRedisKey);
      const mergedUpdates = _.merge(existingUpdates, newUpdates);
      const result = await insertAndSetExpiry(newUpdates, channel, false);
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = mergedUpdates;
      loggerService.exitLog({responseCode: rspObj.responseCode}, entryExitlog);
      return response.status(200).send(successResponse(rspObj));
    } else if(channelPrograms.length) {
      const existingUpdates = await findAll(channelPrograms, stripRedisKey);
      logObject.params = { 'existingUpdates': existingUpdates}
      console.log('existingUpdates',loggerService.logFormate(logObject));
      rspObj.responseCode = responseCode.SUCCESS;
      rspObj.result = existingUpdates;
      loggerService.exitLog({responseCode: rspObj.responseCode}, entryExitlog);
      return response.status(200).send(successResponse(rspObj));
    }
  } catch(error) {
    console.log(error)
    rspObj.errCode = programFeedMessages.SEARCH.FAILED_CODE;
    rspObj.errMsg = error.message || programFeedMessages.SEARCH.FAILED_MESSAGE;
    rspObj.responseCode = responseCode.SERVER_ERROR;
    loggerError(rspObj,errCode+errorCode.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, entryExitlog);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCode.CODE1));
  }
}

module.exports = {
  searchForUpdatesAPI : searchForUpdates
}
