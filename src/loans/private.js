import enforceRange from '../utils/enforce-range.js';

/**
 * calculate private loan totals
 * @param { object } data - our data object
 * @returns { object } the data object with perkins data added
 */
function privateCalc(data) {
  // enforce range of private loans
  data.privateLoan = enforceRange(data.privateLoan, 0, false);

  return data;
}

export default privateCalc;
