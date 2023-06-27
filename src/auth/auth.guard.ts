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
    let token = "";
    if (request.headers['authorization']) {
      token = request.headers['authorization'].split(' ')[1];
    }
    let tokenData: any;
    const isAdmin =
      request.headers['admin-token'] !== undefined &&
      request.headers['admin-token'] === this.adminToken;
    request.headers['isAdmin'] = isAdmin;
    console.log(`isAdmin: ${isAdmin}`);
    if(isAdmin) return true; //Break circuit early.
    try {
      let userId;
      if(token !== "") {
        tokenData = this.jwtService.verify(token);
        if (this.instance === 'sunbird') {
          userId = tokenData.sub.split(':')[tokenData.sub.split(':').length - 1];
        } else {
          userId = tokenData.sub;
        }
      }
      // Either the user is an admin or the user is the owner of the resource
      if(userId === undefined) return false; //undefined userId means invalid token
      return userId === request.headers['ownerid'] || isAdmin;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
