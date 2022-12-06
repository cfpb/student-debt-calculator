import debtTotal from '../src/debt-total.js';
import defaultValues from '../src/default-values.js';

describe('calculates debt totals', () => {
  it('accomodates for overborrowing', () => {
    defaultValues.grantsSavingsTotal = 10000;
    defaultValues.borrowingTotal = 12000;
    debtTotal(defaultValues);
    expect(defaultValues.overborrowing).toEqual(8250);
  });

  it('handles multiple private loans', () => {
    defaultValues.privateLoanMulti = [
      { amount: 2000, rate: 0.079, deferPeriod: 6 },
      { amount: 3000, rate: 0.061, deferPeriod: 6 },
      { amount: 4000, rate: 0.041, deferPeriod: 6 },
    ];
    debtTotal(defaultValues);
    expect(defaultValues.privateLoanDebt).toEqual(9896 + 14196 + 17968);
  });

  it('handles multiple private loans with fees', () => {
    defaultValues.privateLoanMulti = [
      { amount: 2000, rate: 0.079, deferPeriod: 6, fees: 0.02 },
      { amount: 3000, rate: 0.061, deferPeriod: 6, fees: 0.01 },
      { amount: 4000, rate: 0.041, deferPeriod: 6, fees: 0.03 },
    ];
    debtTotal(defaultValues);
    expect(defaultValues.privateLoanDebt).toEqual(
      10093.92 + 14337.96 + 18507.04
    );
  });
});
