import { Injectable } from '@nestjs/common';

import { IPaymentStrategy } from './payment.strategy';

@Injectable()
export class BankTransferPaymentStrategy implements IPaymentStrategy {
  process(amount: number): string {
    return `Paid $${amount} using Bank Transfer`;
  }
}
