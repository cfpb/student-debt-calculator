'use strict';

 /**
  * calculate payments
  * @param { object } data - the data object
  * @returns { object } the data object with monthly and total payments
  */
function payment( data ) {
  // loanMonthly - "Monthly Payments"
  data.loanMonthly = data.perkinsDebt * ( data.perkinsRate / 12 ) / ( 1 - Math.pow( 1 + data.perkinsRate / 12, -data.repaymentTerm * 12 ) ) +
  data.directSubsidizedDebt * ( data.subsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.subsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.directUnsubsidizedDebt * ( data.unsubsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.unsubsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.gradPlusDebt * ( data.gradPlusRate / 12 ) / ( 1 - Math.pow( 1 + data.gradPlusRate / 12, -data.repaymentTerm * 12 ) ) +
  data.institutionalLoanDebt * ( data.institutionalLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.institutionalLoanRate / 12, -data.repaymentTerm * 12 ) );

  // Private Loan handler
  if ( data.privateLoanMulti.length !== 0 ) {
    for ( var x = 0; x < data.privateLoanMulti.length; x++ ) {
      var privLoan = data.privateLoanMulti[x],
          total = privLoan.amount * privLoan.fees;
      data.loanMonthly += total * ( privLoan.rate / 12 ) / ( 1 - Math.pow( 1 + privLoan.rate / 12, -data.repaymentTerm * 12 ) );
    }
  } else {
    data.loanMonthly += data.privateLoanTotal * ( data.privateLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.privateLoanRate / 12, -data.repaymentTerm * 12 ) );
  }

  // loanMonthlyparent
  data.loanMonthlyparent = data.parentPlus * ( data.parentPlusRate / 12 ) / Math.pow( 1 - ( 1 + data.parentPlusRate / 12 ), -data.repaymentTerm * 12 ) +
      data.homeEquity * ( data.homeEquityLoanRate / 12 ) / Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -data.repaymentTerm * 12 );

  // loanLifetime
  data.loanLifetime = data.loanMonthly * data.repaymentTerm * 12;

  return data;
}

module.exports = payment;
