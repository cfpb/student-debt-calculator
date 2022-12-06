/**
 * Calculate borrowing total and out of pocket costs.
 * @param { object } data - The data object.
 * @returns { object } The data object with cost.
 */
function cost(data) {
  // Money for College Total
  data.moneyForCollege = data.grantsSavingsTotal + data.borrowingTotal;

  // remainingCost -- "Left to Pay" is costofAttendance - grantsTotal - savingsTotal
  data.remainingCost = data.costOfAttendance - data.grantsSavingsTotal;

  return data;
}

export default cost;
