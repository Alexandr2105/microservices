import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { OrderTable } from '../tables/order.table';

export class OrderRepository {
  constructor(
    @InjectModel(OrderTable)
    private readonly orderTable: typeof OrderTable,
  ) {}

  async createOrder(order: OrderTable, transaction: Transaction) {
    await order.save({ transaction });
  }
}
