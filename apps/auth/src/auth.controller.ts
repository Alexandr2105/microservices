import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthService } from './services/auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUser } from '../../common/proto-ts-files/user';
import {
  AccessTokenResponse,
  AllUserResponse,
  UserId,
  UserResponse,
} from '../../common/proto-ts-files/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Registration')
  async registration(
    @Body() body: CreateUserDto,
  ): Promise<AccessTokenResponse> {
    return this.authService.registrationUser(body);
  }

  @GrpcMethod('AuthService', 'Login')
  async loginUser(@Body() body: UserId): Promise<AccessTokenResponse> {
    return this.authService.createAccess(body.id);
  }

  @GrpcMethod('AuthService', 'CreateNewUser')
  async createNewUser(body: CreateUser): Promise<UserResponse> {
    return this.authService.createNewUser(body);
  }

  @GrpcMethod('AuthService', 'GetUserByEmail')
  async getUserByEmail(body: CreateUser): Promise<AllUserResponse> {
    return this.authService.getUserByEmail(body);
  }

  @GrpcMethod('AuthService', 'GetUserById')
  async getUserById(body: UserId): Promise<UserResponse> {
    return this.authService.getUserById(body);
  }

  // @Post('logout')
  // @UseGuards(LocalAuthGuard)
  // async logout() {
  //   await this.commandBus.execute(new LogoutUserCommand(req.user.deviceId));
  //   return true;
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // async getInfoAboutMe() {
  //   const user = await this.userRepo.getUserById(req.user.id);
  //   if (user) return user;
  // }
}
