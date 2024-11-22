import { Inject, Injectable } from '@nestjs/common';
import { Jwt } from './jwt.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { BcryptService } from './bcrypt.service';
import { Observable } from 'rxjs';
import { IGetUserResponseInterface } from '../interfaces/get.user.response.interface';
import { IGetUserByIdInterface } from '../interfaces/get.user.by.id.interface';
import { ICreateUserInterface } from '../interfaces/create.user.interface';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';

interface UsersService {
  getUser(data: IGetUserByIdInterface): Observable<IGetUserResponseInterface>;
  createNewUser(
    data: ICreateUserInterface,
  ): Observable<IGetUserResponseInterface>;
}

@Injectable()
export class AuthService {
  private usersService: UsersService;

  constructor(
    private readonly jwtService: Jwt,
    private readonly bcryptService: BcryptService,
    @Inject('AUTH_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.usersService = this.client.getService<UsersService>('AuthService');
  }

  async createAccess(userId: string): Promise<{ accessToken: string }> {
    return this.jwtService.creatJWT(userId);
  }

  async registrationUser(body: CreateUserDto) {
    body.password = await this.bcryptService.generateHashForNewUser(
      body.password,
    );
  }

  @GrpcMethod('AuthService', 'CreateNewUser')
  async createNewUser(
    body: CreateUserDto,
  ) /*: Promise<Observable<IGetUserResponseInterface>>*/ {
    console.log('11111111111111111111111111111111111111111');
    console.log(body);
    // return this.usersService.createNewUser(body);
  }
}
