import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { getAppIdForResponse } from 'src/interceptors/utils/responseUtils';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg

@Injectable()
export class AddResponseObjectInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.body = req.body || {};
    req.body.ts = new Date();
    req.body.url = req.url;
    req.body.path = req.path;
    req.body.params = req.body.params ? req.body.params : {};
    req.body.params.msgid = req.body.params.msgid || uuidv4();
    req.body.id = req.body.params.msgid;
    const rspObj = {
      apiId: getAppIdForResponse(req.body.url),
      path: req.body.url,
      apiVersion: 'v1',
      msgid: req.body.params.msgid,
      result: {},
      startTime: new Date(),
      method: req.method,
      did: req.headers['x-device-id'],
    };

    const removedHeaders = [
      'host',
      'origin',
      'accept',
      'referer',
      'content-length',
      'user-agent',
      'accept-language',
      'accept-charset',
      'cookie',
      'dnt',
      'postman-token',
      'cache-control',
      'connection',
    ];

    removedHeaders.forEach(function (e) {
      delete req.headers[e];
    });

    req.body.respObj = rspObj;
    return next.handle();
  }
}
