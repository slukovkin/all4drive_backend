import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLEY_KEY } from '../roles/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requireRoles = this.reflector.getAllAndOverride<Role>(ROLEY_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requireRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const isToken = req.headers.authorization;
      const bearer = isToken.split(' ')[0];
      const token = isToken.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = this.jwtService.verify(token);
      // req.user = user;
      return user.roles.some((role) => requireRoles.includes(role.value));
    } catch (error) {
      throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN);
    }
  }
}
