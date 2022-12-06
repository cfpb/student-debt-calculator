import enforceRange from '../utils/enforce-range.js';

/**
 * calculate grad plus loans
 * @param { object } data - our data object
 * @returns { object } the data object with perkins data added
 */
function gradPlus(data) {
  var gradPlusMax =
    data.costOfAttendance - data.perkins - data.directUnsubsidized;

  // if undergrad, students aren't eligable for grad plus
  if (data.undergrad === true) {
    data.gradPlus = 0;
    return data;
  }

  if (data.gradPlus > gradPlusMax) {
    data.errors.gradPlusOverCost =
      'Grad PLUS loans cannot exceed the cost of ' +
      'attendance minus any other financial aid received.';
  }
  data.gradPlus = enforceRange(data.gradPlus, 0, gradPlusMax);

  return data;
}

export default gradPlus;
