import { Injectable } from '@nestjs/common';
import { UrlPairType } from './types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { URLs } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';
import { generate } from 'shortid';

@Injectable()
export class AppService {
  constructor(@InjectModel(URLs.name) private urlModel: Model<URLs>) {}

  async getLongUrl(shortUrl: string): Promise<string> {
    const urlPair = await this.getURL({ shortUrl });
    if (!urlPair) {
      throw new Error(`Bad request: the ${shortUrl} doesn't exists`);
    }

    return urlPair.longUrl;
  }

  async shorten(urlDto: UrlDto): Promise<string> {
    const longUrl = urlDto.url;
    const duplicate = await this.getURL({ longUrl });

    if (duplicate) {
      return duplicate.shortUrl;
    }

    return this.getShortId(longUrl);
  }

  private getURL(url: Partial<UrlPairType>): Promise<UrlPairType> {
    return this.urlModel.findOne(url);
  }

  private async getShortId(longUrl: string): Promise<string> {
    while (true) {
      const shortUrl = generate();

      // check possible collisions
      const duplicate = await this.getURL({ shortUrl });
      if (!duplicate) {
        const urlPair = new this.urlModel({ longUrl, shortUrl });
        await urlPair.save();

        return shortUrl;
      }
    }
  }
}
