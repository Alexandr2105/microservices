import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: path.join(__dirname, 'user.proto'),
        url: 'localhost:3002',
      },
    },
  );
  await app.listen();
}
bootstrap();
