import { All, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GatewayService } from './services/gateway.service';
import { CreateUserDto } from '../../auth/src/dto/create.user.dto';
import { AccessTokenResponse } from '../../common/proto-ts-files/auth';
import { PathDecorator } from './decorators/path.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ResponseUserDto } from './dto/response.user.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async registration(
    @Body() body: CreateUserDto,
  ): Promise<AccessTokenResponse> {
    return this.gatewayService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: ResponseUserDto,
  ): Promise<AccessTokenResponse> {
    return this.gatewayService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @All('*')
  async sortEndpoints(
    @PathDecorator() path: string,
    @Body() body: any,
    @Req() req: Request,
  ) {
    return this.gatewayService.gatewaySort(path, body, req.method);
  }
}

// protoc   --plugin=protoc-gen-ts_proto=$(which protoc-gen-ts_proto)   --ts_proto_out=apps/common/proto-ts-files   --ts_proto_opt=nestJs=true  --proto_path=apps/common/proto-files   apps/common/proto-files/*.proto
// command to creating proto files ts

// protoc   --plugin=protoc-gen-ts_proto="C:\Users\user\Documents\back\studying\microservices\node_modules\.bin\protoc-gen-ts_proto.cmd"   --ts_proto_out=apps/common/proto-ts-files   --ts_proto_opt=nestJs=true  --proto_path=apps/common/proto-files   apps/common/proto-files/*.proto
// command to creating proto files ts for windows
