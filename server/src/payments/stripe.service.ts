import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') as string,
      {
        apiVersion: '2026-02-25.clover',
      },
    );
  }

  async createCheckoutSession(items: any[], orderId: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.quantity),
      })),
      metadata: {
        orderId,
      },

      success_url: `${this.configService.get('FRONTEND_BASE_URL')}/success`,
      cancel_url: `${this.configService.get('FRONTEND_BASE_URL')}/cancel`,
    });

    console.log('Created Stripe checkout session:', session.id);
    console.log('Created Stripe checkout session:', session.metadata);


    return session;
  }

  getStripeInstance() {
    return this.stripe;
  }
}
