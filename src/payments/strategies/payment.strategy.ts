export interface IPaymentStrategy {
  process(amount: number): string;
}

export interface IPaymentStrategies {
  ['paypal']: IPaymentStrategy;
  ['credit-card']: IPaymentStrategy;
  ['bank-transfer']: IPaymentStrategy;
}
