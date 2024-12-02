import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AccessTokenResponse,
  AuthServiceClient,
  UserId,
} from '../../../common/proto-ts-files/auth';
import { CreateUser } from '../../../common/proto-ts-files/user';
import { product, productById } from '../const/routes.map.const';
import { ProductServiceClient } from '../../../common/proto-ts-files/product';
import { OrderServiceClient } from '../../../common/proto-ts-files/order';

@Injectable()
export class GatewayService {
  private authService: AuthServiceClient;
  private productService: ProductServiceClient;
  private orderService: OrderServiceClient;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientGrpc,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
    this.productService =
      this.productClient.getService<ProductServiceClient>('ProductService');
    this.orderService =
      this.orderClient.getService<OrderServiceClient>('OrderService');
  }

  async createUser(body: CreateUser): Promise<AccessTokenResponse> {
    return lastValueFrom(this.authService.registration(body));
  }

  async login(body: UserId): Promise<AccessTokenResponse> {
    return lastValueFrom(this.authService.login(body));
  }

  async gatewaySort(path: string, body: any, method: string): Promise<any> {
    if (product.test(path) && method === 'POST') {
      return lastValueFrom(this.productService.buyProducts(body));
    } else if (productById.test(path) && method === 'GET') {
      const id = path.split('/')[2];
      return lastValueFrom(this.productService.getProductById({ id: id }));
    } else if (productById.test(path) && method === 'PUT') {
      const id = path.split('/')[2];
      return lastValueFrom(
        this.productService.updateProduct({ id: id, ...body }),
      );
    } else if (productById.test(path) && method === 'DELETE') {
      const id = path.split('/')[2];
      return lastValueFrom(this.productService.deleteProduct({ id: id }));
    } else {
      throw new NotFoundException('Invalid path');
    }
  }
}
