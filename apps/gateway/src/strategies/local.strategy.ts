import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientGrpc } from '@nestjs/microservices';
import { BcryptService } from '../../../common/bcrypt.service';
import {
  AllUserResponse,
  AuthServiceClient,
} from '../../../common/proto-ts-files/auth';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private authService: AuthServiceClient;

  constructor(
    private readonly genHash: BcryptService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc,
  ) {
    super({
      usernameField: 'email',
    });
  }

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
  }

  async validate(email: string, password: string): Promise<AllUserResponse> {
    const user = await lastValueFrom(
      this.authService.getUserByEmail({ email: email.toLowerCase() }),
    );

    const hashPassword = await this.genHash.generateHash(
      password.toString(),
      user.password,
    );
    if (user.password === hashPassword) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
