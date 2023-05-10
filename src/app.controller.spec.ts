import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlDto } from './dto/url.dto';
import { UrlPairType } from './types';

// Mock our model for Mongo functionality
class URLsModelMock {
  findOne(url: Partial<UrlPairType>) {
    return {
      longUrl: 'TestLongUrl',
      shortUrl: 'TestShortUrl',
    };
  }
}

describe('AppController', () => {
  let appController: AppController;
  const longURLMock: UrlDto = {
    url: 'google.com',
  };
  const shortURLMock = 'https:test-url.com/aabbb123';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'URLsModel',
          useClass: URLsModelMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Shorten URL tests', () => {
    it('should get short URL by POST', async () => {
      const result = await appController.shorten(longURLMock);
      expect(result.id).toEqual('TestShortUrl');
    });

    it('should get long URL by GET', async () => {
      const result = await appController.getLongUrl(shortURLMock);
      expect(result).toEqual('TestLongUrl');
    });
  });
});
