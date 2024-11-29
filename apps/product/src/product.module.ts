import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductQueryRepository } from './repositories/product.query.repository';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';
import { ProductTable } from './tables/product.table';
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
    SequelizeModule.forFeature([ProductTable]),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductQueryRepository, ProductService],
  exports: [ProductRepository, ProductQueryRepository],
})
export class ProductModule {}
