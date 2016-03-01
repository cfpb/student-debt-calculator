'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate perkins loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function perkins( data ) {
  data.perkinsMax = data.yearOneCosts - data.pell;
  if ( data.perkins > data.perkinsMax ) {
    data.errors.perkinsOverCost = 'Perkins loan exceeded cost of attendance.';
  }
  data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsUnderCap );
  if ( data.undergrad !== true ) {
    data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsGradCap );
  }
  if ( data.perkins > data.perkinsMax ) {
    data.errors.perkinsOverMax = 'Perkins loan exceeded federal limit of ' + data.perkinsMax + '.';
  }
  data.perkins = enforceRange( data.perkins, 0, data.perkinsMax );

  return data;
}

module.exports = perkins;
