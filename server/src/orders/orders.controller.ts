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

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders(
    @Req() req: Request
  ) {
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
