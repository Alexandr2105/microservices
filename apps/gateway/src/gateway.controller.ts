import { All, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GatewayService } from './services/gateway.service';
import { PathDecorator } from './decorators/path.decorator';
import { CreateUserDto } from '../../auth/src/dto/create.user.dto';
import { Observable } from 'rxjs';
import { IGetUserResponseInterface } from '../../auth/src/interfaces/get.user.response.interface';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('signup')
  async getHello(
    @Body() body: CreateUserDto,
  ): Promise<Observable<IGetUserResponseInterface>> {
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
