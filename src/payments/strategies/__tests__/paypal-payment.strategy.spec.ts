import { PayPalPaymentStrategy } from '../paypal-payment.strategy';

describe('PayPalPaymentStrategy', () => {
  let strategy: PayPalPaymentStrategy;

  beforeEach(() => {
    strategy = new PayPalPaymentStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return correct message when processing payment', () => {
    expect(strategy.process(75)).toBe('Paid $75 using PayPal');
    expect(strategy.process(300)).toBe('Paid $300 using PayPal');
  });
});
