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
    data.directSubsidizedMax = data.yearOneCosts - data.pell - data.perkins;
    data.directSubsidizedMax = calculateMaxRange( year, data );
  }

  data.directSubsidized = enforceRange(
    data.directSubsidized,
    0,
    data.directSubsidizedMax
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
  var range = data.directSubsidizedMax;
  if ( year === 1 ) {
    range = data.subsidizedCapYearOne;
  }
  if ( year === 2 ) {
    range = data.subsidizedCapYearTwo - data.directSubsidized;
  }
  if ( year === 3 ) {
    range = data.subsidizedCapYearThree - data.directSubsidized;
  }
  return enforceRange(
    data.directSubsidizedMax,
    0,
    range
  );

}

module.exports = subDirect;
