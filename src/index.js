import merge from './utils/merge.js';
import defaultValues from './default-values.js';
import { ratesInState, ratesUnsubsidized } from './rates.js';
import { yearOneCost, yearOneDebt } from './year-one.js';
import scholarship from './scholarship.js';
import studentLoans from './loans/index.js';
import cost from './cost.js';
import debtTotal from './debt-total.js';
import { payment } from './payment.js';

/**
 * calculate student debt
 * @param { object } financials - an object containing unique loan values
 * @returns { object } an with the overall cost of the loan
 */
function studentDebtCalculator(financials) {
  var data = {};

  // Merge financials into defaults to create data.
  data = merge(defaultValues, financials);

  // reset errors
  data.errors = {};

  // set rate values
  ratesInState(data);
  ratesUnsubsidized(data);

  // add the value for the cost of the first year
  yearOneCost(data);

  // calculate scholarships and grants
  scholarship(data);

  // calculate student loans
  studentLoans(data);

  // calculate the borrowing total, out of pocket total,
  // money for college, and remaining cost after expenses
  cost(data);

  // calculate the year one debt
  yearOneDebt(data);

  // calculate costs and debt totals
  debtTotal(data);

  // calculate monthly and total overall payment
  payment(data);

  return data;
}

export default studentDebtCalculator;
