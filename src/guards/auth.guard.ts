/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isToken = request.headers.authorization;
    if (!isToken) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован'});
    }
    const bearer = isToken.split(' ')[0];
    const token = isToken.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован'});
    }

    const user = this.jwtService.verify(token);
    request.user = user;
    return true;
  }
}
