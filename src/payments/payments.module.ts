import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { BankTransferPaymentStrategy } from './strategies/bank-transfer-payment.strategy';
import { CreditCardPaymentStrategy } from './strategies/creditcard-payment.strategy';
import { IPaymentStrategies } from './strategies/payment.strategy';
import { PayPalPaymentStrategy } from './strategies/paypal-payment.strategy';

@Module({
  controllers: [PaymentsController],
  providers: [
    PayPalPaymentStrategy,
    CreditCardPaymentStrategy,
    BankTransferPaymentStrategy,
    {
      provide: 'PAYMENT_STRATEGIES',
      useFactory: (
        paypal: PayPalPaymentStrategy,
        creditCard: CreditCardPaymentStrategy,
        bankTransfer: BankTransferPaymentStrategy,
      ): IPaymentStrategies => ({
        ['paypal']: paypal,
        ['credit-card']: creditCard,
        ['bank-transfer']: bankTransfer,
      }),
      inject: [
        PayPalPaymentStrategy,
        CreditCardPaymentStrategy,
        BankTransferPaymentStrategy,
      ],
    },
    PaymentsService,
  ],
})
export class PaymentsModule {}
