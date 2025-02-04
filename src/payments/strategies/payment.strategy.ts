import { Provider } from '@nestjs/common';

import { BankTransferPaymentStrategy } from './bank-transfer-payment.strategy';
import { CreditCardPaymentStrategy } from './creditcard-payment.strategy';
import { PayPalPaymentStrategy } from './paypal-payment.strategy';

export interface IPaymentStrategy {
  process(amount: number): string;
}

export interface IPaymentStrategies {
  [key: string]: IPaymentStrategy;
  paypal: IPaymentStrategy;
  'credit-card': IPaymentStrategy;
  'bank-transfer': IPaymentStrategy;
}

export const PaymentStrategiesFactory: Provider = {
  provide: 'PAYMENT_STRATEGIES',
  inject: [
    PayPalPaymentStrategy,
    CreditCardPaymentStrategy,
    BankTransferPaymentStrategy,
  ],
  useFactory: (
    paypal: PayPalPaymentStrategy,
    creditCard: CreditCardPaymentStrategy,
    bankTransfer: BankTransferPaymentStrategy,
  ): IPaymentStrategies => ({
    paypal,
    'credit-card': creditCard,
    'bank-transfer': bankTransfer,
  }),
};
