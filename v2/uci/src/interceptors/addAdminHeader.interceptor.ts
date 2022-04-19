import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

// Nestjs Lifecyle - https://i.stack.imgur.com/2lFhd.jpg
@Injectable()
export class AddAdminHeaderInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['admin-token'];
    if (this.config.get('ADMIN_TOKEN') === token && token !== undefined) {
      req.body.isAdmin = true;
    } else {
      req.body.isAdmin = false;
    }
    // for testing
    context.switchToHttp().getRequest().body = req.body;
    return next.handle();
  }
}
