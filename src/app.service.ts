import { Injectable } from '@nestjs/common';
import { ShortURLType, UrlPairType } from './types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { URLs } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';
import { generate } from 'shortid';

@Injectable()
export class AppService {
  constructor(@InjectModel(URLs.name) private urlModel: Model<URLs>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async shorten(urlDto: UrlDto): Promise<ShortURLType> {
    const longUrl = urlDto.url;
    const duplicate = await this.getDuplicate({ longUrl });

    if (duplicate) {
      return { id: duplicate.shortUrl };
    }

    const id = await this.getShortId(longUrl);
    return { id };
  }

  private getDuplicate(url: Partial<UrlPairType>): Promise<UrlPairType> {
    return this.urlModel.findOne(url);
  }

  private async getShortId(longUrl: string): Promise<string> {
    while (true) {
      const id = generate();

      // check possible collisions
      const duplicate = await this.getDuplicate({ shortUrl: id });
      if (!duplicate) {
        const urlPair = new this.urlModel({ longUrl, shortUrl: id });
        await urlPair.save();

        return id;
      }
    }
  }
}
