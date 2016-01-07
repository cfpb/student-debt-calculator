'use strict';

var perkins = require( './perkins' );
var subStafford = require( './subsidized-stafford' );
var unSubStafford = require( './unsubsidized-stafford' );
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
  subStafford( data );
  unSubStafford( data );
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

  // Private Loan Total
  data.privateTotal = data.privateLoan + data.institutionalLoan;

  // Federal Total Loan
  data.federalTotal = data.perkins +
                      data.staffSubsidized +
                      data.staffUnsubsidized +
                      data.gradplus;

  // gap
  data.gap = data.firstYearNetCost -
             data.perkins -
             data.staffSubsidized -
             data.staffUnsubsidized -
             data.workstudy -
             data.savings -
             data.family -
             data.state529plan -
             data.privateLoan -
             data.institutionalLoan -
             data.parentplus -
             data.homeEquity;

  return data;
}

module.exports = studentLoans;
