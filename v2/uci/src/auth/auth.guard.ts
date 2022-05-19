import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  adminToken: string | undefined;
  instance: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
    this.adminToken = configService.get<string>('ADMIN_TOKEN');
    this.instance = configService.get<string>('INSTANCE_ID');
  }

  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split(' ')[1];
    let tokenData: any;
    const isAdmin =
      request.headers['admin-token'] !== undefined &&
      request.headers['admin-token'] === this.adminToken;
    request.headers['isAdmin'] = isAdmin;
    try {
      tokenData = this.jwtService.verify(token);
      let userId;
      if (this.instance === 'sunbird') {
        userId = tokenData.sub.split(':')[tokenData.sub.split(':').length - 1];
      } else {
        userId = tokenData.sub;
      }
      // Either the user is an admin or the user is the owner of the resource
      return userId === request.headers['ownerid'] || isAdmin;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
