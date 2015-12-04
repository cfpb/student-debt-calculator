'use strict';

 /**
  * calculate payments
  * @param { object } data - the data object
  * @returns { object } the data object with monthly and total payments
  */
function payment( data ) {
  // loanMonthly - "Monthly Payments"
  data.loanMonthly = data.perkinsTotal * ( data.perkinsRate / 12 ) / ( 1 - Math.pow( 1 + data.perkinsRate / 12, -data.repaymentTerm * 12 ) ) +
  data.staffSubsidizedTotal * ( data.subsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.subsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.staffUnsubsidizedTotal * ( data.unsubsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.unsubsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.gradplusTotal * ( data.gradplusRate / 12 ) / ( 1 - Math.pow( 1 + data.gradplusRate / 12, -data.repaymentTerm * 12 ) ) +
  data.privateLoanTotal * ( data.privateLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.privateLoanRate / 12, -data.repaymentTerm * 12 ) ) +
  data.institutionalLoanTotal * ( data.institutionalLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.institutionalLoanRate / 12, -data.repaymentTerm * 12 ) );

  // loanMonthlyparent
  data.loanMonthlyparent = data.parentplus * ( data.parentplusrate / 12 ) / Math.pow( 1 - ( 1 + data.parentplusrate / 12 ), -data.repaymentTerm * 12 ) + data.homeEquity * ( data.homeEquityLoanRate / 12 ) / Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -data.repaymentTerm * 12 );

  // loanLifetime
  data.loanLifetime = data.loanMonthly * data.repaymentTerm * 12;

  return data;
}

module.exports = payment;
