import { Body, Controller, Param, Query } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderTable } from './tables/order.table';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'BuyProducts')
  async buyProducts(@Body() body: any): Promise<OrderTable> {
    return this.orderService.buyProducts(body);
  }

  @GrpcMethod('OrderService', 'GetOrders')
  async getOrders(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Param() param: any,
  ): Promise<OrderTable[]> {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.orderService.getOrders(start, end, param.userId);
  }
}
