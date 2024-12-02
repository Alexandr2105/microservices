import { InjectModel } from '@nestjs/sequelize';
import { OrderTable } from '../tables/order.table';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderTable)
    private readonly orderTable: typeof OrderTable,
  ) {}

  async createOrder(order: OrderTable): Promise<OrderTable> {
    return order.save();
  }
}
