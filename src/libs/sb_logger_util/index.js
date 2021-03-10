/*
 * @file: index.js
 * @author: Anuj Gupta
 * @desc: using log4s, enables application wide logging.
 */
var log4js = require('log4js')
var fs = require('fs')
var dir = '../../log'
var configUtil = require('sb-config-util')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

var options = {
  'appenders': [{
    'type': 'clustered',
    'appenders': [
      {
        'type': 'console'
      }, {
        'type': 'logLevelFilter',
        'level': 'TRACE',
        'category': 'api',
        'appender': {
          'type': 'file',
          'maxLogSize': 26214400,
          'filename': '../../log/microService.log'
        }
      }
    ]
  }]
}

log4js.configure(options)
var logger = log4js.getLogger('api')

var isLoggerEnabled = function () {
  var loggerEnabled = configUtil.getConfig('ENABLE_LOGGING')
  return (loggerEnabled !== undefined && loggerEnabled === 'true')
}

var info = function (data) {
  if (data && isLoggerEnabled()) {
    logger.setLevel('INFO')
    logger.info(JSON.stringify(data))
  }
}

var error = function (data) {
  if (data && isLoggerEnabled()) {
    logger.setLevel('ERROR')
    logger.error(JSON.stringify(data))
  }
}

var warn = function (data) {
  if (data && isLoggerEnabled()) {
    logger.setLevel('WARN')
    logger.warn(JSON.stringify(data))
  }
}

var trace = function (data) {
  if (data && isLoggerEnabled()) {
    logger.setLevel('TRACE')
    logger.trace(JSON.stringify(data))
  }
}

module.exports.info = info
module.exports.error = error
module.exports.warn = warn
module.exports.trace = trace
