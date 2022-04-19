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
import {
  Bot,
  UserSegment,
  ConversationLogic,
} from 'prisma/generated/prisma-client-js';

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
    console.log('Inside addownerinterceptor', req.body);
    const rspObj = req.body.respObj;
    const ownerOrgId = req.headers.ownerorgid;
    const ownerId = req.headers.ownerid;
    const asset = req.body.asset;

    req.body.ownerId = ownerId;
    req.body.ownerOrgId = ownerOrgId;

    switch (asset) {
      case 'bot':
        const assetQueryResponseBot: Bot | null =
          await this.prisma.bot.findUnique({
            where: { id: req.params.id },
          });
        if (assetQueryResponseBot?.ownerID === ownerId) {
          rspObj.ownerId = ownerId;
        } else {
          rspObj.errCode = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_CODE;
          rspObj.errMsg = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_MESSAGE;
          rspObj.responseCode = ResponseCodes.CLIENT_ERROR;
        }
        break;
      case 'userSegment':
        const assetQueryResponseUS:
          | (UserSegment & {
              bots: Bot[];
            })
          | null = await this.prisma.userSegment.findUnique({
          where: { id: req.params.id },
          include: {
            bots: true,
          },
        });
        if (
          assetQueryResponseUS?.bots.map((bot) => bot.ownerID).includes(ownerId)
        ) {
          rspObj.ownerId = ownerId;
        } else {
          rspObj.errCode = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_CODE;
          rspObj.errMsg = MiddlewareMessages.ADD_OWNER.UNAUTHORIZED_MESSAGE;
          rspObj.responseCode = ResponseCodes.CLIENT_ERROR;
        }
        break;
      case 'conversationLogic':
      case 'forms':
      case 'secrets':
      default:
        rspObj.ownerId = ownerId;
        return next.handle();
    }
    // $ = Obverable<any>
    const resObj$ = from(rspObj).pipe(
      ignoreElements(),
      catchError((err) => throwError(err)),
    );

    const main$ = next.handle().pipe((data) => {
      rspObj.result = data;
      rspObj.endTime = new Date();
      return rspObj;
    });

    return concat(main$, resObj$);
  }
}
