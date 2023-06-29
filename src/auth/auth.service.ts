import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {

    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            return new HttpException('A user with this email exists in the database', HttpStatus.CONFLICT)
        }
        const passwordHash = await bcrypt.hash(dto.password, 10)
        const user = await this.userService.createUser({...dto, password: passwordHash})
        return this.generateToken(user)
    }

    async generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
            stores: user.stores
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
