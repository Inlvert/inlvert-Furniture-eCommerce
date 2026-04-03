import { Injectable } from '@nestjs/common';
import * as paypal from '@paypal/checkout-server-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;

  constructor(private readonly configService: ConfigService) {
    const environment = new paypal.core.SandboxEnvironment(
      this.configService.get('PAYPAL_CLIENT_ID') as string,
      this.configService.get('PAYPAL_CLIENT_SECRET') as string,
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async createOrder(items: any[], orderId: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          
          amount: {
            currency_code: 'USD',
            value: items
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2),
              },
            } as any,
          },

          items: items.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            category: 'PHYSICAL_GOODS',
          })),
        },
      ],
      application_context: {
        return_url: `${this.configService.get('FRONTEND_BASE_URL')}/success`,
        cancel_url: `${this.configService.get('FRONTEND_BASE_URL')}/cancel`,
      },
    });

    try {
      console.log("request from paypal service - createOrder", request)
      const response = await this.client.execute(request);
      return response.result;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  }
}
