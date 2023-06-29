import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {UserStore} from "./user-store.model";

interface IStoreCreation {
    value: string
    description: string
}

@Table({tableName: 'stores'})
export class Store extends Model<Store, IStoreCreation> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @Column({type: DataType.STRING})
    description: string

    @BelongsToMany(() => User, () => UserStore)
    users: User[]
}