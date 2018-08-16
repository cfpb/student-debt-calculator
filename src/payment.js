'use strict';

var tuitionRepayCalc = require( './loans/tuition-repayment.js' );

/**
  * calculate payments
  * @param { object } data - the data object
  * @returns { object } the data object with monthly and total payments
  */

var payment = {

  calculateMonthly: function( debt, rate, term ) {
    var monthly = 0;

    if ( rate === 0 ) {
      monthly = debt / ( term * 12 );
    } else {
      monthly = debt * ( rate / 12 ) /
        ( 1 - Math.pow( 1 + rate / 12, -1 * term * 12 ) );
    }

    return monthly;
  },

  calculateMonthlyTotal: function( data, term ) {
    // loanMonthly - "Monthly Payments"
    var loanMonthly =
      payment.calculateMonthly(
        data.perkinsDebt, data.perkinsRate, term ) +
      payment.calculateMonthly(
        data.directSubsidizedDebt, data.subsidizedRate, term ) +
      payment.calculateMonthly(
        data.directUnsubsidizedDebt, data.unsubsidizedRate, term ) +
      payment.calculateMonthly(
        data.gradPlusDebt, data.gradPlusRate, term ) +
      payment.calculateMonthly(
        data.institutionalLoanDebt, data.institutionalLoanRate, term );

    // Private Loan handler
    if ( data.privateLoanMulti.length !== 0 ) {
      for ( var x = 0; x < data.privateLoanMulti.length; x++ ) {
        var privLoan = data.privateLoanMulti[x];
        loanMonthly +=
          payment.calculateMonthly( privLoan.totalDebt, privLoan.rate, term );
      }
    } else {
      loanMonthly +=
        payment.calculateMonthly( data.privateLoanDebt, data.privateLoanRate, term );
    }
    return loanMonthly;
  },

  calculateLifetime: function( loanMonthly, repaymentTerm ) {
    // loanLifetime
    var loanLifetime = loanMonthly * repaymentTerm * 12;
    return loanLifetime;
  },

  calculateParentMonthly: function( data, repaymentTerm ) {
    // loanMonthlyParent
    var loanMonthlyParent = data.parentPlus * ( data.parentPlusRate / 12 ) /
        Math.pow( 1 - ( 1 + data.parentPlusRate / 12 ), -repaymentTerm * 12 ) +
        data.homeEquity * ( data.homeEquityLoanRate / 12 ) /
        Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -repaymentTerm * 12 );
    return loanMonthlyParent;
  },

  payment: function( data ) {
    // Calculate based on data.repaymentTerm field (legacy support)
    data.loanMonthly =
      payment.calculateMonthlyTotal( data, data.repaymentTerm );
    data.loanLifetime =
      payment.calculateLifetime( data.loanMonthly, data.repaymentTerm );
    data.loanMonthlyParent =
      payment.calculateParentMonthly( data, data.repaymentTerm );

    // Calculate 10 year values
    data.tenYear = {};
    data.tenYear.loanMonthly = payment.calculateMonthlyTotal( data, 10 );
    data.tenYear.loanLifetime =
      payment.calculateLifetime( data.tenYear.loanMonthly, 10 );
    data.tenYear.loanMonthlyParent = payment.calculateParentMonthly( data, 10 );

    // Calculate 25 year values
    data.twentyFiveYear = {};
    data.twentyFiveYear.loanMonthly = payment.calculateMonthlyTotal( data, 25 );
    data.twentyFiveYear.loanLifetime =
      payment.calculateLifetime( data.twentyFiveYear.loanMonthly, 25 );
    data.twentyFiveYear.loanMonthlyParent = payment.calculateParentMonthly( data, 25 );

    data.tuitionRepayMonthly = tuitionRepayCalc.calculateMonthlyPayment( data );

    return data;
  }

};

module.exports = payment.payment;
