import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CompareModule } from './compare/compare.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { WebhookModule } from './webhook/webhook.module';
import { MailsController } from './mails/mails.controller';
import { MailsService } from './mails/mails.service';
import { MailsModule } from './mails/mails.module';



@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION'),
      }),
    }),
    ProductsModule,
    CartProductsModule,
    ReviewsModule,
    CompareModule,
    OrdersModule,
    PaymentsModule,
    WebhookModule,
    MailsModule,
  ],
  controllers: [AppController, ProductsController, MailsController],
  providers: [AppService],
})
export class AppModule {}
