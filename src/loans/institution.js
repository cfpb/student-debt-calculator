'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate institution loans and enforece range
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function institution( data ) {

  // enforce institutional loan limits
  data.institutionalLoan = enforceRange( data.institutionalLoan, 0, false );

  return data;
}

module.exports = institution;
