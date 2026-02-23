import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompareDocument = Compare & Document;

@Schema({ timestamps: true })
export class Compare {
 
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;
  
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  products!: Types.ObjectId[];
}

export const CompareSchema = SchemaFactory.createForClass(Compare);

CompareSchema.index({ userId: 1 }, { unique: true });