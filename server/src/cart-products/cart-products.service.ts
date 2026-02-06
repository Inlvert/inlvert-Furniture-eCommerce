import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartProduct, CartProductDocument } from './schema/cart-products.schema';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectModel(CartProduct.name)
    private cartProductModel: Model<CartProductDocument>,
  ) {}
 
  async getCartByUser(userId: string) {
    const cart = await this.cartProductModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('items.productId');
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async addProduct(userId: string, productId: string, quantity = 1, color?: string, size?: string) {
    const cart = await this.cartProductModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), quantity });
    }

    await cart.save();
    return cart;
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.cartProductModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) throw new NotFoundException('Product not in cart');

    item.quantity = quantity;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    }

    await cart.save();
    return cart;
  }

  async removeProduct(userId: string, productId: string) {
    const cart = await this.cartProductModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();
    return cart;
  }

  async clearCart(userId: string) {
    const cart = await this.cartProductModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = [];
    await cart.save();
    return cart;
  }
}
