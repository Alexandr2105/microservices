import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptService } from './services/bcrypt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { Jwt } from './services/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          protoPath: path.join(__dirname, '..', 'users/user.proto'),
          url: 'localhost:3002',
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          protoPath: path.join(__dirname, '..', 'users/user.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Jwt,
    JwtService,
    BcryptService,
  ],
})
export class AuthModule {}
