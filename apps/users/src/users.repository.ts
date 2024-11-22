import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UserInterface } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly userRepository: typeof UserModel,
  ) {}

  async getUserById(userId: string): Promise<UserModel> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(body: UserInterface): Promise<UserModel> {
    return this.userRepository.create(body);
  }
}
