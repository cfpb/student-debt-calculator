'use strict';

var enforceRange = require('../utils/enforce-range');

 /**
  * calculate perkins loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function perkins( data ) {
  data.perkinsMax = data.yearOneCosts - data.pell;
  data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsUnderCap );
  if ( data.undergrad !== true ) {
    data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsGradCap );
  }
  data.perkins = enforceRange( data.perkins, 0, data.perkinsMax );

  return data;
}

module.exports = perkins;
