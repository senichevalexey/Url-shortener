import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { URLSchema, URLs } from './schemas/url.schema';
import * as env from 'dotenv';
env.config();

// TODO: we can use a config serviice instead of it
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_NAME;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${username}:${password}@mongo:27017`, {
      dbName: db,
    }),
    MongooseModule.forFeature([{ name: URLs.name, schema: URLSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
