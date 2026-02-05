import { Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {

  constructor(private readonly cartsService: CartsService) {}

  @Post()  
  create(userId: string, cartProductsId: string) {
    return this.cartsService.create(userId, cartProductsId);
  }
}
