import { Test, TestingModule } from '@nestjs/testing';

import { PaymentsService } from '../payments.service';
import { IPaymentStrategies } from '../strategies/payment.strategy';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let mockStrategies: jest.Mocked<IPaymentStrategies>;

  beforeEach(async () => {
    // mock strategies object
    mockStrategies = {
      paypal: { process: jest.fn().mockReturnValue('paypal ok') },
      'credit-card': { process: jest.fn().mockReturnValue('card ok') },
      'bank-transfer': { process: jest.fn().mockReturnValue('bank ok') },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: 'PAYMENT_STRATEGIES',
          useValue: mockStrategies,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call paypal strategy', () => {
    const result = service.makePayment(100, 'paypal');
    expect(result).toBe('paypal ok');
    expect(mockStrategies.paypal['process']).toHaveBeenCalledWith(100);
  });

  it('should call credit-card strategy', () => {
    const result = service.makePayment(200, 'credit-card');
    expect(result).toBe('card ok');
    expect(mockStrategies['credit-card']['process']).toHaveBeenCalledWith(200);
  });

  it('should call bank-transfer strategy', () => {
    const result = service.makePayment(300, 'bank-transfer');
    expect(result).toBe('bank ok');
    expect(mockStrategies['bank-transfer']['process']).toHaveBeenCalledWith(
      300,
    );
  });

  it('should throw if payment method is not supported', () => {
    expect(() => service.makePayment(400, 'crypto')).toThrowError(
      'Payment method crypto is not supported',
    );
  });
});
