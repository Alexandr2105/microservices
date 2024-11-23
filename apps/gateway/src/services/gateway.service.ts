import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AuthServiceClient,
  CreateUser,
  GetUserResponse,
} from '../../../common/proto-ts-files/auth';

@Injectable()
export class GatewayService {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  async createUser(body: CreateUser): Promise<GetUserResponse> {
    return lastValueFrom(this.authService.createNewUser(body));
  }

  async gatewaySort(path: string): Promise<string> {
    if (path.startsWith('/auth/')) {
      return path;
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
