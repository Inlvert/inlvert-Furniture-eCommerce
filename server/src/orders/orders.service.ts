import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/orders.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(
    userId: string,
    cartId: string,
    items: {
      productId: string;
      quantity: number;
      price: number;
      color?: string;
      size?: string;
    }[],
    billingDetails: {
      firstName: string;
      lastName: string;
      country: string;
      address: string;
      city: string;
      zip: string;
      phone: string;
      email: string;
    },
    totalPrice: number,
  ) {
    const newOrder = new this.orderModel({
      userId,
      cartId,
      items,
      billingDetails,
      totalPrice,
    });
    return newOrder.save();
  }

  async getAllOrders(userId: string) {
    const orders = await this.orderModel
      .find({ userId })
      .populate('items.productId')
      .exec();
    return orders;
  }
}
