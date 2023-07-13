/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {User} from './users.model';
import {Role, Roles} from '../roles/roles.decorator';
import {AuthGuard} from '../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({summary: 'Получение всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: 'Получение пользователя по ID'})
  @ApiResponse({status: 200, type: User})
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @ApiOperation({summary: 'Удаление пользователя по ID'})
  @ApiResponse({status: 200, type: User})
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  removeUserById(@Param('id') id: number) {
    return this.userService.removeUser(id)
  }
}
