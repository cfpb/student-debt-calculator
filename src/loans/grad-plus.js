'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate grad plus loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function gradPlus( data ) {
  var costMax = data.yearOneCosts -
                 data.pell -
                 data.perkins -
                 data.directSubsidized -
                 data.directUnsubsidized;

  // if undergrad, students aren't eligable for grad plus
  if ( data.undergrad === true ) {
    data.gradPlusMax = 0;
    data.gradPlus = 0;
    return data;
  }

  if ( data.gradPlus > costMax ) {
    data.errors.gradPlusOverCost = 'Grad Plus loans exceed cost of attendance.';
  }

  // calculate the grad plus max and range for grad students
  data.gradPlusMax = data.firstYearNetCost -
                    data.perkins -
                    data.directSubsidized -
                    data.directUnsubsidized;

  if ( data.gradPlus > data.gradPlusMax ) {
    data.errors.gradPlusOverCap = 'Grad PLUS loans cannot exceed the cost of ' +
      'attendance minus any other financial aid received.';
  }

  data.gradPlusMax = enforceRange( data.gradPlusMax, 0, false );

  // data.gradPlus value must be assigned
  // if data.gradPlus is less than the max
  // the value is 0 due to the enforced range
  data.gradPlus = enforceRange( data.gradPlus, 0, data.gradPlusMax );

  return data;
}

module.exports = gradPlus;
