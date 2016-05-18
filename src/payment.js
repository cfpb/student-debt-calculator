'use strict';

 /**
  * calculate payments
  * @param { object } data - the data object
  * @returns { object } the data object with monthly and total payments
  */

var payment = {

  calculateMonthly: function( data, repaymentTerm ) {
    // loanMonthly - "Monthly Payments"
    var loanMonthly = data.perkinsDebt * ( data.perkinsRate / 12 ) / ( 1 - Math.pow( 1 + data.perkinsRate / 12, -repaymentTerm * 12 ) ) +
      data.directSubsidizedDebt * ( data.subsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.subsidizedRate / 12, -repaymentTerm * 12 ) ) +
      data.directUnsubsidizedDebt * ( data.unsubsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.unsubsidizedRate / 12, -repaymentTerm * 12 ) ) +
      data.gradPlusDebt * ( data.gradPlusRate / 12 ) / ( 1 - Math.pow( 1 + data.gradPlusRate / 12, -repaymentTerm * 12 ) ) +
      data.institutionalLoanDebt * ( data.institutionalLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.institutionalLoanRate / 12, -repaymentTerm * 12 ) );

    // Private Loan handler
    if ( data.privateLoanMulti.length !== 0 ) {
      for ( var x = 0; x < data.privateLoanMulti.length; x++ ) {
        var privLoan = data.privateLoanMulti[x];
        loanMonthly += privLoan.totalDebt * ( privLoan.rate / 12 ) / ( 1 - Math.pow( 1 + privLoan.rate / 12, -repaymentTerm * 12 ) );
      }
    } else {
      loanMonthly += data.privateLoanDebt * ( data.privateLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.privateLoanRate / 12, -repaymentTerm * 12 ) );
    }
    return loanMonthly;
  },

  calculateLifetime: function( data, repaymentTerm ) {
    // loanLifetime
    var loanLifetime = data.loanMonthly * repaymentTerm * 12;
    return loanLifetime;
  },

  calculateParentMonthly: function( data, repaymentTerm ) {
    // loanMonthlyparent
    var loanMonthlyparent = data.parentPlus * ( data.parentPlusRate / 12 ) /
        Math.pow( 1 - ( 1 + data.parentPlusRate / 12 ), -repaymentTerm * 12 ) +
        data.homeEquity * ( data.homeEquityLoanRate / 12 ) /
        Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -repaymentTerm * 12 );
    return loanMonthlyparent;
  },

  payment: function( data ) {
    // Calculate based on data.repaymentTerm field (legacy support)
    data.loanMonthly = payment.calculateMonthly( data, data.repaymentTerm );
    data.loanLifetime = payment.calculateLifetime( data, data.repaymentTerm );
    data.loanMonthlyparent = payment.calculateParentMonthly( data, data.repaymentTerm );

    // Calculate 10 year values
    data.tenYear = {};
    data.tenYear.loanMonthly = payment.calculateMonthly( data, 10 );
    data.tenYear.loanLifetime = payment.calculateLifetime( data, 10 );
    data.tenYear.loanMonthlyparent = payment.calculateParentMonthly( data, 10 );

    // Calculate 25 year values
    data.twentyFiveYear = {};
    data.twentyFiveYear.loanMonthly = payment.calculateMonthly( data, 25 );
    data.twentyFiveYear.loanLifetime = payment.calculateLifetime( data, 25 );
    data.twentyFiveYear.loanMonthlyparent = payment.calculateParentMonthly( data, 25 );

    return data;
  }

};

module.exports = payment.payment;