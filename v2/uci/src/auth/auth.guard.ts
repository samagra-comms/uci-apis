import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  adminToken: string | undefined;

  constructor(private readonly configService: ConfigService) {
    super();
    this.adminToken = configService.get<string>('ADMIN_TOKEN');
  }

  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request: Request = context.switchToHttp().getRequest();
    const isAdmin =
      request.headers['admin-token'] !== undefined &&
      request.headers['admin-token'] === this.adminToken;
    request.headers['isAdmin'] = isAdmin;
    return true;
  }
}
