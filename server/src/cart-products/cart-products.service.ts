import { Injectable } from '@nestjs/common';
import { CartProduct, CartProductDocument } from './schema/cart-products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectModel(CartProduct.name) private cartProductModel: Model<CartProductDocument>,
  ) {}
  async findAll(): Promise<CartProductDocument[]> {
    return this.cartProductModel.find().exec();
  }
}
