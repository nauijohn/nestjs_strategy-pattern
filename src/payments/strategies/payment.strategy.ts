export interface IPaymentStrategy {
  process(amount: number): string;
}

export interface IPaymentStrategies {
  [key: string]: IPaymentStrategy;
  ['paypal']: IPaymentStrategy;
  ['credit-card']: IPaymentStrategy;
  ['bank-transfer']: IPaymentStrategy;
}
