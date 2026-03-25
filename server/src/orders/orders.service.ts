import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/orders.schema';
import { Model } from 'mongoose';
import { PaymentsService } from 'src/payments/payments.service';
import { Product } from 'src/products/schema/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private paymentsService: PaymentsService,
  ) {}

  async createOrder(
    userId: string,
    paymentMethod: 'stripe' | 'paypal',
    items: {
      productId: string;
      quantity: number;
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
      note?: string;
    },
    totalPrice: number,
  ) {
    const productIds = items.map((i) => i.productId);

    const products = await this.productModel.find({ _id: { $in: productIds } });

    const itemsWithPrice = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);

      if (!product) throw new Error('Product not found');

      return {
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalCalculatedPrice = itemsWithPrice.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    const newOrder = new this.orderModel({
      userId,
      items: itemsWithPrice,
      billingDetails,
      totalPrice: totalCalculatedPrice,
      status: 'pending',
    });
    newOrder.save();

    const stripeItems = items.map((item) => ({
      name: item.productId,
      price:
        itemsWithPrice.find((i) => i.productId.toString() === item.productId)
          ?.price || 0,
      quantity: item.quantity,
    }));

    if (paymentMethod === 'stripe') {
      const session = await this.paymentsService.createStripePayment(
        stripeItems,
        newOrder._id.toString(),
      );
      return { checkoutUrl: session.url };
    } else if (paymentMethod === 'paypal') {
      console.log('Create PayPal payment with items:', stripeItems);
      const session = await this.paymentsService.createPaypalPayment(
        stripeItems,
        newOrder._id.toString(),
      );
      return { checkoutUrl: session.url };
    }
  }

  async getAllOrders(userId: string) {
    const orders = await this.orderModel
      .find({ userId })
      .populate('items.productId')
      .exec();
    return orders;
  }

  async markAsPaid(orderId: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        status: 'paid',
      },
      { new: true },
    );
    
    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
