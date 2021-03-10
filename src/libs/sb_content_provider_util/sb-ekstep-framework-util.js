var httpUtil = require('sb-http-util')
var configUtil = require('sb-config-util')
const TelemetryUtil = require('sb_telemetry_util') 
const telemetry = new TelemetryUtil() 

var getHttpOptions = function (url, data, method, formData, headers) {
  var defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': configUtil.getConfig('CONTENT_REPO_AUTHORIZATION_TOKEN')
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

getChannelValuesById = function (channelId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CHANNEL_URI') + '/' + channelId
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

ChannelList = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CHANNEL_LIST_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelSearch = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CHANNEL_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelCreate = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CHANNEL_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

ChannelUpdate = function (data, channelId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('CHANNEL_UPDATE_URI') + '/' + channelId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

getFrameworkById = function (frameworkId, querystring, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_URI') + '/' + frameworkId + querystring
  var options = getHttpOptions(url, null, 'GET', false, headers)
  sendRequest(options, cb)
}

frameworklList = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_LIST_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

frameworkCreate = function (data, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

frameworkUpdate = function (data, frameworkId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_UPDATE_URI') + '/' + frameworkId
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  sendRequest(options, cb)
}

frameworkCopy = function (data, frameworkId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_COPY_URI') + '/' + frameworkId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}

getFrameworkTerm = function (query, category, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_URI') + '/' + category
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermSearch = function (data, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermCreate = function (data, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkTermUpdate = function (data, query, category, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_TERM_UPDATE_URI') + '/' + category
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

getFrameworkCategoryInstance = function (query, category, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_URI') + '/' + category
  var options = getHttpOptions(url, null, 'GET', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceSearch = function (data, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_SEARCH_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceCreate = function (data, query, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_CREATE_URI')
  var options = getHttpOptions(url, data, 'POST', false, headers)
  options.qs = query
  sendRequest(options, cb)
}

frameworkCategoryInstanceUpdate = function (data, query, category, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_CATEGORY_INSTANCE_UPDATE_URI') + '/' + category
  var options = getHttpOptions(url, data, 'PATCH', false, headers)
  options.qs = query
  sendRequest(options, cb)
}


frameworkPublish = function (data, frameworkId, headers, cb) {
  var url = configUtil.getConfig('CONTENT_REPO_BASE_URL') + configUtil.getConfig('FRAMEWORK_PUBLISH_URI') + '/' + frameworkId
  var options = getHttpOptions(url, data, 'POST', false, headers)
  sendRequest(options, cb)
}
/**
 * This function used to generate api_call log event
 * @param {Object} data
 */
function generateApiCallLogEvent (http_options) {
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

function sendRequest (http_options, cb) {
  var options = Object.assign({}, http_options)
  //removed api call event
  //generateApiCallLogEvent(http_options)
  delete options.headers['telemetryData']

  httpUtil.sendRequest(options, function (err, resp, body) {
    if (resp && resp.statusCode && body) {
      body.statusCode = resp.statusCode ? resp.statusCode : 500
      cb(null, body)
    } else {
      cb(true, null)
    }
  })
}

module.exports = {
  getChannelValuesById: getChannelValuesById,
  ChannelCreate: ChannelCreate,
  ChannelUpdate: ChannelUpdate,
  ChannelList: ChannelList,
  ChannelSearch: ChannelSearch,
  getFrameworkById: getFrameworkById,
  frameworklList: frameworklList,
  frameworkCreate: frameworkCreate,
  frameworkUpdate: frameworkUpdate,
  frameworkCopy: frameworkCopy,
  getFrameworkTerm: getFrameworkTerm,
  frameworkTermSearch: frameworkTermSearch,
  frameworkTermCreate: frameworkTermCreate,
  frameworkTermUpdate: frameworkTermUpdate,
  getFrameworkCategoryInstance: getFrameworkCategoryInstance,
  frameworkCategoryInstanceSearch: frameworkCategoryInstanceSearch,
  frameworkCategoryInstanceCreate: frameworkCategoryInstanceCreate,
  frameworkCategoryInstanceUpdate: frameworkCategoryInstanceUpdate,
  frameworkPublish: frameworkPublish
}
