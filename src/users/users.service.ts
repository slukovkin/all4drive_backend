import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        try {
            const candidate = await this.userRepository.findAll({where: {email: dto.email}})
            if (candidate) {
                return new HttpException(`Пользователь ${dto.email} существует в БД`, HttpStatus.CONFLICT)
            }
            const user = await this.userRepository.create(dto)
            return user
        } catch (e) {
            return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }

    async getOneUser(id: string) {
        const user = await this.userRepository.findByPk(id)
        return user
    }
}
