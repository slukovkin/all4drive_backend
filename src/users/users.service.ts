import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        try {
            // const candidate = await this.userRepository.findAll({where: {email: dto.email}})
            // if (candidate) {
            //     return new HttpException(`Пользователь ${dto.email} существует в БД`, HttpStatus.CONFLICT)
            // }
            const user = await this.userRepository.create(dto)
            const role = await this.roleService.getRoleByValue('user')
            await user.$set('roles', [role.id])
            return user
        } catch (e) {
            return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getOneUser(id: string) {
        const user = await this.userRepository.findByPk(id)
        return user
    }
}
