'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate private loan totals
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function privateCalc( data ) {

  // enforce range of private loans
  data.privateLoan = enforceRange( data.privateLoan, 0, false );

  // Private Loan Total
  data.privateTotal = data.privateLoan + data.institutionalLoan;

  return data;
}

module.exports = privateCalc;
