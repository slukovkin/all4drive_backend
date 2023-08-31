import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: '64209557', description: 'Код продукта' })
  @IsNotEmpty()
  // @MinLength(8)
  readonly code: number;

  @ApiProperty({ example: 'OC282', description: 'Артикул продукта' })
  @IsNotEmpty()
  @MinLength(4)
  readonly article: string;

  @ApiProperty({
    example: 'Фильтр маслянный',
    description: 'Наименование продукта',
  })
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @ApiProperty({ example: '64209', description: 'Кросс-код продукта' })
  @IsNotEmpty()
  // @MaxLength(5)
  readonly cross: number;

  @ApiProperty({
    example: 'Фильтр для очистки масла',
    description: 'Описание продукта',
  })
  readonly description: string;
}
