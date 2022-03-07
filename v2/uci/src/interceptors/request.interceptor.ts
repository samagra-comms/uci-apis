import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import lodash from 'lodash'
import {uuidV1} from 'uuid'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
   getAppIDForRESP(path) {
    var arr = path
      .split(":")[0]
      .split("/")
      .filter(function (n) {
        return n !== "";
      });
    var appId;
    if (arr.length === 1) {
      appId = "api." + arr[arr.length - 1];
    } else {
      appId = "api." + arr[arr.length - 2] + "." + arr[arr.length - 1];
    }
    return appId;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    req.body.ts = new Date();
    req.body.url = req.url;
    req.body.path = req.route.path;
    req.body.params = req.body.params ? req.body.params : {};
    req.body.params.msgid =
    req.get("x-msgid") || req.body.params.msgid || uuidV1();
    req.id = req.body.params.msgid;
    var rspObj = {
      apiId: this.getAppIDForRESP(req.body.path),
      path: req.body.path,
      msgid: req.body.params.msgid,
      result: {},
      startTime: new Date(),
      method: req.originalMethod,
      did: req.get("x-device-id"),
    };

 
  var removedHeaders = [
    "host",
    "origin",
    "accept",
    "referer",
    "content-length",
    "user-agent",
    "accept-language",
    "accept-charset",
    "cookie",
    "dnt",
    "postman-token",
    "cache-control",
    "connection",
  ];

  removedHeaders.forEach(function (e) {
    delete req.headers[e];
  });

  var requestedData = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: lodash.omit(req.headers, [
      "Authorization",
      "x-authenticated-user-token",
    ]),
  };

  req.rspObj = rspObj;
    return next.handle();
  }
}
