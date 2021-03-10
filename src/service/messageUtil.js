exports.COMPOSITE = {

  CONTENT_TYPE: [
    'Collection', 'LessonPlan', 'Resource', 'TextBook'
  ]
}

exports.ERRORCODES = {
  CODE1: '01',
  CODE2: '02',
  CODE3: '03',
  CODE4: '04',
  CODE5: '05',
  CODE6: '06',
  CODE7: '07'
}

exports.COURSE = {

  SEARCH: {
    MISSING_CODE: 'ERR_COURSE_SEARCH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for search course are missing',
    FAILED_CODE: 'ERR_COURSE_SEARCH_FAILED',
    FAILED_MESSAGE: 'Search course failed'
  },

  CREATE: {
    MISSING_CODE: 'ERR_COURSE_CREATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for create course are missing',
    FAILED_CODE: 'ERR_COURSE_CREATE_FAILED',
    FAILED_MESSAGE: 'Create course failed'
  },

  UPDATE: {
    MISSING_CODE: 'ERR_COURSE_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update course are missing',
    FAILED_CODE: 'ERR_COURSE_UPDATE_FAILED',
    FAILED_MESSAGE: 'Update course failed'
  },

  REVIEW: {
    MISSING_CODE: 'ERR_COURSE_REVIEW_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for review course are missing',
    FAILED_CODE: 'ERR_COURSE_REVIEW_FAILED',
    FAILED_MESSAGE: 'Review course failed'
  },

  PUBLISH: {
    MISSING_CODE: 'ERR_COURSE_PUBLISH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for publish course are missing',
    FAILED_CODE: 'ERR_COURSE_PUBLISH_FAILED',
    FAILED_MESSAGE: 'Publish course failed'
  },

  GET: {
    FAILED_CODE: 'ERR_COURSE_GET_FAILED',
    FAILED_MESSAGE: 'Get course failed'
  },

  GET_MY: {
    FAILED_CODE: 'ERR_COURSE_GET_MY_FAILED',
    FAILED_MESSAGE: 'Get my course failed'
  },

  HIERARCHY: {
    MISSING_CODE: 'ERR_COURSE_HIERARCHY_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get course hierarchy are missing',
    FAILED_CODE: 'ERR_COURSE_HIERARCHY_FAILED',
    FAILED_MESSAGE: 'Get course hierarchy failed'
  },

  HIERARCHY_UPDATE: {
    MISSING_CODE: 'ERR_COURSE_HIERARCHY_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update course hierarchy are missing',
    FAILED_CODE: 'ERR_COURSE_HIERARCHY_UPDATE_FAILED',
    FAILED_MESSAGE: 'Update course hierarchy failed'
  },

  MIME_TYPE: 'application/vnd.ekstep.content-collection',
  CONTENT_TYPE: 'Course',
  PREFIX_CODE: 'org.sunbird.'
}

exports.CONTENT = {

  SEARCH: {
    MISSING_CODE: 'ERR_CONTENT_SEARCH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for search content are missing',
    FAILED_CODE: 'ERR_CONTENT_SEARCH_FAILED',
    FAILED_MESSAGE: 'Search content failed'
  },

  CREATE: {
    MISSING_CODE: 'ERR_CONTENT_CREATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for create content are missing',
    FAILED_CODE: 'ERR_CONTENT_CREATE_FAILED',
    FAILED_MESSAGE: 'Create content failed'
  },

  UPDATE: {
    MISSING_CODE: 'ERR_CONTENT_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update content are missing',
    FAILED_CODE: 'ERR_CONTENT_UPDATE_FAILED',
    FAILED_MESSAGE: 'Update content failed'
  },

  UPLOAD: {
    MISSING_CODE: 'ERR_CONTENT_UPLOAD_FILES_MISSING',
    MISSING_MESSAGE: 'Required files for upload content are missing',
    FAILED_CODE: 'ERR_CONTENT_UPLOAD_FAILED',
    FAILED_MESSAGE: 'Upload content failed'
  },

  REVIEW: {
    MISSING_CODE: 'ERR_CONTENT_REVIEW_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for review content are missing',
    FAILED_CODE: 'ERR_CONTENT_REVIEW_FAILED',
    FAILED_MESSAGE: 'Review content failed'
  },

  PUBLISH: {
    MISSING_CODE: 'ERR_CONTENT_PUBLISH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for publish content are missing',
    FAILED_CODE: 'ERR_CONTENT_PUBLISH_FAILED',
    FAILED_MESSAGE: 'Publish content failed'
  },

  GET: {
    MISSING_CODE: 'ERR_CONTENT_GET_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get content are missing',
    FAILED_CODE: 'ERR_CONTENT_GET_FAILED',
    FAILED_MESSAGE: 'Get content failed',
    INFOCREATOR: 'Api access for creator user',
    INFOREVIEWER: 'Api access for reviewer user'
  },

  GET_MY: {
    FAILED_CODE: 'ERR_CONTENT_GET_MY_FAILED',
    FAILED_MESSAGE: 'Get my content failed'
  },

  RETIRE: {
    MISSING_CODE: 'ERR_CONTENT_RETIRE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for retire content are missing',
    FAILED_CODE: 'ERR_CONTENT_RETIRE_FAILED',
    FAILED_MESSAGE: 'Retire content failed'
  },

  REJECT: {
    MISSING_CODE: 'ERR_CONTENT_REJECT_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for reject content are missing',
    FAILED_CODE: 'ERR_CONTENT_REJECT_FAILED',
    FAILED_MESSAGE: 'Reject content failed'
  },

  FLAG: {
    MISSING_CODE: 'ERR_CONTENT_FLAG_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for flag content are missing',
    FAILED_CODE: 'ERR_CONTENT_FLAG_FAILED',
    FAILED_MESSAGE: 'Flag content failed'
  },

  ACCEPT_FLAG: {
    MISSING_CODE: 'ERR_CONTENT_ACCEPT_FLAG_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for accept flag are missing',
    FAILED_CODE: 'ERR_CONTENT_ACCEPT_FLAG_FAILED',
    FAILED_MESSAGE: 'Accept flag for content failed'
  },

  REJECT_FLAG: {
    MISSING_CODE: 'ERR_CONTENT_REJECT_FLAG_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for reject flag are missing',
    FAILED_CODE: 'ERR_CONTENT_REJECT_FLAG_FAILED',
    FAILED_MESSAGE: 'Reject flag for content failed'
  },

  UPLOAD_URL: {
    MISSING_CODE: 'ERR_CONTENT_UPLOAD_URL_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for upload url are missing',
    FAILED_CODE: 'ERR_CONTENT_UPLOAD_URL_FAILED',
    FAILED_MESSAGE: 'Upload url for content failed'
  },

  HIERARCHY_UPDATE: {
    MISSING_CODE: 'ERR_CONTENT_HIERARCHY_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update hierarchy are missing',
    INFO: 'Hierarchy update api access'
  },

  UNLISTED_PUBLISH: {
    EXCEPTION_CODE: 'UNLSTPUB',
    MISSING_CODE: 'ERR_UNLISTED_PUBLISH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for unlisted publish content are missing',
    FAILED_CODE: 'ERR_UNLISTED_PUBLISH_FIELDS_FAILED',
    FAILED_MESSAGE: 'Unlisted publish content failed',
    INFO: 'Unlisted publish Program'
  },

  CONTENT_TYPE: [
    'Story',
    'Worksheet',
    'TextBook',
    'Collection'
  ],

  MIME_TYPE: [
    'application/vnd.ekstep.ecml-archive',
    'application/vnd.ekstep.html-archive',
    'application/vnd.android.package-archive',
    'application/vnd.ekstep.content-archive',
    'application/vnd.ekstep.plugin-archive',
    'application/octet-stream',
    'application/msword',
    'application/pdf',
    'video/youtube',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tiff',
    'image/bmp',
    'image/gif',
    'image/svg+xml',
    'video/avi',
    'video/mpeg',
    'video/quicktime',
    'video/3gpp',
    'video/mpeg',
    'video/mp4',
    'video/ogg',
    'video/webm',
    'audio/mp3',
    'audio/mp4',
    'audio/mpeg',
    'audio/ogg',
    'audio/webm',
    'audio/x-wav',
    'audio/wav'
  ],
  PREFIX_CODE: 'org.sunbird.',
  ASSIGN_BADGE: {
    MISSING_CODE: 'ERR_CONTENT_ASSIGN_BADGE_MISSING',
    MISSING_MESSAGE: 'Required fields for assigning badge are missing',
    FAILED_CODE: 'ERR_CONTENT_ASSIGN_BADGE_FAILED',
    FAILED_MESSAGE: 'Assigning badge to content failed'
  },
  REVOKE_BADGE: {
    MISSING_CODE: 'ERR_CONTENT_REVOKE_BADGE_MISSING',
    MISSING_MESSAGE: 'Required fields for revoking badge are missing',
    FAILED_CODE: 'ERR_CONTENT_REVOKE_BADGE_FAILED',
    FAILED_MESSAGE: 'Assigning badge to content failed'
  },

  COPY: {
    MISSING_CODE: 'ERR_CONTENT_ID_MISSING',
    MISSING_MESSAGE: 'Content Id is missing for copying content',
    FAILED_CODE: 'ERR_CONTENT_COPY_FAILED',
    FAILED_MESSAGE: 'content copy failed'
  },

  SEARCH_PLUGINS: {
    MISSING_CODE: 'ERR_PLUGINS_SEARCH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for search plugins are missing',
    FAILED_CODE: 'ERR_PLUGINS_SEARCH_FAILED',
    FAILED_MESSAGE: 'Searching plugins failed'
  },

  COLLABORATORS: {
    MISSING_CODE: 'ERR_CONTENT_COLLABORATORS_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update collaborators are missing',
    FAILED_CODE: 'ERR_CONTENT_COLLABORATORS_UPDATE_FAILED',
    FAILED_MESSAGE: 'Update collaborators failed',
    FORBIDDEN: 'FORBIDDEN'
  },

  CREATE_LOCK: {
    MISSING_CODE: 'ERR_LOCK_CREATION_FIELDS_MISSING',
    MISSING_MESSAGE: 'request is required',
    FAILED_CODE: 'ERR_LOCK_CREATION_FAILED',
    FAILED_MESSAGE: 'Creating lock failed',
    ALREADY_LOCKED: 'The resource is already locked by {{Name}}',
    DEVICE_ID_MISSING: 'X-device-Id is missing in headers',
    SAME_USER_ERR_MSG: 'The resource is already locked by you in a different window/device',
    UNAUTHORIZED: 'You are not authorized to lock this resource',
    SELF_LOCKED_CODE: 'RESOURCE_SELF_LOCKED',
    LOCKED_CODE: 'RESOURCE_LOCKED'
  },

  REFRESH_LOCK: {
    MISSING_CODE: 'ERR_LOCK_REFRESHING_FIELDS_MISSING',
    MISSING_MESSAGE: 'request is required',
    FAILED_CODE: 'ERR_LOCK_REFRESHING_FAILED',
    FAILED_MESSAGE: 'Refreshing lock failed',
    NOT_FOUND_FAILED_MESSAGE: 'Resource is not locked',
    DEVICE_ID_MISSING: 'X-device-Id is missing in headers',
    UNAUTHORIZED: 'You are not authorized to refresh this resource',
    INVALID_LOCK_KEY: 'Invalid lock id'
  },

  RETIRE_LOCK: {
    MISSING_CODE: 'ERR_LOCK_RETIRING_FIELDS_MISSING',
    MISSING_MESSAGE: 'request is required',
    FAILED_CODE: 'ERR_LOCK_RETIRING_FAILED',
    FAILED_MESSAGE: 'Retiring lock failed',
    NOT_FOUND_FAILED_MESSAGE: 'Resource is not locked',
    DEVICE_ID_MISSING: 'X-device-Id is missing in headers',
    UNAUTHORIZED: 'You are not authorized to retire this resource'
  },

  LIST_LOCK: {
    FAILED_CODE: 'ERR_LISTING_LOCK_FAILED',
    FAILED_MESSAGE: 'Listing lock failed',
    DEVICE_ID_MISSING: 'X-device-Id is missing in headers'
  }
}

exports.REQUEST = {

  PARAMS: {
    MISSING_CID_CODE: 'ERR_REQUEST_FIELDS_CID_MISSING',
    MISSING_CID_MESSAGE: 'Required field consumer id is missing',
    MISSING_CHANNELID_CODE: 'ERR_REQUEST_FIELDS_CHANNEL_ID_MISSING',
    MISSING_CHANNELID_MESSAGE: 'Required field channel id is missing',
    INFO: 'Check for channel id'
  },
  TOKEN: {
    MISSING_CODE: 'ERR_TOKEN_FIELD_MISSING',
    MISSING_MESSAGE: 'Required field token is missing',
    INVALID_CODE: 'ERR_TOKEN_INVALID',
    INVALID_MESSAGE: 'Access denied',
    INFOVALIDATETOKEN: 'Validate user token',
    INFOMISSINGTOKEN: 'Missing token'
  }
}

exports.RESPONSE_CODE = {
  CLIENT_ERROR: 'CLIENT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  SUCCESS: 'OK',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  PROCESS_NOT_FOUND: 'PROCESS_NOT_FOUND',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  PARTIAL_SUCCESS: 'PARTIAL_SUCCESS',
  CONFIGURATION_KEY_NOT_FOUND: 'KEY_OR_ID_NOT_FOUND'
}

exports.API_VERSION = {
  V1: '1.0'
}

exports.SERVICE = {
  NAME: 'ContentService'
}

exports.UTILS = {
  UPLOAD: {
    MISSING_CODE: 'ERR_MEDIA_UPLOAD_FILES_MISSING',
    MISSING_MESSAGE: 'Required files for upload media are missing',
    FAILED_CODE: 'ERR_MEDIA_UPLOAD_FAILED',
    FAILED_MESSAGE: 'Upload media failed'
  },
  RESOURCE_BUNDLE: {
    MISSING_CODE: 'ERR_GET_RESOURCE_BUNDLE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get resource language are missing',
    FAILED_CODE: 'ERR_GET_RESOURCE_BUNDLE_FAILED',
    FAILED_MESSAGE: 'Get resource bundle failed'
  }
}

exports.DOMAIN = {

  GET_DOMAINS: {
    FAILED_CODE: 'ERR_GET_DOMAINS_FAILED',
    FAILED_MESSAGE: 'Get domains failed'
  },

  GET_DOMAIN_BY_ID: {
    MISSING_CODE: 'ERR_GET_DOMAIN_BY_ID_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get domain are missing',
    FAILED_CODE: 'ERR_GET_DOMAIN_BY_ID_FAILED',
    FAILED_MESSAGE: 'Get domain failed'
  },

  GET_OBJECTS: {
    MISSING_CODE: 'ERR_GET_OBJECTS_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get objects are missing',
    FAILED_CODE: 'ERR_GET_OBJECT_FAILED',
    FAILED_MESSAGE: 'Get objects failed'
  },

  GET_OBJECT_BY_ID: {
    MISSING_CODE: 'ERR_GET_OBJECT_BY_ID_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get object are missing',
    FAILED_CODE: 'ERR_GET_OBJECT_BY_ID_FAILED',
    FAILED_MESSAGE: 'Get object failed'
  },

  GET_CONCEPT_BY_ID: {
    MISSING_CODE: 'ERR_GET_CONCEPT_BY_ID_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get concept are missing',
    FAILED_CODE: 'ERR_GET_CONCEPT_BY_ID_FAILED',
    FAILED_MESSAGE: 'Get concept failed'
  },

  SEARCH_OBJECT_TYPE: {
    MISSING_CODE: 'ERR_SEARCH_OBJECT_TYPE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for search object type are missing',
    FAILED_CODE: 'ERR_SEARCH_OBJECT_TYPE_FAILED',
    FAILED_MESSAGE: 'Search object type failed'
  },

  CREATE_OBJECT_TYPE: {
    MISSING_CODE: 'ERR_CREATE_OBJECT_TYPE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for create object type are missing',
    FAILED_CODE: 'ERR_CREATE_OBJECT_TYPE_FAILED',
    FAILED_MESSAGE: 'Create object type failed'
  },

  UPDATE_OBJECT_TYPE: {
    MISSING_CODE: 'ERR_UPDATE_OBJECT_TYPE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update object type are missing',
    FAILED_CODE: 'ERR_UPDATE_OBJECT_TYPE_FAILED',
    FAILED_MESSAGE: 'Update object type failed'
  },

  RETIRE_OBJECT_TYPE: {
    MISSING_CODE: 'ERR_RETIRE_OBJECT_TYPE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for retire object type are missing',
    FAILED_CODE: 'ERR_RETIRE_OBJECT_TYPE_FAILED',
    FAILED_MESSAGE: 'Retire object type failed'
  }
}

exports.EMAIL = {
  CREATE_FLAG: {
    FAILED_CODE: 'ERR_SEND_CREATE_FLAG_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for create flag',
    SUBJECT: 'Flag raised for your content: Content Type: {{Content type}}, Title: {{Content title}} ',
    BODY: 'Your content is flagged by another user. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>' +
            '<b>Title: </b>{{Content title}}<br>' +
            '<b>Flag(s) Raised: </b>{{Flag reason}}<br>' +
            '<b>Content Status: </b>{{Content status}}<br>',
    TEMPLATE: 'contentFlagged'
  },
  ACCEPT_FLAG: {
    FAILED_CODE: 'ERR_SEND_ACCEPT_FLAG_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for accept flag',
    SUBJECT: 'Reviewer has accepted the flag for your content: {{Content type}} ',
    BODY: 'Your content has been flagged by the reviewer. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>' +
            '<b>Title: </b>{{Content title}}<br>' +
            '<b>Flag(s) Raised: </b>{{Flag reason}}<br>',
    TEMPLATE: 'acceptFlag'
  },
  REJECT_FLAG: {
    FAILED_CODE: 'ERR_SEND_REJECT_FLAG_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for reject flag',
    SUBJECT: 'Congratulations, your content is live! Content Type: {{Content type}}, Title: {{Content title}}',
    BODY: 'Congratulations! The content that you had submitted has been accepted for publication.' +
            ' It is now available for usage. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>' +
            '<b>Title: </b>{{Content title}}<br>' +
            '<b>Status: </b>{{Content status}}<br>',
    TEMPLATE: 'rejectFlag'
  },
  PUBLISHED_CONTENT: {
    FAILED_CODE: 'ERR_SEND_PUBLISHED_CONTENT_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for published content',
    SUBJECT: 'Congratulations, your content is live! Content Type: {{Content type}}, Title: {{Content title}}',
    BODY: 'Congratulations! The content that you had submitted has been accepted for publication. ' +
            'It will be available for usage shortly. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>  ' +
            '<b>Title: </b>{{Content title}}<br>',
    TEMPLATE: 'publishContent'
  },
  REJECT_CONTENT: {
    FAILED_CODE: 'ERR_SEND_REJECT_CONTENT_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for reject content',
    SUBJECT: 'Our sincere apologies! Content Type: {{Content type}}, Title: {{Content title}}',
    BODY: 'We acknowledge your contribution and effort in creating content for us.' +
            ' However, we are unable to accept the content that you submitted.<br>' +
            'We look forward to a more meaningful relationship with you, the next time around. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>' +
            '<b>Title: </b>{{Content title}}<br>' +
            '<b>Status: </b>{{Content status}}<br>',
    TEMPLATE: 'rejectContent'
  },
  UNLISTED_PUBLISH_CONTENT: {
    FAILED_CODE: 'ERR_SEND_UNLISTED_PUBLISH_CONTENT_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for unlist publish content',
    SUBJECT: 'Congratulations, your content {{Content title}} is live!',
    BODY: 'Congratulations! The content is now ready for limited sharing. ' +
            'You can share it using <a href=\'{{Share url}}\'>{{Share url}}</a>. <br><br>' +
            '<b>Content Type: </b>{{Content type}}<br>  ' +
            '<b>Title: </b>{{Content title}}<br>',
    TEMPLATE: 'unlistedPublishContent'
  },
  ADD_COLLABORATORS: {
    FAILED_CODE: 'ERR_SEND_ADD_COLLABORATORS_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for adding collaborators',
    SUBJECT: 'Congratulations! You are now a Collaborator',
    BODY: '{{User}} has added you as a collaborator for the ' +
    '{{Content type}}: {{Content title}}. View this in {{Content link}}',
    TEMPLATE: 'default'
  },
  REMOVE_COLLABORATORS: {
    FAILED_CODE: 'ERR_SEND_REMOVE_COLLABORATORS_EMAIL',
    FAILED_MESSAGE: 'Sending email failed for removing collaborators',
    SUBJECT: 'Removed as Collaborator',
    BODY: '{{User}} has removed you as a collaborator for the ' +
    '{{Content type}}: {{Content title}}',
    TEMPLATE: 'default'
  }
}

exports.HEALTH_CHECK = {
  EK_STEP: {
    NAME: 'ekstep.api',
    FAILED_CODE: 'CONTENT_PROVIDER_HEALTH_FAILED',
    FAILED_MESSAGE: 'Content provider service is not healthy'
  },
  LEARNER_SERVICE: {
    NAME: 'learnerservice.api',
    FAILED_CODE: 'LEARNER_SERVICE_HEALTH_FAILED',
    FAILED_MESSAGE: 'Learner service is not healthy'
  },
  CASSANDRA_DB: {
    NAME: 'cassandra.db',
    FAILED_CODE: 'CASSANDRA_HEALTH_FAILED',
    FAILED_MESSAGE: 'Cassandra db is not connected'
  }
}

exports.DIALCODE = {
  GENERATE: {
    MISSING_CODE: 'ERR_DIALCODE_GENERATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for generate dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_GENERATE_FAILED',
    FAILED_MESSAGE: 'Generate dialcode failed',
    MISSING_COUNT: 'ERR_DIALCODE_GENERATE_COUNT_ERROR',
    MISSING_COUNT_MESSAGE: 'Required fields count is missing or invalid'

  },

  LIST: {
    MISSING_CODE: 'ERR_DIALCODE_LIST_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for getting dialcode list are missing',
    FAILED_CODE: 'ERR_DIALCODE_LIST_FAILED',
    FAILED_MESSAGE: 'Getting dialcode list failed'
  },

  UPDATE: {
    MISSING_CODE: 'ERR_DIALCODE_UPDATE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_UPDATE_FAILED',
    FAILED_MESSAGE: 'Update dialcode failed'
  },

  GET: {
    MISSING_CODE: 'ERR_DIALCODE_GET_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_GET_FAILED',
    FAILED_MESSAGE: 'Get dialcode failed'
  },

  CONTENT_LINK: {
    MISSING_CODE: 'ERR_DIALCODE_CONTENT_LINK_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for content link dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_CONTENT_LINK_FAILED',
    FAILED_MESSAGE: 'Content link dialcode failed'
  },

  PROCESS: {
    MISSING_ID: 'ERR_DIALCODE_PROCESS_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for process status are missing',
    FAILED_CODE: 'ERR_DIALCODE_PROCESS_ID_FAILED',
    FAILED_MESSAGE: 'Unable get the process info',
    NOTFOUND_CODE: 'ERR_PROCESS_ID_NOT_FOUND',
    NOTFOUND_MESSAGE: 'Requested process id not found',
    INPROGRESS_MESSAGE: 'in-process',
    COMPLETED: 'completed'
  },

  SEARCH: {
    MISSING_CODE: 'ERR_DIALCODE_SEARCH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for search dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_SEARCH_FAILED',
    FAILED_MESSAGE: 'Search dialcode failed'
  },

  PUBLISH: {
    MISSING_CODE: 'ERR_DIALCODE_PUBLISH_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for publish dialcode are missing',
    FAILED_CODE: 'ERR_DIALCODE_PUBLISH_FAILED',
    FAILED_MESSAGE: 'Publish dialcode failed'
  },

  CREATE_PUBLISHER: {
    MISSING_CODE: 'ERR_CREATE_PUBLISHER_DIALCODE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for create publisher are missing',
    FAILED_CODE: 'ERR_CREATE_PUBLISHER_DIALCODE_FAILED',
    FAILED_MESSAGE: 'Create publisher failed'
  },

  UPDATE_PUBLISHER: {
    MISSING_CODE: 'ERR_UPDATE_PUBLISHER_DIALCODE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for update publisher are missing',
    FAILED_CODE: 'ERR_UPDATE_PUBLISHER_DIALCODE_FAILED',
    FAILED_MESSAGE: 'Update publisher failed'
  },

  GET_PUBLISHER: {
    MISSING_CODE: 'ERR_GET_PUBLISHER_DIALCODE_FIELDS_MISSING',
    MISSING_MESSAGE: 'Required fields for get publisher are missing',
    FAILED_CODE: 'ERR_GET_PUBLISHER_DIALCODE_FAILED',
    FAILED_MESSAGE: 'GET publisher failed'
  },

  RELEASE: {
    FAILED_CODE: 'ERR_RELEASING_DIALCODE_FAILED',
    FAILED_MESSAGE: 'Unable to release the dial code'
  },

  RESERVE: {
    FAILED_CODE: 'ERR_RESERVING_DIALCODE_FAILED',
    FAILED_MESSAGE: 'Unable to reserve the dial code'
  }
}

exports.DATASET = {
  SUBMIT: {
    FAILED_CODE: 'SUBMIT_DATASET_REQUEST_FAILED',
    FAILED_MESSAGE: 'Submit dataset request failed'
  },
  LIST: {
    FAILED_CODE: 'GET_DATASET_REQUEST_LIST_FAILED',
    FAILED_MESSAGE: 'Get dataset request list failed'
  },
  READ: {
    FAILED_CODE: 'GET_DATASET_REQUEST_FAILED',
    FAILED_MESSAGE: 'Get dataset request detail failed'
  },
  CHANNEL: {
    FAILED_CODE: 'GET_CHANNEL_DATASET_REQUEST_FAILED',
    FAILED_MESSAGE: 'Get channel dataset request failed'
  }
}

exports.FORM = {
  READ: {
    MISSING_CODE: 'ERR_GET_FORM_DATA',
    MISSING_MESSAGE: 'Required fields to get form are missing',
    FAILED_CODE: 'ERR_GET_FORM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to get the form data'
  },
  CREATE: {
    MISSING_CODE: 'ERR_CREATE_FORM_DATA',
    MISSING_MESSAGE: 'Required fields for creating form data are missing',
    FAILED_CODE: 'ERR_CREATE_FORM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to create the form data'
  },
  UPDATE: {
    MISSING_CODE: 'ERR_UPDATE_FORM_DATA',
    MISSING_MESSAGE: 'Required fields while updating form data are missing',
    FAILED_CODE: 'ERR_UPDATE_FORM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to update the form data'
  }
}

exports.PROGRAM = {
  EXCEPTION_CODE: 'PRG',
  READ: {
    EXCEPTION_CODE: 'PRRED',
    MISSING_CODE: 'ERR_GET_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields to get program are missing',
    FAILED_CODE: 'ERR_GET_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to get the program data',
    INFO: 'Get the program data'
  }, 
  LIST: {
    EXCEPTION_CODE: 'PRLST',
    MISSING_CODE: 'ERR_LIST_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields to get program are missing',
    FAILED_CODE: 'ERR_LIST_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to get list of the program data',
    INFO: 'List of the program data'
  },
  CREATE: {
    EXCEPTION_CODE: 'PRCRT',
    MISSING_CODE: 'ERR_CREATE_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields for creating program data are missing',
    FAILED_CODE: 'ERR_CREATE_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to create the program data',
    INFO: 'Create the program data'
  },
  UPDATE: {
    EXCEPTION_CODE: 'PRUPD',
    MISSING_CODE: 'ERR_UPDATE_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields while updating program data are missing',
    FAILED_CODE: 'ERR_UPDATE_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to update the program data',
    INFO: 'Update the program data'
  },
  PUBLISH: {
    EXCEPTION_CODE: 'PRPUB',
    MISSING_CODE: 'ERR_PUBLISH_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields while publishing program data are missing',
    FAILED_CODE: 'ERR_PUBLISH_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to publish the program data',
    INFO: 'Publish the program data'
  },
  LINK: {
    EXCEPTION_CODE: 'PRLNK',
    MISSING_CODE: 'ERR_LINKING_PROGRAM_TEXTBOOK',
    MISSING_MESSAGE: 'Required fields while linking textbook to program are missing',
    FAILED_CODE: 'ERR_LINKING_TEXBOOK_FAILED',
    FAILED_MESSAGE: 'Unable to link textbook to program',
    INFO: 'Get program update collection'
  },
  GENERATE_DETAILS: {
    EXCEPTION_CODE: 'PRDWN',
    MISSING_CODE: 'ERR_GENERATING_PROGRAM_DATA',
    MISSING_MESSAGE: 'Required fields like program_id<Array>, is missing',
    FAILED_CODE: 'ERR_GENERATING_PROGRAM_DATA_FAILED',
    FAILED_MESSAGE: 'Unable to generate the program data',
    INFO: 'Generate the program data'
  },
  CONTENT_REPORT: {
    EXCEPTION_CODE: 'PRRPT',
    MISSING_CODE: 'ERR_GENERATING_CONTENT_REPORT',
    MISSING_MESSAGE: 'Required fields like program_id<Array>,report is missing',
    FAILED_CODE: 'ERR_GENERATING_CONTENT_REPORT_FAILED',
    FAILED_MESSAGE: 'Unable to generate the content report',
    INFO: 'Generate the content report'
  },
  CONTENT_PUBLISH: {
    EXCEPTION_CODE: 'CNTPUB',
    MISSING_CODE: 'ERR_CONTENT_PUBLISH',
    MISSING_MESSAGE: 'Required fields like content_id or textbook_id or units missing',
    FAILED_CODE: 'ERR_CONTENT_PUBLISH_FAILED',
    FAILED_MESSAGE: 'Unable to publish contnet',
    INFO: 'Publish contnet'
  },
  LOG_MESSAGES: {
    NOMINATION: 'nomination successfully written to DB',
    USERMAPPING: {
      CREATED: 'Created User Org Mapping',
      UPDATED: 'User mapping updated successfully'
    }
  },
  NOMINATION: {
    READ: {
      EXCEPTION_CODE: 'NOMRED',
      MISSING_CODE: 'ERR_GET_NOMINATION_DATA',
      MISSING_MESSAGE: 'Required fields like program_id to get nomination are missing',
      FAILED_CODE: 'ERR_GET_NOMINATION_DATA_FAILED',
      FAILED_MESSAGE: 'Unable to get the nomination data'
    },
    CREATE: {
      EXCEPTION_CODE: 'NOMCRT',
      MISSING_CODE: 'ERR_CREATE_NOMINATION_DATA',
      MISSING_MESSAGE: 'Required fields like program_id, user_id, status for creating nomination data are missing',
      FAILED_CODE: 'ERR_CREATE_NOMINATION_DATA_FAILED',
      FAILED_MESSAGE: 'Unable to create the nomination data',
      INFO: 'Create the nomination data'
    },
    UPDATE: {
      EXCEPTION_CODE: 'NOMUPD',
      MISSING_CODE: 'ERR_UPDATE_NOMINATION_DATA',
      MISSING_MESSAGE: 'Required fields like program_id, user_id or organisation_id while updating nomination data are missing',
      FAILED_CODE: 'ERR_UPDATE_NOMINATION_DATA_FAILED',
      FAILED_MESSAGE: 'Unable to update the nomination data',
      INFO: 'Update the nomination data'
    },
    LIST: {
      EXCEPTION_CODE: 'NOMLST',
      MISSING_CODE: 'ERR_GET_NOMINATION_LIST',
      MISSING_MESSAGE: 'Required fields like program_id/user_id to get nomination are missing',
      FAILED_CODE: 'ERR_GET_NOMINATION_LIST_FAILED',
      FAILED_MESSAGE: 'Unable to get the nomination list',
      INFO: 'Get the nomination list'
    },
    DOWNLOAD_LIST: {
      EXCEPTION_CODE: 'NOMDWN',
      MISSING_CODE: 'ERR_DOWNLOADING_NOMINATION_DATA',
      MISSING_MESSAGE: 'Required fields like program_id, program_name, status while getting nomination data are missing',
      FAILED_CODE: 'ERR_DOWNLOADING_NOMINATION_DATA_FAILED',
      FAILED_MESSAGE: 'Unable to download the nomination data',
      QUERY_FAILED_MESSAGE: 'Unable to fetch query from DB',
      QUERY_FAILED_CODE: 'ERR_FETCHING_DATA_FROM_DB',
      INFO: 'download Nomination List'
    }
  },
  PREFERENCES: {
    CREATE: {
      EXCEPTION_CODE: 'PFCRT', 
      MISSING_CODE: 'ERR_CREATE_USER_PREFERENCE',
      MISSING_MESSAGE: 'Required fields like user_id, program_id for adding user preferences are missing',
      FAILED_CODE: 'ERR_CREATE_USER_PREFERENCE_FAILED',
      FAILED_MESSAGE: 'Unable to add user preferences',
      INFO: 'Set user program preferences'
    }, 
    SET: {
      EXCEPTION_CODE: 'PFSET', 
      MISSING_CODE: 'ERR_SET_USER_PREFERENCE',
      MISSING_MESSAGE: 'Required fields like user_id, program_id for setting user preferences are missing',
      FAILED_CODE: 'ERR_SET_USER_PREFERENCE_FAILED',
      FAILED_MESSAGE: 'Unable to set user preferences',
      INFO: 'Set user program preferences'
    },
    READ: {
      EXCEPTION_CODE: 'PFRED',
      MISSING_CODE: 'ERR_GET_USER_PREFERENCE',
      MISSING_MESSAGE: 'Required fields like user_id to get preference are missing',
      FAILED_CODE: 'ERR_GET_USER_PREFERENCE_FAILED',
      FAILED_MESSAGE: 'Unable to get the user preferences',
      INFO: 'Get user program preferences'
    },
    UPDATE: {
      EXCEPTION_CODE: 'PFUPD',
      MISSING_CODE: 'ERR_GET_USER_PREFERENCE',
      MISSING_MESSAGE: 'Required fields like user_id to get preference are missing',
      FAILED_CODE: 'ERR_UPDATE_USER_PREFERENCE_FAILED',
      FAILED_MESSAGE: 'Unable to update the user preferences'
    }
  },
  COPY_COLLECTION: {
    COPY: {
      EXCEPTION_CODE: 'CPYCOL',
      MISSING_CODE: 'ERR_COPYING_COLLECTIONS',
      MISSING_MESSAGE: 'Required fields like program_id, collections, allow_content_types, channel to copy textbook are missing',
      FAILED_CODE: 'ERR_COPY_COLLECTIONS_FAILED',
      FAILED_MESSAGE: 'Unable to copy the collection',
      INFO: 'Program copy collections'
    },
    SEARCH_DOCK_COLLECTION: {
      FAILED_CODE: 'ERR_SEARCHING_DOCK_FOR_COLLECTION',
      FAILED_MESSAGE: 'Unable to search collections'
    },
    GET_HIERARCHY: {
      FAILED_CODE: 'ERR_FETCHING_HIERARCHY_FOR_COLLECTION',
      FAILED_MESSAGE: 'Unable to fetch hierarchy for collections'
    },
    BULK_UPDATE_HIERARCHY: {
      FAILED_CODE: 'ERR_UPDATING_HIERARCHY',
      FAILED_MESSAGE: 'Unable to update hierarchy for collections'
    },
    CREATE_COLLECTION: {
      FAILED_CODE: 'ERR_CREATING_COLLECTION',
      FAILED_MESSAGE: 'Unable to create collection'
    }
  },
  PROGRAMCOUNTS_BYORG: {
    PROGRAMCOUNTS_FETCH: {
      EXCEPTION_CODE: 'PRMCNT',
      MISSING_CODE: 'ERR_GETTING_COUNTS',
      MISSING_MESSAGE: 'Error due to missing request or request.facets or request.facets.rootorg_id',
      FAILED_CODE: 'ERR_GET_PROGRAMCOUNTS_FAILED',
      FAILED_MESSAGE: 'Error while fetching program count group by facets',
      INFO: 'Fetching program count group by facets'
    },
    ORGSEARCH_FETCH: {
      FAILED_CODE: 'ERR_GET_ORGS_FAILED',
      FAILED_MESSAGE: 'Unable to search Organisations'
    }
  }
}

exports.CONTENT_TYPE = {
  FETCH: {
    EXCEPTION_CODE: 'CNTFET',
    FAILED_CODE: 'ERR_GET_PROGRAM_CONTENT_TYPE_FAILED',
    FAILED_MESSAGE: 'Unable to get the program content type',
    INFO: 'Program content type'
  }
}

exports.CONFIGURATION = {
  CREATE: {
    EXCEPTION_CODE: 'CNFCRT',
    MISSING_CODE: 'ERR_CREATING_CONFIGURATION',
    MISSING_MESSAGE: 'Required fields like key, value, status to create configuration are missing',
    FAILED_CODE: 'ERR_CREATE_CONFIGURATION_FAILED',
    FAILED_MESSAGE: 'Unable to create the configuration',
    INFO: 'Create the configuration'
  },
  UPDATE: { 
    EXCEPTION_CODE: 'CNFUPD',
    MISSING_CODE: 'ERR_UPDATING_CONFIGURATION',
    MISSING_MESSAGE: 'Required fields like key to update configuration are missing',
    FAILED_CODE: 'ERR_UPDATE_CONFIGURATION_FAILED',
    FAILED_MESSAGE: 'Unable to update the configuration',
    PROCESS_ID_MISSING_CODE: 'ERR_UPDATING_CONFIGURATION',
    PROCESS_ID_FAILED_MESSAGE: 'key not found',
    UPDATE_FAILED_CODE: 'ERR_UPDATING_CONFIGURATION',
    UPDATE_FAILED_MESSAGE: 'Unable to update configuration for the requested key',
    INFO: 'Update configuration'
  },
  SEARCH: {
    EXCEPTION_CODE: 'CNFSE',
    MISSING_CODE: 'ERR_SEARCHING_CONFIGURATION',
    MISSING_MESSAGE: 'Required fields like key, status to search for configuration are missing',
    INFO: 'Get configuration details by key'
  },
  FETCH: {
    EXCEPTION_CODE: 'CNFFET',
    FAILED_CODE: 'ERR_GETTING_CONFIGURATION_FAILED',
    FAILED_MESSAGE: 'Unable to fetch configuration',
    INFO: 'fetch configuration'
  }
}

exports.EXTERNAL_URL_META = {
  FETCH: {
    MISSING_CODE: 'ERR_FETCH_URLMETA_MISSING',
    MISSING_MESSAGE: 'Required fields for fetching url meta data are missing',
    FAILED_CODE: 'ERR_FETCH_URLMETA_FAILED',
    FAILED_MESSAGE: 'Unable to load the url metadata'
  }
}

exports.BULK_JOB_REQUEST = {
  CREATE: {
    EXCEPTION_CODE: 'BLJCRT',
    MISSING_CODE: 'ERR_CREATE_BULK_JOB',
    MISSING_MESSAGE: 'Required fields to create bulk job request are missing',
    FAILED_CODE: 'ERR_CREATE_BULK_JOB_REQUEST_FAILED',
    FAILED_MESSAGE: 'Unable to create the bulk job request',
    INFO: 'Create bulk Job'
  },
  READ: {
    EXCEPTION_CODE: 'BLJRED',
    FAILED_CODE: 'ERROR_READING_BULK_JOB_REQUEST',
    FAILED_MESSAGE: 'Error fetching bulk job request for the requested process_id',
    INFO: 'Read bulk Job'
  },
  UPDATE: {
    EXCEPTION_CODE: 'BLJUPD',
    MISSING_CODE: 'ERR_UPDATING_BULK_JOB_REQUEST',
    MISSING_MESSAGE: 'Required fields like process_id to update bulk job request are missing',
    FAILED_CODE: 'ERR_UPDATE_BULK_JOB_REQUEST_FAILED',
    FAILED_MESSAGE: 'Unable to update the bulk job request',
    PROCESS_ID_MISSING_CODE: 'ERR_UPDATING_BULK_JOB_REQUEST',
    PROCESS_ID_FAILED_MESSAGE: 'process_id not found',
    UPDATE_FAILED_CODE: 'ERR_UPDATING_BULK_JOB_REQUEST',
    UPDATE_FAILED_MESSAGE: 'Unable to update job for the request process_id',
    INFO: 'Update bulk Job'
  },
  SEARCH: {
    EXCEPTION_CODE: 'BLJSE',
    MISSING_CODE: 'ERR_SEARCHING_BULK_JOB_REQUEST',
    MISSING_MESSAGE: 'Required fields like filters are missing',
    FAILED_CODE: 'ERROR_SEARCHING_BULK_JOB_REQUEST',
    FAILED_MESSAGE: 'Unable to search for bulk job',
    INFO: 'Search bulk Job'
  }
}


exports.PROGRAM_FEED = {
  SEARCH: {
    EXCEPTION_CODE: 'PFDSE',
    MISSING_CODE: 'ERR_SEARCHING_PROGRAM_FEED',
    MISSING_MESSAGE: 'Required fields like <> are missing',
    FAILED_CODE: 'ERROR_SEARCHING_PROGRAM_FEED',
    FAILED_MESSAGE: 'Unable to search for program latest updates',
    INFO: 'Search For Program Feed Updates'
  }
}
