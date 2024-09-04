import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log({ token });
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('VERIFYING TOKEN');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log({ payload });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error) {
      console.log('ERROR VERIFYING TOKEN', error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(
      'EXTRACTING TOKEN FROM HEADER',
      request.cookies['access_token']['access_token'],
    );
    return request.cookies?.['access_token']?.['access_token'];
  }
}
