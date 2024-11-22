import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../../../auth/src/dto/create.user.dto';
import { IGetUserByIdInterface } from '../interfaces/get.user.by.id.interface';
import { IGetUserResponseInterface } from '../interfaces/get.user.response.interface';
import { ICreateUserInterface } from '../interfaces/create.user.interface';

interface AuthService {
  getUser(data: IGetUserByIdInterface): Observable<IGetUserResponseInterface>;
  createNewUser(
    data: ICreateUserInterface,
  ): Observable<IGetUserResponseInterface>;
}

@Injectable()
export class GatewayService {
  private authService: AuthService;

  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  // @GrpcMethod('AuthService', 'CreateUser')
  async createUser(
    body: CreateUserDto,
  ): Promise<Observable<IGetUserResponseInterface>> {
    return this.authService.createNewUser(body);
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
