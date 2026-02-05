import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  async create(userId: string, cartProductsId: string): Promise<CartDocument> {
    const newCart = new this.cartModel({
      userId,
      cartProductsId,
    });
    return newCart.save();
  } 
}
