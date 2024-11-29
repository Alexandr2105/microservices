import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { OrderTable } from '../tables/order.table';

@Injectable()
export class OrderQueryRepository {
  constructor(
    @InjectModel(OrderTable)
    private readonly orderTable: typeof OrderTable,
  ) {}

  async getQueryOrders(
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<OrderTable[]> {
    return this.orderTable.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  }

  async getAllOrdersForCurrentUser(userId: string) {
    return this.orderTable.findAll({
      where: { userId: userId },
    });
  }
}
