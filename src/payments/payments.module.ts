import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { BankTransferPaymentStrategy } from './strategies/bank-transfer-payment.strategy';
import { CreditCardPaymentStrategy } from './strategies/creditcard-payment.strategy';
import { PaymentStrategiesFactory } from './strategies/payment.strategy';
import { PayPalPaymentStrategy } from './strategies/paypal-payment.strategy';

@Module({
  controllers: [PaymentsController],
  providers: [
    PayPalPaymentStrategy,
    CreditCardPaymentStrategy,
    BankTransferPaymentStrategy,
    PaymentStrategiesFactory,
    PaymentsService,
  ],
})
export class PaymentsModule {}
