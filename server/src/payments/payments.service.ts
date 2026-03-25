import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaypalService } from './paypal.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paypalService: PaypalService,
  ) {}

  async createStripePayment(items: any[], orderId: string) {
    return this.stripeService.createCheckoutSession(items, orderId);
  }

  async createPaypalPayment(items: any[], orderId: string) {
    return this.paypalService.createOrder(items, orderId);
  }
}
