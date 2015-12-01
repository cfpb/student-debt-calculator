 /**
  * @param { number } n - A number or string to be checked
  * @param { number Boolean } min - The minimum value to be enforced on n,
  *   if min is 'false', then no minimum is enforced. 
  * @param { number Boolean } min - The maximum value to be enforced on n,
  *   if min is 'false', then no maximum is enforced.
  */

'use strict';

function calcDebt( amount, rate, programLength, deferPeriod ) {
  var total = amount  * rate / 12 * ( ( programLength * ( programLength + 1 ) / 2 * 12 + programLength * deferPeriod ) ) + ( amount  * programLength );

  return total;
}

module.exports = calcDebt;
