import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartProductsController {
  constructor(private readonly cartService: CartProductsService) {}

  @Get()
  getCart(@Body('userId') userId: string) {
    return this.cartService.getCartByUser(userId);
  }
 
  @Post('add')
  addProduct(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Body('color') color: string,
    @Body('size') size: string,
  ) {
    return this.cartService.addProduct(userId, productId, quantity);
  }

  @Patch('update')
  updateQuantity(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete('remove/:productId')
  removeProduct(@Body('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeProduct(userId, productId);
  }

  @Delete('clear')
  clearCart(@Body('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
