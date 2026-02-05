import { Module } from '@nestjs/common';
import { CartProductsController } from './cart-products.controller';
import { CartProductsService } from './cart-products.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CartProduct', schema: require('./schema/cart-products.schema').CartProductSchema },
    ]),
  ],
  controllers: [CartProductsController],
  providers: [CartProductsService]
})
export class CartProductsModule {}
