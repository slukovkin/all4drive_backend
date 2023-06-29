import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private storeService: StoresService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByValue('user');
      const store = await this.storeService.getStoreByValue(dto.store);
      await user.$set('stores', [store.id]);
      await user.$set('roles', [role.id]);
      user.roles = [role];
      user.stores = [store];
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
      include: { all: true }
    });
    return user;
  }
}
