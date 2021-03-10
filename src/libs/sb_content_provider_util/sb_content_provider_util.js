var httpUtil = require('sb-http-util')
var configUtil = require('sb-config-util')
const TelemetryUtil = require('sb_telemetry_util')
var LOG = require('sb_logger_util')
const telemetry = new TelemetryUtil()

var getHttpOptions = function (url, data, method, formData, headers, authToken) {
  var defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': authToken || configUtil.getConfig('CONTENT_REPO_AUTHORIZATION_TOKEN')
  }

  var http_options = {
    url: url,
    forever: true,
    headers: defaultHeaders,
    method: method,
    json: true
  }

  if (headers) {
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : defaultHeaders['Content-Type']
    headers['Authorization'] = defaultHeaders['Authorization']
    http_options.headers = headers
  }

  if (data) { http_options.body = data }

  if (formData) { http_options.formData = formData }

  return http_options
}

getHttpOptionsForLS = function (url, data, method, formData, headers) {
  var defaultHeaders = {
    'Content-Type': 'application/json'
  }

  var http_options = {
    url: url,
    headers: defaultHeaders,
    method: method,
    json: true
  }

  if (headers) {
    headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : defaultHeaders['Content-Type']
    headers['Authorization'] = defaultHeaders['Authorization']
    http_options.headers = headers
  }

  if (data) { http_options.body = data }

  if (formData) { http_options.formData = formData }

  return http_options
}

createContent = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_SERVICE_BASE_URL') + configUtil.getConfig('CREATE_CONTENT_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

searchContent = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('SEARCH_CONTENT_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

compositeSearch = function (data, headers, cb) {
  var url = configUtil.getConfig('SEARCH_SERVICE_BASE_URL') + configUtil.getConfig('SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('SEARCH_SERVICE_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

updateContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_SERVICE_BASE_URL') + configUtil.getConfig('UPDATE_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

getContent = function (content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_SERVICE_BASE_URL') + configUtil.getConfig('GET_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'GET', false, headers)
  postRequest(options, cb)
}

getContentUsingQuery = function (content_id, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_SERVICE_BASE_URL') + configUtil.getConfig('GET_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  postRequest(options, cb)
}

reviewContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('REVIEW_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

publishContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('PUBLISH_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

listContent = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('LIST_CONTENT_URI')
  var options = getHttpOptions(url, null, 'POST', false, headers)
  sendRequest(options, cb)
}

retireContent = function (content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('RETIRE_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'DELETE', false, headers)
  sendRequest(options, cb)
}

uploadContent = function (formData, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('UPLOAD_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'POST', formData, headers)
  sendRequest(options, cb)
}

contentHierarchy = function (content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('HIERARCHY_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

contentHierarchyUsingQuery = function (content_id, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('HIERARCHY_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

uploadMedia = function (formData, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('UPLOAD_MEDIA_URI')
  var options = getHttpOptions(url, null, 'POST', formData, headers)
  sendRequest(options, cb)
}

getDomains = function (headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI')
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

getDomainById = function (domainId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

getObjects = function (domainId, objectType, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

getObjectById = function (domainId, objectType, objectId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

getConceptById = function (conceptId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_CONCEPT_URI') + '/' + conceptId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

searchObjectsType = function (data, domainId, objectType, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + 'search'
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

createObjectType = function (data, domainId, objectType, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/'
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

updateObjectType = function (data, domainId, objectType, objectId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

retireObjectType = function (data, domainId, objectType, objectId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('GET_DOMAIN_URI') + '/' + domainId + '/' + objectType + '/' + objectId + '/retire'
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

rejectContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('REJECT_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

listTerms = function (headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('LIST_TERMS_URI')
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

listResourceBundles = function (headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('LIST_RESOURCE_BUNDLES_URI')
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

listOrdinals = function (headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('LIST_ORDINALS_URI')
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

flagContent = function (data, contentId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FLAG_CONTENT_URI') + '/' + contentId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

acceptFlagContent = function (data, contentId, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('ACCEPT_FLAG_CONTENT_URI') + '/' + contentId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

rejectFlagContent = function (data, contentId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('REJECT_FLAG_CONTENT_URI') + '/' + contentId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

uploadContentUrl = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CONTENT_UPLOAD_URL_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

uploadContentWithFileUrl = function (content_id, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('UPLOAD_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, null, 'POST', {}, headers)
  options.qs = query
  sendRequest(options, cb)
}

sendEmail = function (data, headers, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_SEND_EMAIL')
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

getChannel = function (defaultTenent, cb) {
  var body = {
    'request': {
      'filters': { 'slug': defaultTenent }
    }
  }
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + '/v1/org/search'
  var options = getHttpOptionsForLS(url, body, 'POST', false)
  postRequest(options, cb)
}

ekStepHealthCheck = function (cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('HEALTH_CHECK')
  var options = getHttpOptions(url, null, 'GET', false, false)
  sendRequest(options, cb)
}

learnerServiceHealthCheck = function (cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_HEALTH_CHECK')
  var options = getHttpOptionsForLS(url, null, 'GET', false, false)
  sendRequest(options, cb)
}

unlistedPublishContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('UNLISTED_PUBLISH_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

generateDialCode = function (data, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('GENERATE_DIALCODE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

getDialCode = function (dialCode_id, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('GET_DIALCODE_URI') + '/' + dialCode_id
  var options = getHttpOptions(url, null, 'GET', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

updateDialCode = function (data, dialCode_id, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('UPDATE_DIALCODE_URI') + '/' + dialCode_id
  var options = getHttpOptions(url, data, 'PATCH', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

dialCodeList = function (data, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('LIST_DIALCODE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

contentLinkDialCode = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CONTENT_LINK_DIALCODE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

searchDialCode = function (data, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('SEARCH_DIALCODE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

publishDialCode = function (data, dialCode_id, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('PUBLISH_DIALCODE_URI') + '/' + dialCode_id
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

createPublisher = function (data, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('CREATE_PUBLISHER_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

getPublisher = function (publisher_id, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('GET_PUBLISHER_URI') + '/' + publisher_id
  var options = getHttpOptions(url, null, 'GET', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

updatePublisher = function (data, publisher_id, headers, cb) {
  var url = configUtil.getConfig('DIAL_REPO_BASE_URL') + configUtil.getConfig('UPDATE_PUBLISHER_URI') + '/' + publisher_id
  var options = getHttpOptions(url, data, 'PATCH', false, headers, configUtil.getConfig('DIAL_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

contentHierarchyUpdate = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CONTENT_HIERARCHY_UPDATE_URI') + '/'
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

submitDataSetRequest = function (data, headers, cb) {
  var url = configUtil.getConfig('DATA_SERVICE_BASE_URL') + configUtil.getConfig('SUBMIT_DATA_EXHAUST_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('DATA_SERVICE_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

getListOfDataSetRequest = function (query, clientKey, headers, cb) {
  var url = configUtil.getConfig('DATA_SERVICE_BASE_URL') + configUtil.getConfig('LIST_DATA_EXHAUST_URI') + '/' + clientKey
  var options = getHttpOptions(url, null, 'GET', false, headers, configUtil.getConfig('DATA_SERVICE_AUTHORIZATION_TOKEN'))
  options.qs = query
  sendRequest(options, cb)
}

getDataSetDetailRequest = function (clientKey, requestId, headers, cb) {
  var url = configUtil.getConfig('DATA_SERVICE_BASE_URL') + configUtil.getConfig('READ_DATA_EXHAUST_URI') + '/' + clientKey + '/' + requestId
  var options = getHttpOptions(url, null, 'GET', false, headers, configUtil.getConfig('DATA_SERVICE_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

getChannelDataSetRequest = function (query, dataSetId, channel, headers, cb) {
  var url = configUtil.getConfig('DATA_SERVICE_BASE_URL') + configUtil.getConfig('CHANNEL_DATA_EXHAUST_URI') + '/' + dataSetId + '/' + channel
  var options = getHttpOptions(url, null, 'GET', false, headers, configUtil.getConfig('DATA_SERVICE_AUTHORIZATION_TOKEN'))
  options.qs = query
  sendRequest(options, cb)
}
systemUpdateContent = function (data, contentId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('SYSTEM_UPDATE_CONTENT_URI') + '/' + contentId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

learnerServiceGetForm = function (data, headers, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_FORM_READ')
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

learnerServiceCreateForm = function (data, headers, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_FORM_CREATE')
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

learnerServiceUpdateForm = function (data, headers, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_FORM_UPDATE')
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

copyContent = function (data, content_id, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('COPY_CONTENT_URI') + '/' + content_id
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

getAllRootOrgs = function (data, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + configUtil.getConfig('LS_ORG_SEARCH')
  var options = getHttpOptionsForLS(url, data, 'POST', false)
  postRequest(options, cb)
}

pluginsSearch = function (data, headers, cb) {
  var url = configUtil.getConfig('PLUGIN_REPO_BASE_URL') + configUtil.getConfig('PLUGINS_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers, configUtil.getConfig('PLUGIN_REPO_AUTHORIZATION_TOKEN'))
  sendRequest(options, cb)
}

getForm = function (data, headers, cb) {
  var url = configUtil.getConfig('SUNBIRD_PORTAL_BASE_URL') + configUtil.getConfig('FORM_READ')
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

userSearch = function (data, headers, cb) {
  var url = configUtil.getConfig('LEARNER_SERVICE_LOCAL_BASE_URL') + '/v1/user/search'
  var options = getHttpOptionsForLS(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

releaseDialcode = function (contentId, data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('RELEASE_DIALCODE') + '/' + contentId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  postRequest(options, cb)
}

reserveDialcode = function (contentId, data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('RESERVE_DIALCODE') + '/' + contentId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  postRequest(options, cb)
}
/**
 * This function used to generate api_call log event
 * @param {Object} data
 */
function generateApiCallLogEvent(http_options) {
  const telemetryData = Object.assign({}, http_options.headers.telemetryData)
  const message = telemetryData.message || 'Calling content provider api'
  const level = 'api_call'
  const edata = telemetry.logEventData('INFO', level, message, telemetryData.params)
  telemetry.log({
    edata: edata,
    context: telemetryData && telemetryData.context && telemetry.getContextData(telemetryData.context),
    actor: telemetryData && telemetryData.actor,
    tags: telemetryData && telemetryData.tags,
    object: telemetryData && telemetryData.object
  })
}

function sendRequest(http_options, cb) {
  var options = Object.assign({}, http_options)
  // removed api call event
  //generateApiCallLogEvent(http_options)
  delete options.headers['telemetryData']

  httpUtil.sendRequest(options, function (err, resp, body) {
    if (resp && resp.statusCode && body) {
      body.statusCode = resp.statusCode ? resp.statusCode : 500
      if (body.statusCode === 500) {
        LOG.error({ 'errorBody': body, 'errorResponse': resp })
      }
      cb(null, body)
    } else {
      LOG.error({ 'errorMessage': err, 'errorBody': body, 'errorResponse': resp })
      cb(true, null)
    }
  })
}
function postRequest(http_options, cb) {
  var options = Object.assign({}, http_options)
  // removed api call event
  delete options.headers['telemetryData']

  httpUtil.sendRequest(options, function (err, resp, body) {
    if (resp && resp.statusCode && body) {
      body.statusCode = resp.statusCode ? resp.statusCode : 500
      if (body.statusCode === 500) {
        LOG.error({ 'errorBody': body, 'errorResponse': resp })
      }
      cb(null, body)
    } else {
      LOG.error({ 'errorMessage': err, 'errorBody': body, 'errorResponse': resp })
      cb(err, null)
    }
  })
}

module.exports = {
  createContent: createContent,
  searchContent: searchContent,
  compositeSearch: compositeSearch,
  updateContent: updateContent,
  getContent: getContent,
  reviewContent: reviewContent,
  uploadContent: uploadContent,
  publishContent: publishContent,
  listContent: listContent,
  retireContent: retireContent,
  contentHierarchy: contentHierarchy,
  getContentUsingQuery: getContentUsingQuery,
  uploadMedia: uploadMedia,
  contentHierarchyUsingQuery: contentHierarchyUsingQuery,
  getDomains: getDomains,
  getDomainById: getDomainById,
  getObjects: getObjects,
  getObjectById: getObjectById,
  getConceptById: getConceptById,
  searchObjectsType: searchObjectsType,
  createObjectType: createObjectType,
  updateObjectType: updateObjectType,
  retireObjectType: retireObjectType,
  rejectContent: rejectContent,
  listTerms: listTerms,
  listResourceBundles: listResourceBundles,
  listOrdinals: listOrdinals,
  flagContent: flagContent,
  acceptFlagContent: acceptFlagContent,
  rejectFlagContent: rejectFlagContent,
  uploadContentUrl: uploadContentUrl,
  uploadContentWithFileUrl: uploadContentWithFileUrl,
  sendEmail: sendEmail,
  getChannel: getChannel,
  ekStepHealthCheck: ekStepHealthCheck,
  learnerServiceHealthCheck: learnerServiceHealthCheck,
  unlistedPublishContent: unlistedPublishContent,
  generateDialCode: generateDialCode,
  getDialCode: getDialCode,
  updateDialCode: updateDialCode,
  dialCodeList: dialCodeList,
  contentLinkDialCode: contentLinkDialCode,
  searchDialCode: searchDialCode,
  publishDialCode: publishDialCode,
  createPublisher: createPublisher,
  getPublisher: getPublisher,
  updatePublisher: updatePublisher,
  contentHierarchyUpdate: contentHierarchyUpdate,
  submitDataSetRequest: submitDataSetRequest,
  getListOfDataSetRequest: getListOfDataSetRequest,
  getDataSetDetailRequest: getDataSetDetailRequest,
  getChannelDataSetRequest: getChannelDataSetRequest,
  systemUpdateContent: systemUpdateContent,
  learnerServiceGetForm: learnerServiceGetForm,
  learnerServiceCreateForm: learnerServiceCreateForm,
  learnerServiceUpdateForm: learnerServiceUpdateForm,
  copyContent: copyContent,
  getAllRootOrgs: getAllRootOrgs,
  pluginsSearch: pluginsSearch,
  getForm: getForm,
  userSearch: userSearch,
  releaseDialcode: releaseDialcode,
  reserveDialcode: reserveDialcode
}