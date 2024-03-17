/* eslint-disable indent */
import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Transaction } from './transaction';

@Table({
  timestamps: false,
  tableName: 'payment_methods',
})
export class PaymentMethod extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    field: 'paymentId',
  })
  paymentId!: string;

  @ForeignKey(() => Transaction)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'transactionId',
  })
  transactionId!: string;

  @Column({
    type: DataType.ENUM('Card', 'Crypto', 'Bank Transfer'),
    allowNull: false,
    field: 'method',
  })
  method!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'amount',
  })
  amount!: number;
}
