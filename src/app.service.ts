import { Injectable } from '@nestjs/common';
import { ShortURLType } from './types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { URLs } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(URLs.name) private urlModel: Model<URLs>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async shorten(urlDto: UrlDto): Promise<ShortURLType> {
    const longUrl = urlDto.url;
    const shortUrl = '123';
    const urlPair = new this.urlModel({ longUrl, shortUrl });
    await urlPair.save();

    return { id: shortUrl };
  }
}
