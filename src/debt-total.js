import calcDebt from './calc-debt.js';
import tuitionRepayCalc from './loans/tuition-repayment.js';

/**
 * calculate total debt
 * @param { object } data - the data object
 * @returns { object } the data object with total debt
 */
function debtTotal(data) {
  var multiLength = data.privateLoanMulti.length;

  // Borrowing over cost of attendance
  data.overborrowing = 0;
  if (data.costOfAttendance < data.grantsSavingsTotal + data.borrowingTotal) {
    data.overborrowing =
      data.borrowingTotal + data.grantsSavingsTotal - data.costOfAttendance;
    if (data.overborrowing > data.borrowingTotal) {
      data.overborrowing = data.borrowingTotal;
    }
  }

  // Estimated Debt Calculation
  // Perkins debt at graduation
  data.perkinsDebt = data.perkins * Math.max(1, data.programLength);

  // Subsidized debt at graduation
  data.directSubsidizedDebt =
    data.directSubsidized * Math.max(1, data.programLength);

  // Unsubsidized debt at graduation
  data.directUnsubsidizedDebt = calcDebt(
    data.directUnsubsidized,
    data.unsubsidizedRate,
    Math.max(1, data.programLength),
    data.deferPeriod
  );

  // Grad Plus debt at graduation
  data.gradPlusDebt = calcDebt(
    data.gradPlus,
    data.gradPlusRate,
    Math.max(1, data.programLength),
    data.deferPeriod
  );

  // Parent Plus Loans at graduation
  data.parentPlusDebt = data.parentPlus * Math.max(1, data.programLength);

  // Private Loan debt at graduation
  if (multiLength > 0) {
    // Multiple Private Loans:
    data.privateLoanDebt = 0;
    for (var x = 0; x < multiLength; x++) {
      var loan = data.privateLoanMulti[x],
        amount = loan.amount,
        debt = 0;
      if (typeof loan.fees !== 'undefined') {
        amount = loan.amount + loan.amount * loan.fees;
      }
      debt = calcDebt(
        amount,
        loan.rate,
        Math.max(1, data.programLength),
        loan.deferPeriod
      );
      data.privateLoanMulti[x].totalDebt = debt;
      data.privateLoanDebt += debt;
    }
  } else {
    // Single Private Loan:
    data.privateLoanDebt = calcDebt(
      data.privateLoan,
      data.privateLoanRate,
      Math.max(1, data.programLength),
      data.deferPeriod
    );
  }

  // Institutional Loan debt at graduation
  data.institutionalLoanDebt =
    data.institutionalLoan * Math.max(1, data.programLength);

  // Home Equity Loans at graduation
  data.homeEquityDebt =
    ((data.homeEquity * data.homeEquityLoanRate) / 12) *
    (((data.programLength * (Math.max(1, data.programLength) + 1)) / 2) * 12);

  // Tuition Repayment plan at graduation (not added to total)
  data.tuitionRepayDebt = tuitionRepayCalc.calculateDebtAtGrad(data);

  // Total debt at graduation
  data.totalDebt =
    data.perkinsDebt +
    data.directSubsidizedDebt +
    data.directUnsubsidizedDebt +
    data.gradPlusDebt +
    data.privateLoanDebt +
    data.institutionalLoanDebt +
    data.homeEquityDebt;

  return data;
}

export default debtTotal;
