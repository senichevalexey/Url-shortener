import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UrlDto } from './dto/url.dto';
import { ShortURLType } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getLongUrl(@Param('id') id: string): Promise<string> {
    try {
      const url = await this.appService.getLongUrl(id);
      return url;
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/shorten')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async shorten(@Body() urlDto: UrlDto): Promise<ShortURLType> {
    const id = await this.appService.shorten(urlDto);

    return { id };
  }
}
