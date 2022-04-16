import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { MIDDLEWARE as MiddlewareMessages } from '../common/messages'; //done
import { RESPONSE_CODE as ResponseCodes } from '../common/messages';
import {
  catchError,
  concat,
  defer,
  from,
  ignoreElements,
  Observable,
  throwError,
} from 'rxjs';
import { PrismaService } from '../global-services/prisma.service';
import { getAppIdForResponse } from './utils/responseUtils';
import { v4 as uuidv4 } from 'uuid';

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

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const rspObj = req.body.respObj;
    const ownerOrgID = req.headers.ownerorgId;
    const ownerID = req.headers.ownerId;
    const asset = req.body.asset;

    req.body.ownerID = ownerID;
    req.body.ownerOrgID = ownerOrgID;

    let assetModel: any;
    switch (asset) {
      case 'bot':
        assetModel = this.prisma.bot;
        break;
      case 'userSegment':
        assetModel = this.prisma.userSegment;
        break;
      case 'conversationLogic':
        assetModel = this.prisma.conversationLogic;
        break;
      case 'forms':
      default:
        rspObj.ownerID = ownerID;
        return next.handle();
    }
    const resObj = await assetModel
      .findUnique({ where: { id: req.params.id } })
      .then((s) => {
        if (s && s.ownerID === ownerID) {
          resObj.ownerID = ownerID;
        } else {
          rspObj.errCode = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_CODE;
          rspObj.errMsg = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_MESSAGE;
          rspObj.responseCode = ResponseCodes.CLIENT_ERROR;
        }
        return rspObj;
      })
      .catch((e) => {
        console.log(e);
        rspObj.errCode = MiddlewareMessages.ADD_OWNER.FAILED_CODE;
        rspObj.errMsg = MiddlewareMessages.ADD_OWNER.FAILED_MESSAGE;
        rspObj.responseCode = ResponseCodes.CLIENT_ERROR;
        return rspObj;
      });
    // $ = Obverable<any>
    const resObj$ = from(resObj).pipe(
      ignoreElements(),
      catchError((err) => throwError(err)),
    );

    const main$ = next.handle().pipe((data) => {
      resObj.result = data;
      resObj.endTime = new Date();
      return rspObj;
    });

    return concat(main$, resObj$);
  }
}
