import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../users/src/decorators/current-user.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUser } from '../../common/proto-ts-files/auth';
import { GetUserResponse } from '../../common/proto-ts-files/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registrationUsers(@Body() body: CreateUserDto): Promise<void> {
    await this.authService.registrationUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() body: LoginDto, @CurrentUser() user: string) {
    // return this.authService.createAccess(c)
  }

  @GrpcMethod('AuthService', 'CreateNewUser')
  async createNewUser(body: CreateUser): Promise<GetUserResponse> {
    return this.authService.createNewUser(body);
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
