import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type CartProductDocument = CartProduct & Document;

@Schema({ timestamps: true })
export class CartProduct {
  @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
  cartId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;

  @Prop({ type: String, required: true, default: 's' })
  size: string;

  @Prop({ type: String, required: true, default: 'grey' })
  color: string;

  @Prop({ type: Number, required: true })
  totalPrice: number;
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);
