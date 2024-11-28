import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptService } from '../../common/bcrypt.service';
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
          package: 'user',
          protoPath: path.join(__dirname, 'user.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Jwt, JwtService, BcryptService],
})
export class AuthModule {}
