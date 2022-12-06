import studentDebtCalculator from '../src/index.js';

describe('overall debt calculations', () => {
  var financials = {
    tuitionFees: 10000,
    roomBoard: 2000,
    books: 1000,
    transportation: 500,
    otherExpenses: 250,
    scholarships: 0,
    militaryTuitionAssistance: 0,
    pell: 0,
    savings: 0,
    family: 0,
    perkins: 0,
    directSubsidized: 0,
    directUnsubsidized: 0,
    institutionalLoan: 0,
    privateLoan: 13750,
    undergrad: true,
    // specify grant & loan data for testing use
    institutionalLoanRate: 0.079,
    privateLoanRate: 0.079,
    pellCap: 5730,
    perkinsRate: 0.05,
    perkinsUnderCap: 5500,
    perkinsGradCap: 8000,
    subsidizedRate: 0.0466,
    unsubsidizedRateUndergrad: 0.0466,
    unsubsidizedRateGrad: 0.0621,
    DLOriginationFee: 1.01073,
    gradPlusRate: 0.0721,
    parentPlusRate: 0.0721,
    plusOriginationFee: 1.04292,
    homeEquityLoanRate: 0.079,
    privateLoanMulti: [],
    programLength: 4,
  };

  it('...calculates private loans.', () => {
    expect(studentDebtCalculator(financials).totalDebt).toEqual(68035);
  });

  it('...calculates institutional loans.', () => {
    financials.privateLoan = 0;
    financials.institutionalLoan = 13750;
    expect(studentDebtCalculator(financials).totalDebt).toEqual(55000);
  });

  it('...calculates Perkins loans.', () => {
    financials.institutionalLoan = 0;
    financials.perkins = 5500;
    expect(studentDebtCalculator(financials).totalDebt).toEqual(22000);
  });

  it('...enforces Perkins loan limit.', () => {
    financials.institutionalLoan = 0;
    financials.perkins = 999999;
    expect(studentDebtCalculator(financials).totalDebt).toEqual(22000);
  });

  it('...calculates Direct subsidized loans.', () => {
    financials.perkins = 0;
    financials.directSubsidized = 3500;
    expect(Math.floor(studentDebtCalculator(financials).totalDebt)).toEqual(
      14000
    );
  });

  it('...enforces Direct subsidized loan limit.', () => {
    financials.perkins = 0;
    financials.directSubsidized = 999999;
    studentDebtCalculator(financials);
    expect(Math.floor(studentDebtCalculator(financials).totalDebt)).toEqual(
      14000
    );
  });

  it('...calculates Direct unsubsidized loans.', () => {
    financials.directSubsidized = 0;
    financials.directUnsubsidized = 9500;
    expect(Math.floor(studentDebtCalculator(financials).totalDebt)).toEqual(
      43312
    );
  });

  it('...enforces Direct unsubsidized loan limit.', () => {
    financials.directSubsidized = 0;
    financials.directUnsubsidized = 999999;
    expect(Math.floor(studentDebtCalculator(financials).totalDebt)).toEqual(
      43312
    );
  });

  it('...properly calculates multiple loans.', () => {
    financials.perkins = 1000;
    financials.directSubsidized = 2000;
    financials.directUnsubsidized = 3000;
    financials.institutionalLoan = 1500;
    financials.privateLoan = 2500;
    expect(Math.floor(studentDebtCalculator(financials).totalDebt)).toEqual(
      44047
    );
  });

  it('...properly calculates remainingCost.', () => {
    financials.pell = 1000;
    financials.family = 2000;
    expect(Math.floor(studentDebtCalculator(financials).remainingCost)).toEqual(
      10750
    );
  });
});
