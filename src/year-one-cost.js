'use strict';

/**
 * calculate the cost of the first year of school
 * @param { object } data - the data object
 * @returns { object } the data object with first year cost total
 */
function yearOneCost( data ) {
  data.yearOneCosts = data.tuitionFees +
                      data.roomBoard +
                      data.books +
                      data.otherExpenses +
                      data.transportation;

  return data.yearOneCosts;

}

module.exports = yearOneCost;
