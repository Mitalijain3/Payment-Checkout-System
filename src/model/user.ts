/* eslint-disable indent */
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    field: 'userId',
  })
  userId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'password',
  })
  password!: string;
}
