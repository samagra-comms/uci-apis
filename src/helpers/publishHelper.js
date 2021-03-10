const uuid = require("uuid/v1")
const _ = require("lodash");
const envVariables = require("../envVariables");
const axios = require("axios");
const { from  } = require("rxjs");

function getContentMetaData(contentId, reqHeaders){
  const url = `${envVariables.CONTENT_SERVICE_URL}content/v3/read/${contentId}`;
  const option = {
    url: url,
    method: "get",
    headers: reqHeaders
  };
  return from(axios(option));
}

function getPublishContentEvent(metadata, textbookId, units) {
    metadata.pkgVersion = `${metadata.pkgVersion}.0`;
    if(metadata.subject){
      metadata.subject = _.isArray(metadata.subject) ? metadata.subject : [metadata.subject];
    }
    if(metadata.medium){
      metadata.medium = _.isArray(metadata.medium) ? metadata.medium : [metadata.medium];
    }
    if(_.isString(metadata.plugins)) {
      metadata.plugins = JSON.parse(metadata.plugins);
    }
    var originData = {};
    if(metadata.originData){
      originData = metadata.originData;
    }
    metadata = _.omit(metadata, [
      "downloadUrl",
      "variants",
      "previewUrl",
      "streamingUrl",
      "unitIdentifiers",
      "itemSets",
      "origin",
      "originData",
      "contentPolicyCheck",
      "questions"
    ]);
    metadata.processId = uuid();
    var ets = Date.now();
    var dataObj = {
      'eid': 'BE_JOB_REQUEST',
      'ets': ets,
      'mid': `LP.${ets}.${uuid()}`,
      'actor': {
        'id': 'Auto Creator',
        'type': 'System'
      },
      'context': {
        'pdata': {
          'ver': '1.0',
          'id': 'org.ekstep.platform'
        },
        'channel': metadata.channel,
        'env': envVariables.PUBLISH_ENV
      },
      'object': {
        'ver': '1.0',
        'id': metadata.identifier
      },
      'edata': {
        'action': 'auto-create',
        'iteration': 1,
        'objectType': 'Content',
        'repository': `${envVariables.baseURL}/api/content/v1/read/${metadata.identifier}`,
        "originData": originData,
        'metadata': metadata,
        'textbookInfo': {
          'identifier': textbookId,
          'unitIdentifiers': units
        }
      }
    }

    return dataObj;
  }


module.exports.getPublishContentEvent = getPublishContentEvent
module.exports.getContentMetaData = getContentMetaData
