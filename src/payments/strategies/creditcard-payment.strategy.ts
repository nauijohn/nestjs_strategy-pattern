import { Injectable } from '@nestjs/common';

import { IPaymentStrategy } from './payment.strategy';

@Injectable()
export class CreditCardPaymentStrategy implements IPaymentStrategy {
  process(amount: number): string {
    return `Paid $${amount} using Credit Card`;
  }
}
