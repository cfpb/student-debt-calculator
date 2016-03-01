'use strict';

var enforceRange = require( '../utils/enforce-range' );

 /**
  * calculate subsidized Direct loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function subDirect( data ) {
  var year = data.yearInCollege;

  // aa programs are calculated the same as year 1
  if ( data.program === 'aa' ) {
    year = 1;
  }

  if ( data.undergrad === false ) {
    data.directSubsidizedMax = 0;
  } else {
    data.directSubsidizedMax = calculateMaxRange( year, data );
  }

  // Error handling
  if ( data.directSubsidized > 0 && data.undergrad === false ) {
    data.errors.subsidizedNoGrad = 'Direct subsidized loans are available only to undergraduate students.';
  }
  if ( data.directSubsidized > data.yearOneCosts - data.pell - data.perkins ) {
    data.errors.subsidizedOverCost = 'Direct subsidized loans exceed cost of attendance.';
  }
  console.log( data.directSubsidizedMax );
  if ( data.directSubsidized > data.directSubsidizedMax ) {
    data.errors.subsidizedOverCap = 'Direct subsidized loans exceed federal limit of ' +
      data.directSubsidizedMax + '.';
  }

  data.directSubsidized = enforceRange(
    data.directSubsidized,
    0,
    data.directSubsidizedMax
  );

  data.directSubsidized = enforceRange(
    data.directSubsidized,
    0,
    data.yearOneCosts - data.pell - data.perkins
  );

  return data;
}

/**
 * calculate the max range by program year
 * @param { number } year - the student's program year
 * @param { object } data - our data object
 * @returns { number } range enforced number
 */
function calculateMaxRange( year, data ) {
  var range = 0;
  if ( year === 1 ) {
    range = data.subsidizedCapYearOne;
  }
  if ( year === 2 ) {
    range = data.subsidizedCapYearTwo - data.directSubsidized;
  }
  if ( year === 3 ) {
    range = data.subsidizedCapYearThree - data.directSubsidized;
  }
  return range;
}

module.exports = subDirect;
