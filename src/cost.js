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

  // Borrowing Total
  data.borrowingtotal = data.privateTotal + data.federalTotal;

  // Out of Pocket Total
  data.totalOutOfPocket = data.grantsTotal + data.savingsTotal;

  // Money for College Total
  data.moneyforcollege = data.totalOutOfPocket + data.borrowingtotal;

  // remainingcost -- "Left to Pay"
  data.remainingcost = data.firstYearNetCost - data.totalOutOfPocket;
  if ( data.remainingcost < 0 ) {
    data.remainingcost = 0;
  }

  return data;
}

module.exports = cost;
