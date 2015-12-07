'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate institution loans and enforece range
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function institution( data ) {

  data.institutionalLoanMax = data.firstYearNetCost -
                              data.perkins -
                              data.staffSubsidized -
                              data.staffUnsubsidized -
                              data.parentplus -
                              data.gradplus -
                              data.homeEquity;

  // maximum cannot be less than 0
  data.institutionalLoanMax = enforceRange(
    data.institutionalLoanMax,
    0,
    false
  );

  // enforce institutional loan limits
  data.institutionalLoan = enforceRange(
    data.institutionalLoan,
    0,
    data.institutionalLoanMax
  );

  return data;
}

module.exports = institution;
