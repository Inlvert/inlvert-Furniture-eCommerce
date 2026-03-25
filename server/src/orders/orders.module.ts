import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from './schema/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductSchema } from 'src/products/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    PaymentsModule,
  ],
  providers: [OrdersService,],
  controllers: [OrdersController],
  exports: [MongooseModule, PaymentsModule, OrdersService],
})
export class OrdersModule {}
