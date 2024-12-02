import { Injectable } from '@nestjs/common';
import { OrderQueryRepository } from '../repositories/order.query.repository';
import { OrderTable } from '../tables/order.table';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderQueryRepository: OrderQueryRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async getOrders(
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<OrderTable[]> {
    if (startDate && endDate) {
      return this.orderQueryRepository.getQueryOrders(
        startDate,
        endDate,
        userId,
      );
    } else {
      return this.orderQueryRepository.getAllOrdersForCurrentUser(userId);
    }
  }

  async buyProducts(userId: string): Promise<OrderTable> {
    const newOrder = OrderTable.build({
      userId: userId,
    });

    return this.orderRepository.createOrder(newOrder);
  }
}
