import { CreditCardPaymentStrategy } from '../creditcard-payment.strategy';

describe('CreditCardPaymentStrategy', () => {
  let strategy: CreditCardPaymentStrategy;

  beforeEach(() => {
    strategy = new CreditCardPaymentStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return correct message when processing payment', () => {
    expect(strategy.process(150)).toBe('Paid $150 using Credit Card');
    expect(strategy.process(500)).toBe('Paid $500 using Credit Card');
  });
});
