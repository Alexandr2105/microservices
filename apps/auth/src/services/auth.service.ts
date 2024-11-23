import { Inject, Injectable } from '@nestjs/common';
import { Jwt } from './jwt.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { BcryptService } from './bcrypt.service';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUser,
  GetUserResponse,
  UserServiceClient,
} from '../../../common/proto-ts-files/user';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private userService: UserServiceClient;

  constructor(
    private readonly jwtService: Jwt,
    private readonly bcryptService: BcryptService,
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async createAccess(userId: string): Promise<{ accessToken: string }> {
    return this.jwtService.creatJWT(userId);
  }

  async registrationUser(body: CreateUserDto) {
    body.password = await this.bcryptService.generateHashForNewUser(
      body.password,
    );
  }

  async createNewUser(body: CreateUser): Promise<GetUserResponse> {
    return lastValueFrom(this.userService.createNewUser(body));
  }
}
