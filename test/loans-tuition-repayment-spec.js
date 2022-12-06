import tuitionRepayCalc from '../src/loans/tuition-repayment.js';
const testData = {
  tuitionRepay: 10000,
  tuitionRepayTerm: 12,
  tuitionRepayRate: 0.0379,
  programLength: 4,
};

describe('tuitionRepayCalc ', function () {
  it('calculates the subsidized portion of a tuition repayment plan', function () {
    var subsidized = tuitionRepayCalc.getSubsidizedPortion(testData);
    expect(Math.round(subsidized)).toEqual(10000);
  });

  it('calculates the unsubsidized portion of a tuition repayment plan', function () {
    var unsubsized = tuitionRepayCalc.getUnsubsidizedPortion(testData);
    expect(Math.round(unsubsized)).toEqual(0);
  });

  it('calculates tuition repayment monthly payment', function () {
    var debtAtGrad = tuitionRepayCalc.calculateMonthlyPayment(testData);
    expect(Math.round(debtAtGrad)).toEqual(833);
  });

  it('calculates tuition repayment debt when unsubsized term is 0', function () {
    var debtAtGrad = tuitionRepayCalc.calculateDebtAtGrad(testData);
    expect(Math.round(debtAtGrad)).toEqual(0);
  });

  it('calculates tuition repayment debt with an unsubsized term', function () {
    testData.tuitionRepayTerm = 48;
    testData.programLength = 2;
    var debtAtGrad = tuitionRepayCalc.calculateDebtAtGrad(testData);
    expect(Math.round(debtAtGrad)).toEqual(5100);
  });
});
