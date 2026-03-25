import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe')
  async stripe(
    @Body('items') items: {
      name: string;
      price: number;
      quantity: number;
    }[],
    @Body('orderId') orderId: string,
  ) {
    const session = await this.paymentsService.createStripePayment(
      items,
      orderId,
    );

    return {
      sessionId: session.id,
      checkoutUrl: session.url,
    };
  }

  @Post('paypal')
  async paypal(
    @Body('items') items: {
      name: string;
      price: number;
      quantity: number;
    }[],
    @Body('orderId') orderId: string,
  ) {
    const order = await this.paymentsService.createPaypalPayment(
      items,
      orderId,
    );

    return {
      orderId: order.id,
      approvalUrl: order.links.find((link) => link.rel === 'approve')?.href,
    };
  }
}