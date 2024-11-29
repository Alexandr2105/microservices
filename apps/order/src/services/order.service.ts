import { Injectable } from '@nestjs/common';
import { OrderQueryRepository } from '../repositories/order.query.repository';
import { OrderTable } from '../tables/order.table';

@Injectable()
export class OrderService {
  constructor(private readonly orderQueryRepository: OrderQueryRepository) {}

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

  async buyProducts(command: any): Promise<void> {
    console.log(command);
    // const cartInfo = await this.cartQueryRepository.getCartByUserId(
    //   command.userId,
    //   StatusTypeForCart.pending,
    // );
    // if (!cartInfo) {
    //   throw new BadRequestException({
    //     field: 'cart',
    //     message: 'Такой корзины не существует',
    //   });
    // }
    //
    // cartInfo.status = StatusTypeForCart.finish;
    // await this.cartRepository.saveCart(cartInfo, transaction);
    //
    // const newOrder = Order.build({
    //   userId: cartInfo.userId,
    // });
    //
    // await this.orderRepository.createOrder(newOrder, transaction);
    //
    // for (const cartItem of cartInfo.cartItems) {
    //   const newOrderItem = OrderItem.build({
    //     orderId: newOrder.id,
    //     productId: cartItem.productId,
    //     quantity: cartItem.quantity,
    //     price: cartItem.product.price,
    //   });
    //
    //   await this.orderRepository.createOrderItem(newOrderItem, transaction);
    // }
  }
}
