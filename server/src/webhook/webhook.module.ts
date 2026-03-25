import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [OrdersModule],
  controllers: [WebhookController]
})
export class WebhookModule {}
