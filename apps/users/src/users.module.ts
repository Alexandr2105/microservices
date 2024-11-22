import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
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
    SequelizeModule.forFeature([UserModel]),
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'user',
    //       protoPath: __dirname + '/user.proto',
    //     },
    //   },
    // ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
