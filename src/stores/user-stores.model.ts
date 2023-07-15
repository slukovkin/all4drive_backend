import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Store } from './stores.model';

@Table({ tableName: 'user_stores', createdAt: false, updatedAt: false })
export class UserStore extends Model<UserStore> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER })
  storeId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
