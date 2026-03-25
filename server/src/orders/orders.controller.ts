import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { use } from 'passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(
    @Req() req: Request,

    @Body('paymentMethod')
    paymentMethod: 'stripe' | 'paypal',

    @Body('items')
    items: {
      productId: string;
      quantity: number;
      color?: string | undefined;
      size?: string | undefined;
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
      note?: string;
    },
    @Body('totalPrice') totalPrice: number,
  ) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.orderService.createOrder(
      userId,
      paymentMethod,
      items,
      billingDetails,
      totalPrice,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders(@Req() req: Request) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    // You can implement logic here to fetch orders for the authenticated user
    // For example, you might want to call a service method like this:
    // return this.orderService.getOrdersByUserId(userId);
    return this.orderService.getAllOrders(userId); // Placeholder for fetching all orders
    // Implementation for fetching all orders
  }
}
