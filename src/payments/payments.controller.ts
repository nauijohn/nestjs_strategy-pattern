import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':method')
  @HttpCode(HttpStatus.OK)
  pay(@Body('amount') amount: number, @Param('method') method: string) {
    const result = this.paymentsService.makePayment(Number(amount), method);
    return { message: result };
  }
}
