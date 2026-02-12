import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartProductsController {
  constructor(private readonly cartService: CartProductsService) {}

  @Get()
  getCart(@Req() req: Request) {
    const userId = (req.user as any)?.id;

    console.log('USER ID IN CART REQUEST:', userId);
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }

    return this.cartService.getCartByUser(userId);
  }

  @Post('add')
  addProduct(
    @Req() req: Request,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Body('color') color: string,
    @Body('size') size: string,
  ) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.cartService.addProduct(userId, productId, quantity);
  }

  @Patch('update')
  updateQuantity(
    @Req() req: Request,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = (req.user as any)?.id;
    if (!userId) {
      throw new UnauthorizedException('No user in request');
    }
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete('remove/:productId')
  removeProduct(@Req() req: Request, @Param('productId') productId: string) {
    const userId = (req.user as any)?.id;
    return this.cartService.removeProduct(userId, productId);
  }

  @Delete('clear')
  clearCart(@Body('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
