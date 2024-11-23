import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserInterface } from './interfaces/user.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserById } from './dto/get.user.by.id';
import { Observable } from 'rxjs';
import { GetUserResponse } from '../../common/proto-ts-files/user';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  // @GrpcMethod('UserService', 'GetUser')
  async getUser(data: GetUserById) {
    return this.usersRepository.getUserById(data.id);
  }

  // async getUser(data: GetUser): Promise<UserModel> {
  //   return this.usersRepository.getUserById(userId);
  // }

  @GrpcMethod('UserService', 'CreateNewUser')
  async createUser(
    body: UserInterface,
  ): Promise<Observable<GetUserResponse> | GetUserResponse> {
    return this.usersRepository.createUser(body);
  }
}
