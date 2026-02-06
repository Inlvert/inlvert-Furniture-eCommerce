import { Module } from '@nestjs/common';
import { CartProductsController } from './cart-products.controller';
import { CartProductsService } from './cart-products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartProductSchema } from './schema/cart-products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CartProduct', schema: CartProductSchema },
    ]),
  ],
  controllers: [CartProductsController],
  providers: [CartProductsService],
  exports: [MongooseModule],
})
export class CartProductsModule {}
