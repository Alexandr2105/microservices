import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath: path.join(__dirname, 'product.proto'),
        url: 'localhost:3004',
      },
    },
  );
  await app.listen();
}
bootstrap();
