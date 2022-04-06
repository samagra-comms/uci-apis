import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg

@Injectable()
export class AddAdminHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['admin-token'];
    console.log('admin-token', token);
    if (process.env.ADMIN_TOKEN === token) {
      req.body.isAdmin = true;
    } else {
      req.body.isAdmin = false;
    }
    return next.handle();
  }
}
