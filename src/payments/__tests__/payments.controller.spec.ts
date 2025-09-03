import { Test, TestingModule } from '@nestjs/testing';

import { PaymentsController } from '../payments.controller';
import { PaymentsService } from '../payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: {
            makePayment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call PaymentsService.makePayment with correct arguments', () => {
    (service.makePayment as jest.Mock).mockReturnValue('success');

    const result = controller.pay(100, 'paypal');

    expect(service['makePayment']).toHaveBeenCalledWith(100, 'paypal');
    expect(result).toBe('success');
  });
});
