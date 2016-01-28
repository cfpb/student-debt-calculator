'use strict';

var perkins = require( './perkins' );
var directSub = require( './direct-subsidized' );
var directUnsub = require( './direct-unsubsidized' );
var gradPlus = require( './grad-plus' );
var institution = require( './institution' );
var privateLoans = require( './private' );

 /**
  * calculate total student loans
  * @param { object } data - our data object
  * @returns { object } the data object with student loan data
  */
function studentLoans( data ) {

  // calculate loan types and enfore ranges
  perkins( data );
  directSub( data );
  directUnsub( data );
  gradPlus( data );
  privateLoans( data );
  institution( data );

  // calculate the total federal loans and gap
  loanTotals( data );

  return data;
}

/**
 * calculate overall loan totals
 * @param { object } data - our data object
 * @returns { object } the data object totals for federal and gap
 */
function loanTotals( data ) {

  if ( data.privateLoanMulti.length > 0 ) {
    data.privateLoanTotal = 0;
    for ( var x = 0; x < data.privateLoanMulti.length; x++ ) {
      data.privateLoanTotal += data.privateLoanMulti[x].amount;
    }
  } else {
    data.privateLoanTotal = data.privateLoan;
  }

  // Private and Institutional Loan Total
  data.privateInstitutionalTotal = data.privateLoanTotal +
                                   data.institutionalLoan;

  // Federal Total Loan
  data.federalTotal = data.perkins +
                      data.directSubsidized +
                      data.directUnsubsidized +
                      data.directPlus +
                      data.gradplus;

  // Borrowing Total
  data.borrowingTotal = data.privateInstitutionalTotal + data.federalTotal;

  // gap
  data.gap = data.yearOneCosts -
             data.grantsSavingsTotal -
             data.borrowingTotal;

  return data;
}

module.exports = studentLoans;
