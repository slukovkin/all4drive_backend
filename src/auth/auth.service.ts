import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      return new HttpException(
        'A user with this email exists in the database',
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.userService.createUser(dto);
    return this.generateToken(user)
  }

  private async generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      stores: user.stores,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный емайл или пароль',
      });
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (isPasswordValid) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }
}
