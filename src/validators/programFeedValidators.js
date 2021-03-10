const { body, validationResult } = require('express-validator');
const messageUtils = require('../service/messageUtil');
const programFeedMessages = messageUtils.PROGRAM_FEED;
const programMessages = messageUtils.PROGRAM;
const errorCodes = messageUtils.ERRORCODES;
const loggerService = require('../service/loggerService');
const responseCode = messageUtils.RESPONSE_CODE;
const { errorResponse, loggerError } = require('../helpers/responseUtil');


const programFeedSearch = () => {
  return [
    body('request').exists().withMessage('request object is missing'),
    body('request.nomination').optional().notEmpty().withMessage('request.nomination object is empty'),
    body('request.contribution').optional().notEmpty().withMessage('request.contribution object is empty'),
    body('request.nomination.programId').optional().isArray().withMessage('programId should be an array').notEmpty().withMessage('programId should not be empty'),
    body('request.contribution.programId').optional().isArray().withMessage('programId should be an array').notEmpty().withMessage('programId should not be empty'),
    body('request.nomination.status')
      .optional()
      .isArray().withMessage('status should be an array')
      .notEmpty().withMessage('status should not be empty')
      .isIn(['Approved', 'Pending', 'Initiated']).withMessage('status should be one of these (Approved, Pending, Initiated) values'),
    body('request.contribution.status')
      .optional()
      .isArray().withMessage('status should be an array')
      .isIn(['Live', 'Review', 'Draft', 'Failed', 'Processing']).withMessage('status should be one of these (Live, Review, Draft, Failed, Processing) values'),
    body('request.channel')
      .exists().withMessage('channel is missing')
      .notEmpty().withMessage('channel is empty')
  ]
}


const validate = (req, res, next) => {
  const rspObj = req.rspObj;
  const errCode = programMessages.EXCEPTION_CODE+'_'+programFeedMessages.SEARCH.EXCEPTION_CODE;
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : programFeedMessages.SEARCH.INFO
   }
  loggerService.entryLog(req.body, logObject);
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  rspObj.errCode = programFeedMessages.SEARCH.MISSING_CODE;
  rspObj.errMsg = JSON.stringify(extractedErrors) || programFeedMessages.SEARCH.MISSING_MESSAGE;
  rspObj.responseCode = responseCode.CLIENT_ERROR;
  loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
  loggerError(rspObj,errCode+errorCodes.CODE1)
  return res.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1));
}

module.exports = {
  programFeedSearchValidator : programFeedSearch,
  validate
}
