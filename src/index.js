'use strict';

var merge = require( './utils/merge' );
var defaults = require( './default-values' );
var rates = require( './rates' );
var yearOne = require( './year-one' );
var scholarship = require( './scholarship' );
var studentLoans = require( './loans/' );
var cost = require( './cost' );
var debtTotal = require( './debt-total' );
var payment = require( './payment' );

/**
 * calculate student debt
 * @param { object } financials - an object containing unique loan values
 * @returns { object } an with the overall cost of the loan
 */
function studentDebtCalculator( financials ) {

  var data = {};

  // merge financials into defaults to create data
  data = merge( defaults, financials );

  // reset errors
  data.errors = {};

  // set rate values
  rates.inState( data );
  rates.unsubsidized( data );

  // add the value for the cost of the first year
  yearOne.cost( data );

  // calculate scholarships and grants
  scholarship( data );

  // calculate student loans
  studentLoans( data );

  // calculate the borrowing total, out of pocket total,
  // money for college, and remaining cost after expenses
  cost( data );

  // calculate the year one debt
  yearOne.debt( data );

  // calculate costs and debt totals
  debtTotal( data );

  // calculate monthly and total overall payment
  payment( data );

  return data;

}

module.exports = studentDebtCalculator;
