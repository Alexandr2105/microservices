import { Inject, Injectable } from '@nestjs/common';
import { Jwt } from './jwt.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { BcryptService } from '../../../common/bcrypt.service';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUser,
  UserServiceClient,
} from '../../../common/proto-ts-files/user';
import { lastValueFrom } from 'rxjs';
import {
  AccessTokenResponse,
  AllUserResponse,
  UserId,
  UserResponse,
} from '../../../common/proto-ts-files/auth';

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

  async createAccess(userId: string): Promise<AccessTokenResponse> {
    return this.jwtService.creatJWT(userId);
  }

  async registrationUser(body: CreateUserDto): Promise<AccessTokenResponse> {
    body.password = await this.bcryptService.generateHashForNewUser(
      body.password,
    );
    const user = await lastValueFrom(this.userService.createNewUser(body));
    if (user) {
      return this.jwtService.creatJWT(user.id);
    }
  }

  async createNewUser(body: CreateUser): Promise<UserResponse> {
    return lastValueFrom(this.userService.createNewUser(body));
  }

  async getUserByEmail(body: CreateUser): Promise<AllUserResponse> {
    return lastValueFrom(this.userService.getUserByEmail(body));
  }

  async getUserById(body: UserId): Promise<UserResponse> {
    return lastValueFrom(this.userService.getUserById(body));
  }
}
