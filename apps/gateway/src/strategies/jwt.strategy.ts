import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
import { AuthServiceClient } from '../../../common/proto-ts-files/auth';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

config();

type JwtPayload = {
  userId: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
  }

  async validate(payload: JwtPayload): Promise<boolean> {
    const user = await lastValueFrom(
      this.authService.getUserById({ id: payload.userId }),
    );
    return !!user;
  }
}
