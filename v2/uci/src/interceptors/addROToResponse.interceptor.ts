import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable } from 'rxjs';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg

export interface Response<T> {
  data: T;
}

/**
 * @description
 * Adds response object created in addResponseObject.interceptor.ts to the response body.
 */
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
        rspObj.result = data;
        rspObj.endTime = new Date();
        return rspObj;
      }),
    );
  }
}
