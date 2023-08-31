import { Model, Column, DataType, Table } from 'sequelize-typescript';

export interface IProductInterface {
  code: number;
  article: string;
  title: string;
  cross: number;
  description: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, IProductInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  code: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  article: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cross: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}
