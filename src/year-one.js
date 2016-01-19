'use strict';

var yearOne = module.exports = {};

/**
 * calculate the cost of the first year of school
 * @param { object } data - the data object
 * @returns { object } the data object with first year cost total
 */
yearOne.cost = function( data ) {
  data.yearOneCosts = data.tuitionFees +
                      data.roomBoard +
                      data.books +
                      data.otherExpenses +
                      data.transportation;

  return data.yearOneCosts;
};

/**
 * calculate debt after the first year of school
 * @param { object } data - the data object
 * @returns { object } the data object with first year cost total
 */
yearOne.debt = function( data ) {
  data.loanDebtYearOne = data.perkins +
                        data.directSubsidized +
                        data.directUnsubsidized +
                        data.gradplus +
                        data.privateLoan +
                        data.institutionalLoan +
                        data.parentplus +
                        data.homeEquity;

  return data.loanDebtYearOne;
};
