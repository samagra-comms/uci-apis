import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { getAppIdForResponse } from 'src/interceptors/utils/responseUtils';
import { PrismaService } from 'src/global-services/prisma.service';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg

/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
const findOne = (haystack, arr) => {
  return arr.some((v) => haystack.includes(v));
};

@Injectable()
export class AddOwnerInfoInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  isValidReq(req, urlsWithVerification) {
    return (
      findOne(req.originalUrl, urlsWithVerification) &&
      req.query.id !== undefined &&
      req.query.id !== null
    );
  }

  getReqAsset = (assetString) => {
    if (assetString === 'bot') return this.prisma['bot'];
    else if (assetString === 'userSegment') return this.prisma['userSegment'];
    else if (assetString === 'conversationLogic')
      return this.prisma['conversationLogic'];
    else if (assetString === 'forms') return 'forms';
    else return null;
  };

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
