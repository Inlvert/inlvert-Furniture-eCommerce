import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

export type CartProductDocument = CartProduct & Document;

@Schema({ timestamps: true })
export class CartProduct {
  
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId!: Types.ObjectId;
  
  @Prop([
  {
    productId: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
    color: String,
    size: String,
  },
])
  items!: {
    productId: Types.ObjectId;
    quantity: number;
    color?: string;
    size?: string;
  }[];
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);
