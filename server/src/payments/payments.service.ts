import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripeService: StripeService) {}

  async createStripePayment(product: any) {
    return this.stripeService.createCheckoutSession(product);
  }
}
