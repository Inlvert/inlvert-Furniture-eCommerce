import { Body, Controller, Post } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe')
  async stripe(@Body() body: any) {
    const url = await this.paymentsService.createStripePayment(body);
    return { checkoutUrl: url };
  }
  
}