/* eslint-disable indent */
import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table({
  timestamps: false,
  tableName: 'transactions',
})
export class Transaction extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    field: 'transactionId',
  })
  transactionId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'userId',
  })
  userId!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'amount',
  })
  amount!: number;

  @Column({
    type: DataType.ENUM('Pending', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending',
    field: 'status',
  })
  status!: string;
}
