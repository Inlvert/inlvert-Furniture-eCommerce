import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' })
  productId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop()
  rating!: number;

  @Prop()
  comment?: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
