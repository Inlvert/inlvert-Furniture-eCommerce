import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(
    @Req() req: Request,
    // @Body('userId') userId: string,
    @Body('cartId') cartId: string,
    @Body('items')
    items: {
      productId: string;
      quantity: number;
      price: number;
      color?: string;
      size?: string;
    }[],
    @Body('billingDetails')
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
    @Body('totalPrice') totalPrice: number,
  ) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.orderService.createOrder(
      userId,
      cartId,
      items,
      billingDetails,
      totalPrice,
    );
    // Implementation for creating an order
  }
}
