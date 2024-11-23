import { All, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GatewayService } from './services/gateway.service';
import { CreateUserDto } from '../../auth/src/dto/create.user.dto';
import { GetUserResponse } from '../../common/proto-ts-files/auth';
import { PathDecorator } from './decorators/path.decorator';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async getHello(@Body() body: CreateUserDto): Promise<GetUserResponse> {
    return this.gatewayService.createUser(body);
  }

  @Get('login')
  getHellos(@PathDecorator() path: string): string {
    return 'Hello';
  }

  @UseGuards()
  @All('*')
  async sortEndpoints(@PathDecorator() path: string): Promise<string> {
    return this.gatewayService.gatewaySort(path);
  }
}

// protoc   --plugin=protoc-gen-ts_proto=$(which protoc-gen-ts_proto)   --ts_proto_out=apps/common/proto-ts-files   --ts_proto_opt=nestJs=true  --proto_path=apps/common/proto-files   apps/common/proto-files/*.proto
// command to creating proto files ts
