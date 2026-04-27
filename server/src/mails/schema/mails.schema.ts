import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema({ timestamps: true })
export class Mail {

  @Prop()
  name?: string;

  @Prop({ required: true })
  email!: string;

  @Prop()
  subject?: string;

  @Prop()
  message!: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);