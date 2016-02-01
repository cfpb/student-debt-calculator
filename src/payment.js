'use strict';

 /**
  * calculate payments
  * @param { object } data - the data object
  * @returns { object } the data object with monthly and total payments
  */
function payment( data ) {
  // loanMonthly - "Monthly Payments"
  data.loanMonthly = data.perkinsTotal * ( data.perkinsRate / 12 ) / ( 1 - Math.pow( 1 + data.perkinsRate / 12, -data.repaymentTerm * 12 ) ) +
  data.directSubsidizedTotal * ( data.subsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.subsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.directUnsubsidizedTotal * ( data.unsubsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.unsubsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.gradPlusTotal * ( data.gradPlusRate / 12 ) / ( 1 - Math.pow( 1 + data.gradPlusRate / 12, -data.repaymentTerm * 12 ) ) +
  data.privateLoanTotal * ( data.privateLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.privateLoanRate / 12, -data.repaymentTerm * 12 ) ) +
  data.institutionalLoanTotal * ( data.institutionalLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.institutionalLoanRate / 12, -data.repaymentTerm * 12 ) );

  // loanMonthlyparent
  data.loanMonthlyparent = data.parentPlus * ( data.parentPlusRate / 12 ) / Math.pow( 1 - ( 1 + data.parentPlusRate / 12 ), -data.repaymentTerm * 12 ) + data.homeEquity * ( data.homeEquityLoanRate / 12 ) / Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -data.repaymentTerm * 12 );

  // loanLifetime
  data.loanLifetime = data.loanMonthly * data.repaymentTerm * 12;

  return data;
}

module.exports = payment;
