import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { PaypalService } from './paypal.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService, PaypalService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
