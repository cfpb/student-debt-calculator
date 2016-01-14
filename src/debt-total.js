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
  if ( data.yearOneCosts < data.outofpockettotal +
    data.borrowingtotal ) {
    data.overborrowing = data.borrowingtotal +
                         data.outofpockettotal -
                         data.yearOneCosts;
  }

  // Estimated Debt Calculation
  // Perkins debt at graduation
  data.perkinsTotal = data.perkins * data.programLength;

  // Direct Subsidized Loan with 1% Origination Fee
  data.staffSubsidizedWithFee = data.staffSubsidized *
                                data.DLOriginationFee;

  // Subsidized debt at graduation
  data.staffSubsidizedTotal = data.staffSubsidizedWithFee *
                              data.programLength;

  // Direct Unsubsidized Loan with 1% Origination Fee
  data.staffUnsubsidizedWithFee = data.staffUnsubsidized *
                                  data.DLOriginationFee;

  // Unsubsidized debt at graduation
  data.staffUnsubsidizedTotal = calcDebt(
    data.staffUnsubsidizedWithFee,
    data.unsubsidizedRate,
    data.programLength,
    data.deferPeriod
  );

  // Grad Plus with origination
  data.gradplusWithFee = data.gradplus * data.plusOriginationFee;

  // Grad Plus debt at graduation
  data.gradplusTotal = calcDebt(
    data.gradplusWithFee,
    data.gradplusRate,
    data.programLength,
    data.deferPeriod
  );

  // Parent Plus Loans with origination fees
  data.parentplusWithFee = data.parentplus * data.plusOriginationFee;

  // Parent Plus Loans at graduation
  data.parentplusTotal = data.parentplusWithFee * data.programLength;

  // Private Loan debt at graduation
  if ( multiLength > 0 ) {
    // Multiple Private Loans:
    data.privateLoanTotal = 0;
    for ( var x = 0; x < multiLength; x++ ) {
      var loan = data.privateLoanMulti[x],
          debt = calcDebt( loan.amount,
            loan.rate, data.programLength, loan.deferPeriod );
      data.privateLoanTotal += debt;
    }
  } else {
    // Single Private Loan:
    data.privateLoanTotal = calcDebt( data.privateLoan,
      data.privateLoanRate, data.programLength, data.deferPeriod );
  }

  // Institutional Loan debt at graduation
  data.institutionalLoanTotal = calcDebt( data.institutionalLoan,
    data.institutionalLoanRate, data.programLength, data.deferPeriod );

  // Home Equity Loans at graduation
  data.homeEquityTotal = data.homeEquity * data.homeEquityLoanRate / 12 *
  ( ( data.programLength * ( data.programLength + 1 ) / 2 * 12 ) );

  // Total debt at graduation
  data.totalDebt = data.perkinsTotal +
                  data.staffSubsidizedTotal +
                  data.staffUnsubsidizedTotal +
                  data.gradplusTotal +
                  data.parentplusTotal +
                  data.privateLoanTotal +
                  data.institutionalLoanTotal +
                  data.homeEquityTotal;

  return data;
}

module.exports = debtTotal;
