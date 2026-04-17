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

  @Prop()
  salesPackage!: string;

  @Prop()
  modelNumber!: string;

  @Prop()
  secondaryMaterial!: string;

  @Prop()
  configuration!: string;

  @Prop()
  upholsteryMaterial!: string;

  @Prop()
  manufacturer!: string;

  @Prop()
  releaseDate!: Date;

  @Prop()
  fillingMaterial!: string;

  @Prop()
  finishType!: string;

  @Prop()
  adjustableHeadrest!: boolean;

  @Prop({ default: 100 })
  maximumLoadCapacity!: number;

  @Prop()
  originOfManufacture!: string;

  @Prop()
  Width!: number;

  @Prop()
  Depth!: number;

  @Prop()
  Height!: number;

  @Prop()
  Weight!: number;

  @Prop()
  seatHeight!: number;

  @Prop()
  legHeight!: number;

  @Prop()
  warrantySummary!: number;

  @Prop({
    default:
      'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
  })
  warrantyServiceType!: string;

  @Prop()
  coveredInWarranty!: string;

  @Prop({
    default:
      'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
  })
  notCoveredInWarranty!: string;

  @Prop({ default: 12 })
  domesticWarranty!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'productId',
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
