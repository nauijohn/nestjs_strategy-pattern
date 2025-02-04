import { Inject, Injectable } from '@nestjs/common';

import { IPaymentStrategies } from './strategies/payment.strategy';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('PAYMENT_STRATEGIES')
    private readonly strategies: IPaymentStrategies,
  ) {}

  makePayment(amount: number, method: string): string {
    const strategy = this.strategies[method];
    if (!strategy) {
      throw new Error(`Payment method ${method} is not supported`);
    }
    return strategy.process(amount);
  }
}
