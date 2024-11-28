import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AccessTokenResponse,
  AuthServiceClient,
  UserId,
} from '../../../common/proto-ts-files/auth';
import { RoutesMapConst } from '../const/routes.map.const';
import { CreateUser } from '../../../common/proto-ts-files/user';

@Injectable()
export class GatewayService {
  private authService: AuthServiceClient;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
  }

  async createUser(body: CreateUser): Promise<AccessTokenResponse> {
    return lastValueFrom(this.authService.registration(body));
  }

  async login(body: UserId): Promise<AccessTokenResponse> {
    return lastValueFrom(this.authService.login(body));
  }

  async gatewaySort(path: string, body: any): Promise<any> {
    if (path.startsWith('/auth/')) {
      console.log(path);
      console.log(RoutesMapConst[path]);
      return await this.createUser(body);
    } else if (path.startsWith('/users/')) {
      return 'users';
    } else if (path.startsWith('/products/')) {
      return 'products';
    } else if (path.startsWith('/orders/')) {
      return 'orders';
    }
    throw new NotFoundException('Invalid path');
  }
}
