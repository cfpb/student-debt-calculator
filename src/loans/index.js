'use strict';

var perkins = require( './perkins' );
var subStafford = require( './subsidized-stafford' );
var unSubStafford = require( './unsubsidized-stafford' );
var gradPlus = require( './grad-plus' );
var institution = require( './institution' );
var privateLoans = require( './private' );

var enforceRange = require('../utils/enforce-range');

 /**
  * calculate total student loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
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


function loanTotals( data ) {

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
}

module.exports = studentLoans;
