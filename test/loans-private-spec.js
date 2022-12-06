import loans from '../src/loans/index.js';
import defaultValues from '../src/default-values.js';

describe('private loan functions', () => {
  it('totals multiple private loans', () => {
    defaultValues.privateLoanMulti = [
      { amount: 2000, rate: 0.079, deferPeriod: 6 },
      { amount: 3000, rate: 0.061, deferPeriod: 6 },
      { amount: 4000, rate: 0.041, deferPeriod: 6 },
    ];
    loans(defaultValues);
    expect(defaultValues.privateLoanTotal).toEqual(9000);
  });
});
