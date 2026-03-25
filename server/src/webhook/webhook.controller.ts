import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { OrdersService } from 'src/orders/orders.service';
import Stripe from 'stripe';

@Controller('webhooks')
export class WebhookController {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService,
    private readonly orderService: OrdersService
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') as string,
      {
        apiVersion: '2026-02-25.clover',
      },
    );
  }

  @Post()
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.configService.get(
      'STRIPE_WEBHOOK_SECRET',
    ) as string;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log('Raw body type:', typeof req.body);
      console.log('Is Buffer:', req.body instanceof Buffer);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);

        const orderId = session.metadata?.orderId || null;
        console.log('Order ID:', orderId);

        await this.orderService.markAsPaid(orderId as string);

        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment intent succeeded:', paymentIntent.id);
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
    return res.json({ received: true });
  }
}
