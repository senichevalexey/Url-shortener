import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UrlDto } from './dto/url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/shorten')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  shorten(@Body() urlDto: UrlDto) {
    return this.appService.shorten(urlDto);
  }
}
