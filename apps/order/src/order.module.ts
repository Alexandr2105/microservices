import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderQueryRepository } from './repositories/order.query.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './services/order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderTable } from './tables/order.table';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'microservices',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([OrderTable]),
  ],
  controllers: [OrderController],
  providers: [OrderQueryRepository, OrderRepository, OrderService],
  exports: [],
})
export class OrderModule {}
