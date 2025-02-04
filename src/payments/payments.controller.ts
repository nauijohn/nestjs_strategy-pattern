import { Controller, Get, Param } from '@nestjs/common';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':amount/:method')
  pay(@Param('amount') amount: number, @Param('method') method: string) {
    return this.paymentsService.makePayment(Number(amount), method);
  }
}
