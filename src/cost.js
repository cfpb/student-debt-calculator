'use strict';

 /**
  * calculate borrowing total and out of pocket costs
  * @param { object } data - the data object
  * @returns { object } the data object with cost
  */
function cost( data ) {

  // Money for College Total
  data.moneyForCollege = data.grantsSavingsTotal + data.borrowingTotal;

  // remainingCost -- "Left to Pay" is costofAttendance - grantsTotal - savingsTotal
  data.remainingCost = data.costOfAttendance - data.grantsSavingsTotal;

  return data;
}

module.exports = cost;
