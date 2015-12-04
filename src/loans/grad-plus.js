'use strict';

var enforceRange = require('../utils/enforce-range');

 /**
  * calculate grad plus loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function gradPlus( data ) {

  // if undergrad, students aren't eligable for grad plus
  if ( data.undergrad === true ) {
    data.gradplusMax = 0;
    data.gradplus = 0;
    return data;
  }

  // calculate the grad plus max and range for grad students
  data.gradplusMax = data.firstYearNetCost -
                    data.perkins -
                    data.staffSubsidized -
                    data.staffUnsubsidized;
  data.gradplusMax = enforceRange( data.gradplusMax, 0, false );
  // currently a data.gradplus value must be assigned
  // if data.gradplus is less than the max the value is 0 due to the enforced range
  data.gradplus = enforceRange( data.gradplus, 0, data.gradplusMax );

  return data;
}

module.exports = gradPlus;
