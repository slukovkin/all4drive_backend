import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'stores'})
export class Store extends Model<Store> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @Column({type: DataType.STRING})
    description: string
}