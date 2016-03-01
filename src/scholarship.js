'use strict';

var enforceRange = require( './utils/enforce-range.js' );

 /**
  * calculate scholarships and grants
  * @param { object } data - the data object
  * @returns { object } the data object with scholarship and grant totals
  */
function scholarships( data ) {
  // Pell Grants
  data.pellMax = 0;
  if ( data.undergrad === true ) {
    data.pellMax = data.pellCap;
  }
  // enforce limits on Pell grants
  if ( data.pell > data.yearOneCosts ) {
    data.errors.pellOverCosts = 'The Pell grant exceeds the cost of attendance.';
  }
  data.pellMax = enforceRange( data.pellMax, 0, data.yearOneCosts );
  
  if ( data.pell > data.pellMax ) {
    data.errors.pellOverMax = 'The Pell grant exceeds the Pell maximum.';
  }
  data.pell = enforceRange( data.pell, 0, data.pellMax );

  // Total Grants
  data.grantsTotal = data.pell + data.scholarships +
                     data.GIBill + data.militaryTuitionAssistance;

  // First Year Net Cost
  data.firstYearNetCost = data.yearOneCosts - data.grantsTotal;

  // Total Contributions
  data.savingsTotal = data.savings +
                      data.family +
                      data.state529plan +
                      data.workstudy;

  // Total grants and savings
  data.grantsSavingsTotal = data.grantsTotal + data.savingsTotal;

  return data;
}

module.exports = scholarships;
