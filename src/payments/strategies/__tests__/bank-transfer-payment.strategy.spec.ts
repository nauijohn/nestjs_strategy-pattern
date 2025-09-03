import { BankTransferPaymentStrategy } from '../bank-transfer-payment.strategy';

describe('BankTransferPaymentStrategy', () => {
  let strategy: BankTransferPaymentStrategy;

  beforeEach(() => {
    strategy = new BankTransferPaymentStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return correct message when processing payment', () => {
    const result = strategy.process(250);
    expect(result).toBe('Paid $250 using Bank Transfer');
  });

  it('should format the amount dynamically', () => {
    const result = strategy.process(999);
    expect(result).toBe('Paid $999 using Bank Transfer');
  });
});
