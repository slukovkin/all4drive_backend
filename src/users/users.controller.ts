import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User] })
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Получение пользователя по ID'})
    @ApiResponse({status: 200, type: User })
    @Get(':id')
    getOneUser(@Param('id') id: string) {
        return this.userService.getOneUser(id)
    }
}
