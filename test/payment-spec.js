import { payment } from '../src/payment.js';
import defaultValues from '../src/default-values.js';
import calcDebt from '../src/calc-debt.js';

describe('payment calculator', function () {
  it('calculates the cost of loans over the lifetime of the loan', function () {
    defaultValues.programLength = 2;
    defaultValues.perkinsDebt = 2000;
    defaultValues.directSubsidizedDebt = 0;
    defaultValues.directUnsubsidizedDebt = 0;
    defaultValues.gradPlusDebt = 0;
    defaultValues.privateLoanTotal = 0;
    defaultValues.institutionalLoanDebt = 0;
    defaultValues.perkinsLoanRate = 0.05;
    defaultValues.privateLoanMulti = [];
    defaultValues.privateLoan = 0;
    defaultValues.privateLoanDebt = 0;

    payment(defaultValues);

    expect(Math.round(defaultValues.loanLifetime)).toEqual(2546);
    expect(Math.round(defaultValues.tenYear.loanLifetime)).toEqual(2546);
    expect(Math.round(defaultValues.twentyFiveYear.loanLifetime)).toEqual(3508);

    defaultValues.directSubsidizedDebt = 4000;
    defaultValues.subsidizedRate = 0.0466;
    payment(defaultValues);
    expect(Math.round(defaultValues.loanLifetime)).toEqual(7557);
    expect(Math.round(defaultValues.tenYear.loanLifetime)).toEqual(7557);
    expect(Math.round(defaultValues.twentyFiveYear.loanLifetime)).toEqual(
      10287
    );

    defaultValues.directUnsubsidizedWithFee = 1500;
    defaultValues.unsubsidizedRate = 0.0466;
    defaultValues.deferPeriod = 6;
    defaultValues.directUnsubsidizedDebt = calcDebt(
      defaultValues.directUnsubsidizedWithFee,
      defaultValues.unsubsidizedRate,
      defaultValues.programLength,
      defaultValues.deferPeriod
    );
    payment(defaultValues);
    expect(Math.round(defaultValues.loanLifetime)).toEqual(11666);
    expect(Math.round(defaultValues.tenYear.loanLifetime)).toEqual(11666);
    expect(Math.round(defaultValues.twentyFiveYear.loanLifetime)).toEqual(
      15845
    );

    defaultValues.institutionalLoan = 1500;
    defaultValues.institutionalLoanRate = 0.079;
    defaultValues.institutionalLoanDebt = calcDebt(
      defaultValues.institutionalLoan,
      defaultValues.institutionalLoanRate,
      defaultValues.programLength,
      defaultValues.deferPeriod
    );
    payment(defaultValues);
    expect(Math.round(defaultValues.loanLifetime)).toEqual(16702);
    expect(Math.round(defaultValues.tenYear.loanLifetime)).toEqual(16702);
    expect(Math.round(defaultValues.twentyFiveYear.loanLifetime)).toEqual(
      23820
    );

    defaultValues.privateLoanMulti = [
      { amount: 5000, fees: 0, rate: 0.079, deferPeriod: 0, totalDebt: 11580 },
    ];
    payment(defaultValues);
    expect(Math.round(defaultValues.loanLifetime)).toEqual(33489);
    expect(Math.round(defaultValues.tenYear.loanLifetime)).toEqual(33489);
    expect(Math.round(defaultValues.twentyFiveYear.loanLifetime)).toEqual(
      50404
    );

    defaultValues.privateLoanMulti = [
      { amount: 1000, rate: 0, deferPeriod: 0, totalDebt: 2000 },
    ];
    payment(defaultValues);
    expect(Math.round(defaultValues.loanMonthly)).toEqual(156);
  });
});
