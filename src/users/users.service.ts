import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByValue('user');
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      return new HttpException('Bad requiest', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getOneUser(id: string) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      rejectOnEmpty: undefined,
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async removeUser(id: number) {
    const isDestroyUser = await this.userRepository.destroy({ where: { id } });
    if (isDestroyUser) {
      return new HttpException(
        'deleting the user of the database',
        HttpStatus.OK
      );
    }
    return new HttpException('Deleted the user failed', HttpStatus.BAD_REQUEST);
  }
}
