'use strict';

var extend = require( 'extend' );

 /**
  * merges financial object with the default values
  * @param { object }  defaults - Our default values
  * @param { financials } financials - Our user defined values
  * @returns { object } merged defaults and user defined object
  */
function merge( defaults, financials ) {
  return extend( defaults, financials );
}

module.exports = merge;
