import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },

      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },

      price: {
        type: Number,
        required: true,
      },

      color: String,
      size: String,
    },
  ])
  items!: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }[];

  @Prop({
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String }, // Optional field, can be left empty
      zip: { type: String },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      note: { type: String }, // Optional field, can be left empty
    },
    required: true,
  })
  billingDetails!: {
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    province?: string;
    zip?: string;
    phone: string;
    email: string;
    note?: string;
  };

  @Prop({ required: true })
  totalPrice!: number;

  @Prop({
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
