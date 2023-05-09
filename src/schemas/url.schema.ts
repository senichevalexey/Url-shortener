import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class URLs {
  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true })
  shortUrl: string;
}

export type URLDocument = HydratedDocument<URLs>;
export const URLSchema = SchemaFactory.createForClass(URLs);
