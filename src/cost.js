'use strict';

 /**
  * calculate borrowing total and out of pocket costs
  * @param { object } data - the data object
  * @returns { object } the data object with cost
  */
function cost( data ) {

  // cost of attendance
  data.costOfAttendance = data.tuitionFees +
                        data.roomBoard +
                        data.books +
                        data.otherExpenses +
                        data.transportation;

  // Money for College Total
  data.moneyForCollege = data.grantsSavingsTotal + data.borrowingTotal;

  // remainingCost -- "Left to Pay" is costofAttendance - grantsTotal - savingsTotal
  data.remainingCost = data.firstYearNetCost - data.savingsTotal;

  return data;
}

module.exports = cost;
