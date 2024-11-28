import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './services/gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptService } from '../../common/bcrypt.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: path.join(__dirname, 'auth.proto'),
          url: 'localhost:3001',
        },
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, LocalStrategy, JwtStrategy, BcryptService],
})
export class GatewayModule {}
