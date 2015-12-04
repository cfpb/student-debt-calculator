'use strict';

var enforceRange = require('../utils/enforce-range');

 /**
  * calculate private loan totals
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function privateCalc( data ) {

  // Other Loans
  data.privateLoanMax = data.firstYearNetCost -
                        data.perkins -
                        data.staffSubsidized -
                        data.staffUnsubsidized -
                        data.institutionalLoan -
                        data.gradplus;

  // maximum cannot be less than 0
  data.privateLoanMax = enforceRange( data.privateLoanMax, 0, false );

  // enforce "other private" loan limits
  data.privateLoan = enforceRange( data.privateLoan, 0, data.privateLoanMax );

  // Private Loan Total
  data.privateTotal = data.privateLoan + data.institutionalLoan;

  return data;
}

module.exports = privateCalc;
