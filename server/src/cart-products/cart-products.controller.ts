import { Controller, Get, Post } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';

@Controller('cart-products')
export class CartProductsController {
  constructor(private readonly cartProductsService: CartProductsService) {}

  @Get()
  findAll() {
    return this.cartProductsService.findAll();
  }
}
