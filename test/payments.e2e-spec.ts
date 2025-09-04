import { Server } from 'http';
import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  BankTransferPaymentStrategy,
  CreditCardPaymentStrategy,
  PaymentsController,
  PaymentsService,
  PaymentStrategiesFactory,
  PayPalPaymentStrategy,
} from '../src/payments';

describe('Payments(e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PayPalPaymentStrategy,
        CreditCardPaymentStrategy,
        BankTransferPaymentStrategy,
        PaymentStrategiesFactory,
        PaymentsService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  // describe('Credit Card Payment', () => {
  //   test('Successful payment', async () => {
  //     const amount = 100;
  //     const method = 'credit-card';

  //     const response = await request(server)
  //       .post(`/payments/${method}`)
  //       .send({ amount });

  //     expect(response.statusCode).toBe(HttpStatus.OK);
  //     expect(response.body).toEqual({
  //       message: `Paid $${amount} using Credit Card`,
  //     });
  //   });
  // });

  // describe('Bank Transfer Payment', () => {
  //   test('Successful payment', async () => {
  //     const amount = 200;
  //     const method = 'bank-transfer';

  //     const response = await request(server)
  //       .post(`/payments/${method}`)
  //       .send({ amount });

  //     expect(response.statusCode).toBe(HttpStatus.OK);
  //     expect(response.body).toEqual({
  //       message: `Paid $${amount} using Bank Transfer`,
  //     });
  //   });
  // });

  // describe('PayPal Payment', () => {
  //   test('Successful payment', async () => {
  //     const amount = 300;
  //     const method = 'paypal';

  //     const response = await request(server)
  //       .post(`/payments/${method}`)
  //       .send({ amount });

  //     expect(response.statusCode).toBe(HttpStatus.OK);
  //     expect(response.body).toEqual({
  //       message: `Paid $${amount} using PayPal`,
  //     });
  //   });
  // });

  describe('Successful payments', () => {
    const payments = [
      {
        method: 'credit-card',
        amount: 100,
        message: 'Paid $100 using Credit Card',
      },
      {
        method: 'bank-transfer',
        amount: 200,
        message: 'Paid $200 using Bank Transfer',
      },
      { method: 'paypal', amount: 300, message: 'Paid $300 using PayPal' },
    ];

    test.each(payments)(
      '$method payment',
      async ({ method, amount, message }) => {
        const response = await request(server)
          .post(`/payments/${method}`)
          .send({ amount });

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toEqual({ message });
      },
    );
  });
});
