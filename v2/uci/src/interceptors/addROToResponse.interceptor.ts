import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable } from 'rxjs';
import { getAppIdForResponse } from 'src/interceptors/utils/responseUtils';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg
// Adds response object created in v2/uci/src/interceptors/addResponseObject.interceptor.ts to the response body.

export interface Response<T> {
  data: T;
}

@Injectable()
export class AddROToResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const rspObj = req.body.respObj;
    return next.handle().pipe(
      map((data) => {
        console.log('Response Interceptor', data);
        rspObj.result = data;
        rspObj.endTime = new Date();
        return rspObj;
      }),
    );
  }
}
