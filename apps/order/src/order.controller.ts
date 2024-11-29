import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { OrderService } from './services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async buyProducts(@Body() body: any): Promise<void> {
    return this.orderService.buyProducts(body);
  }

  @Get(':userId')
  async getOrders(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Param() param: any,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.orderService.getOrders(start, end, param.userId);
  }
}
