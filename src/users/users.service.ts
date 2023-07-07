import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from './users.model';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {RolesService} from '../roles/roles.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {
  }

  async createUser(dto: CreateUserDto) {
    try {
      const passwordHash: string = await bcrypt.hash(dto.password, 10);
      const user = await this.userRepository.create({
        ...dto,
        password: passwordHash,
      });
      const role = await this.roleService.getRoleByValue('user');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getOneUser(id: string) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      rejectOnEmpty: undefined,
      where: {email},
      include: {all: true},
    });
    return user;
  }
}
