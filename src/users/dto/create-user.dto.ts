import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email пользователя' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  readonly password: string;

  @ApiProperty({ example: 'stock', description: 'Склад пользователя' })
  readonly store?: string;
}
