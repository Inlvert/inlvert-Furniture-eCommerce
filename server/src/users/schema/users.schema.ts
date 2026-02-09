import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CartProduct } from 'src/cart-products/schema/cart-products.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  password?: string;

  @Prop()
  firstName!: string;

  @Prop()
  lastName!: string;

  @Prop()
  googleId?: string;

  @Prop()
  avatar?: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'CartProduct' }])
  cartProducts!: CartProduct[];
}

export const UserSchema = SchemaFactory.createForClass(User);
