import { BankTransferPaymentStrategy } from '../bank-transfer-payment.strategy';
import { CreditCardPaymentStrategy } from '../creditcard-payment.strategy';
import { IPaymentStrategies } from '../payment.strategy';
import { PayPalPaymentStrategy } from '../paypal-payment.strategy';

const createPaymentStrategies = (
  paypal: PayPalPaymentStrategy,
  card: CreditCardPaymentStrategy,
  bank: BankTransferPaymentStrategy,
): IPaymentStrategies => ({
  paypal,
  'credit-card': card,
  'bank-transfer': bank,
});

describe('PaymentStrategiesFactory', () => {
  let paypalStrategy: PayPalPaymentStrategy;
  let cardStrategy: CreditCardPaymentStrategy;
  let bankStrategy: BankTransferPaymentStrategy;
  let strategies: IPaymentStrategies;

  beforeEach(() => {
    // You can use real strategies because they are simple and have no dependencies
    paypalStrategy = new PayPalPaymentStrategy();
    cardStrategy = new CreditCardPaymentStrategy();
    bankStrategy = new BankTransferPaymentStrategy();

    // call the factory function manually
    strategies = createPaymentStrategies(
      paypalStrategy,
      cardStrategy,
      bankStrategy,
    );
  });

  it('should return an object with all strategies', () => {
    expect(strategies).toBeDefined();
    expect(strategies.paypal).toBe(paypalStrategy);
    expect(strategies['credit-card']).toBe(cardStrategy);
    expect(strategies['bank-transfer']).toBe(bankStrategy);
  });

  it('should call the correct strategy process method', () => {
    const amount = 123;

    const paypalResult = strategies.paypal.process(amount);
    expect(paypalResult).toBe(`Paid $${amount} using PayPal`);

    const cardResult = strategies['credit-card'].process(amount);
    expect(cardResult).toBe(`Paid $${amount} using Credit Card`);

    const bankResult = strategies['bank-transfer'].process(amount);
    expect(bankResult).toBe(`Paid $${amount} using Bank Transfer`);
  });
});
