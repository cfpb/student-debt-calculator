'use strict';

var calcDebt = require( './calc-debt.js' );

 /**
  * calculate total debt
  * @param { object } data - the data object
  * @returns { object } the data object with total debt
  */
function debtTotal( data ) {
  var multiLength = data.privateLoanMulti.length;

  // Borrowing over cost of attendance
  data.overborrowing = 0;
  if ( data.yearOneCosts < data.grantsSavingsTotal +
    data.borrowingTotal ) {
    data.overborrowing = data.borrowingTotal +
                         data.grantsSavingsTotal -
                         data.yearOneCosts;
  }

  // Estimated Debt Calculation
  // Perkins debt at graduation
  data.perkinsDebt = data.perkins * data.programLength;

  // Direct Subsidized Loan with 1% Origination Fee
  data.directSubsidizedWithFee = data.directSubsidized *
                                data.DLOriginationFee;

  // Subsidized debt at graduation
  data.directSubsidizedDebt = data.directSubsidizedWithFee *
                              data.programLength;

  // Direct Unsubsidized Loan with 1% Origination Fee
  data.directUnsubsidizedWithFee = data.directUnsubsidized *
                                  data.DLOriginationFee;

  // Unsubsidized debt at graduation
  data.directUnsubsidizedDebt = calcDebt(
    data.directUnsubsidizedWithFee,
    data.unsubsidizedRate,
    data.programLength,
    data.deferPeriod
  );

  // Grad Plus with origination
  data.gradPlusWithFee = data.gradPlus * data.plusOriginationFee;

  // Grad Plus debt at graduation
  data.gradPlusDebt = calcDebt(
    data.gradPlusWithFee,
    data.gradPlusRate,
    data.programLength,
    data.deferPeriod
  );

  // Parent Plus Loans with origination fees
  data.parentPlusWithFee = data.parentPlus * data.plusOriginationFee;

  // Parent Plus Loans at graduation
  data.parentPlusDebt = data.parentPlusWithFee * data.programLength;

  // Private Loan debt at graduation
  if ( multiLength > 0 ) {
    // Multiple Private Loans:
    data.privateLoanDebt = 0;
    for ( var x = 0; x < multiLength; x++ ) {
      var loan = data.privateLoanMulti[x],
          amount = loan.amount,
          debt = 0;
      if ( typeof loan.fees !== 'undefined' ) {
        amount = loan.amount + ( loan.amount * loan.fees );
      }
      debt = calcDebt( amount, loan.rate, data.programLength, loan.deferPeriod );
      data.privateLoanDebt += debt;
    }
  } else {
    // Single Private Loan:
    data.privateLoanDebt = calcDebt( data.privateLoan,
      data.privateLoanRate, data.programLength, data.deferPeriod );
  }

  // Institutional Loan debt at graduation
  data.institutionalLoanDebt = calcDebt( data.institutionalLoan,
    data.institutionalLoanRate, data.programLength, data.deferPeriod );

  // Home Equity Loans at graduation
  data.homeEquityDebt = data.homeEquity * data.homeEquityLoanRate / 12 *
  ( ( data.programLength * ( data.programLength + 1 ) / 2 * 12 ) );

  // Total debt at graduation
  data.totalDebt = data.perkinsDebt +
                  data.directSubsidizedDebt +
                  data.directUnsubsidizedDebt +
                  data.gradPlusDebt +
                  data.parentPlusDebt +
                  data.privateLoanDebt +
                  data.institutionalLoanDebt +
                  data.homeEquityDebt;

  return data;
}

module.exports = debtTotal;
