import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserInterface } from './interfaces/user.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  UserEmail,
  UserId,
  UserResponse,
} from '../../common/proto-ts-files/user';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(data: UserId) {
    return this.usersRepository.getUserById(data.id);
  }

  @GrpcMethod('UserService', 'GetUserByEmail')
  async getUserByEmail(data: UserEmail) {
    return this.usersRepository.getUserByEmail(data.email);
  }

  // async getUser(data: GetUser): Promise<UserModel> {
  //   return this.usersRepository.getUserById(userId);
  // }

  @GrpcMethod('UserService', 'CreateNewUser')
  async createUser(
    body: UserInterface,
  ): Promise<Observable<UserResponse> | UserResponse> {
    return this.usersRepository.createUser(body);
  }
}
