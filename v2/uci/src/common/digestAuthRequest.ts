/**
 * Modified from the original source: by @inorganik to suit the needs of ODK Digest Auth
 * TODO: Refactor the Digest Auth provided here https://www.npmjs.com/package/digest-fetch.
 */

// digest auth request
// by @inorganik

// dependent upon CryptoJS MD5 hashing:
// http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import CryptoJS from 'crypto-js';

const digestAuthRequest = function (method, url, username, password) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  if (typeof CryptoJS === 'undefined' && typeof require === 'function') {
  }

  this.scheme = null; // we just echo the scheme, to allow for 'Digest', 'X-Digest', 'JDigest' etc
  this.nonce = null; // server issued nonce
  this.realm = null; // server issued realm
  this.qop = null; // "quality of protection" - '' or 'auth' or 'auth-int'
  this.response = null; // hashed response to server challenge
  this.opaque = null; // hashed response to server challenge
  this.nc = 1; // nonce count - increments with each request used with the same nonce
  this.cnonce = null; // client nonce

  // settings
  this.timeout = 10000; // timeout
  this.loggingOn = true; // toggle console logging

  // determine if a post, so that request will send data
  this.post = false;
  if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
    this.post = true;
  }

  // start here
  // successFn - will be passed JSON data
  // errorFn - will be passed error status code
  // data - optional, for POSTS
  this.request = function (successFn, errorFn, data) {
    // posts data as JSON if there is any
    if (data) {
      self.data = JSON.stringify(data);
    }
    self.successFn = successFn;
    self.errorFn = errorFn;

    if (!self.nonce) {
      self.makeUnauthenticatedRequest(self.data);
    } else {
      self.makeAuthenticatedRequest();
    }
  };
  this.makeUnauthenticatedRequest = function (data) {
    self.firstRequest = new XMLHttpRequest();
    self.firstRequest.open(method, url, true);
    self.firstRequest.timeout = self.timeout;
    // if we are posting, add appropriate headers
    if (self.post) {
      self.firstRequest.setRequestHeader('Content-type', 'application/json');
    }

    self.firstRequest.onreadystatechange = function () {
      // 2: received headers,  3: loading, 4: done
      if (self.firstRequest.readyState === 2) {
        let responseHeaders = self.firstRequest.getAllResponseHeaders();
        responseHeaders = responseHeaders.split('\n');
        // get authenticate header
        let digestHeaders;
        for (let i = 0; i < responseHeaders.length; i++) {
          if (responseHeaders[i].match(/www-authenticate/i) != null) {
            digestHeaders = responseHeaders[i];
          }
        }

        if (digestHeaders != null) {
          // parse auth header and get digest auth keys
          digestHeaders = digestHeaders.slice(
            digestHeaders.indexOf(':') + 1,
            -1,
          );
          digestHeaders = digestHeaders.split(',');
          self.scheme = digestHeaders[0].split(/\s/)[1];
          for (let i = 0; i < digestHeaders.length; i++) {
            const equalIndex = digestHeaders[i].indexOf('=');
            const key = digestHeaders[i].substring(0, equalIndex);
            let val = digestHeaders[i].substring(equalIndex + 1);
            val = val.replace(/['"]+/g, '');
            // find realm
            if (key.match(/realm/i) != null) {
              self.realm = val;
            }
            // find nonce
            if (key.match(/nonce/i) != null) {
              self.nonce = val;
            }
            // find opaque
            if (key.match(/opaque/i) != null) {
              self.opaque = val;
            }
            // find QOP
            if (key.match(/qop/i) != null) {
              self.qop = val;
            }
          }
          // client generated keys
          self.cnonce = self.generateCnonce();
          self.nc++;
          // if logging, show headers received:
          self.log('received headers:');
          self.log('	realm: ' + self.realm);
          self.log('	nonce: ' + self.nonce);
          self.log('	opaque: ' + self.opaque);
          self.log('	qop: ' + self.qop);
          // now we can make an authenticated request
          self.makeAuthenticatedRequest();
        }
      }
      if (self.firstRequest.readyState === 4) {
        if (self.firstRequest.status === 200) {
          self.log('Authentication not required for ' + url);
          if (self.firstRequest.responseText !== 'undefined') {
            if (self.firstRequest.responseText.length > 0) {
              // If JSON, parse and return object
              if (self.isJson(self.firstRequest.responseText)) {
                self.successFn(JSON.parse(self.firstRequest.responseText));
              } else {
                self.successFn({
                  responseText: self.firstRequest.responseText,
                  headers: self.responseHeaders,
                });
              }
            }
          } else {
            self.successFn();
          }
        }
      }
    };
    // send
    if (self.post) {
      // in case digest auth not required
      self.firstRequest.send(self.data);
    } else {
      self.firstRequest.send();
    }
    self.log('Unauthenticated request to ' + url);

    // handle error
    self.firstRequest.onerror = function () {
      if (self.firstRequest.status !== 401) {
        self.log(
          'Error (' +
            self.firstRequest.status +
            ') on unauthenticated request to ' +
            url,
        );
        self.errorFn(self.firstRequest.status);
      }
    };
  };
  this.makeAuthenticatedRequest = function () {
    self.response = self.formulateResponse();
    self.authenticatedRequest = new XMLHttpRequest();
    self.authenticatedRequest.open(method, url, true);
    self.authenticatedRequest.timeout = self.timeout;
    const digestAuthHeader =
      self.scheme +
      ' ' +
      'username="' +
      username +
      '", ' +
      'realm="' +
      self.realm +
      '", ' +
      'nonce="' +
      self.nonce +
      '", ' +
      'uri="' +
      url +
      '", ' +
      'response="' +
      self.response +
      '", ' +
      'opaque="' +
      self.opaque +
      '", ' +
      'qop=' +
      self.qop +
      ', ' +
      'nc=' +
      ('00000000' + self.nc).slice(-8) +
      ', ' +
      'cnonce="' +
      self.cnonce +
      '"';
    self.authenticatedRequest.setRequestHeader(
      'Authorization',
      digestAuthHeader,
    );
    self.log('digest auth header response to be sent:');
    self.log(digestAuthHeader);
    // if we are posting, add appropriate headers
    if (self.post) {
      self.authenticatedRequest.setRequestHeader(
        'Content-type',
        'application/json',
      );
    }
    self.authenticatedRequest.onload = function () {
      // success
      if (
        self.authenticatedRequest.status >= 200 &&
        self.authenticatedRequest.status < 400
      ) {
        // increment nonce count
        self.nc++;
        // return data
        if (
          self.authenticatedRequest.responseText !== 'undefined' &&
          self.authenticatedRequest.responseText.length > 0
        ) {
          // If JSON, parse and return object
          if (self.isJson(self.authenticatedRequest.responseText)) {
            self.successFn(JSON.parse(self.authenticatedRequest.responseText));
          } else {
            console.log(
              self.authenticatedRequest.getResponseHeader('Set-Cookie'),
            );
            self.successFn({
              responseText: self.authenticatedRequest.responseText,
              cookie: self.authenticatedRequest
                .getResponseHeader('Set-Cookie')[0]
                .split(';')[0],
            });
          }
        } else {
          self.successFn();
        }
      }
      // failure
      else {
        self.nonce = null;
        self.errorFn(self.authenticatedRequest.status);
      }
    };
    // handle errors
    self.authenticatedRequest.onerror = function () {
      self.log(
        'Error (' +
          self.authenticatedRequest.status +
          ') on authenticated request to ' +
          url,
      );
      self.nonce = null;
      self.errorFn(self.authenticatedRequest.status);
    };
    // send
    if (self.post) {
      self.authenticatedRequest.send(self.data);
    } else {
      self.authenticatedRequest.send();
    }
    self.log('Authenticated request to ' + url);
  };
  // hash response based on server challenge
  this.formulateResponse = function () {
    const HA1 = CryptoJS.MD5(
      username + ':' + self.realm + ':' + password,
    ).toString();
    const HA2 = CryptoJS.MD5(method + ':' + url).toString();
    const response = CryptoJS.MD5(
      HA1 +
        ':' +
        self.nonce +
        ':' +
        ('00000000' + self.nc).slice(-8) +
        ':' +
        self.cnonce +
        ':' +
        self.qop +
        ':' +
        HA2,
    ).toString();
    return response;
  };
  // generate 16 char client nonce
  this.generateCnonce = function () {
    const characters = 'abcdef0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      const randNum = Math.round(Math.random() * characters.length);
      token += characters.substr(randNum, 1);
    }
    return token;
  };
  this.abort = function () {
    self.log('[digestAuthRequest] Aborted request to ' + url);
    if (self.firstRequest != null) {
      if (self.firstRequest.readyState != 4) self.firstRequest.abort();
    }
    if (self.authenticatedRequest != null) {
      if (self.authenticatedRequest.readyState != 4)
        self.authenticatedRequest.abort();
    }
  };
  this.isJson = function (str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  this.log = function (str: string) {
    if (self.loggingOn) {
      console.log('[digestAuthRequest] ' + str);
    }
  };
  this.version = function () {
    return '0.8.0';
  };
};

module.exports = {
  digestAuthRequest,
};
