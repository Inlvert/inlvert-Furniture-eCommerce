import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CartProduct,
  CartProductDocument,
} from './schema/cart-products.schema';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectModel(CartProduct.name)
    private cartProductModel: Model<CartProductDocument>,
  ) {}

  async getCartByUser(userId: string) {
  const cart = await this.cartProductModel
    .findOne({ userId })
    .populate('items.productId');

  if (!cart) {
    return { items: [], total: 0 };
  }

  return {
    items: cart.items,
    total: cart.items.length,
  };
}


  async addProduct(
    userId: string,
    productId: string,
    quantity = 1,
    color?: string,
    size?: string,
  ) {
    let cart = await this.cartProductModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartProductModel({
        userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (i) =>
        i.productId.toString() === productId &&
        i.color === color &&
        i.size === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        quantity,
        color,
        size,
      });
    }

    await cart.save();

    const populated = await cart.populate('items.productId');

    return {
      items: populated.items,
      total: populated.items.length,
    };
  }

  async updateQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.cartProductModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) throw new NotFoundException('Product not in cart');

    item.quantity = quantity;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId,
      );
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
