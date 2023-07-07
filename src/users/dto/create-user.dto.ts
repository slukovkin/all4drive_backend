import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'user@gmail.com', description: 'Email пользователя'})
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({example: '123456', description: 'Пароль пользователя'})
  @IsNotEmpty()
  @Length(4, 10)
  readonly password: string;
  //
  // @ApiProperty({example: 'stock', description: 'Склад пользователя'})
  // readonly store: string;
}
