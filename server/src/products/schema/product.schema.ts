import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  smallDescription!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true, default: 10 })
  stock!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ default: [] })
  images!: string[];

  @Prop()
  sizes!: string[];

  @Prop({ default: [] })
  colors!: string[];

  @Prop({ required: true, unique: true })
  sku!: string;

  @Prop({ default: [] })
  tags!: string[];

  @Prop({ default: 0 })
  averageRating!: number;

  @Prop({ default: 0 })
  reviewsCount!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productId',
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
