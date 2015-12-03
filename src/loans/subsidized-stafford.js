'use strict';

var enforceRange = require('../utils/enforce-range');

 /**
  * calculate subsidized Stafford loans
  * @param { object } data - our data object
  * @returns { object } the data object with perkins data added
  */
function subStafford( data ) {
  var year = data.yearInCollege;

  // aa programs are calculated the same as year 1
  if (data.program === 'aa'){
    year = 1;
  }

  if ( data.undergrad === false ) {
    data.staffSubsidizedMax = 0;
  } else {
    data.staffSubsidizedMax = data.yearOneCosts - data.pell - data.perkins;
    data.staffSubsidizedMax = calculateMaxRange(year, data);
  }

  data.staffSubsidized = enforceRange(
    data.staffSubsidized,
    0,
    data.staffSubsidizedMax
  );

  return data;
}

/**
 * calculate the max range by program year
 * @param { number } year - the student's program year
 * @param { object } data - our data object
 * @returns { number } range enforced number
 */
function calculateMaxRange(year, data){
  var range = data.staffSubsidizedMax;
  if (year === 1){
    range = data.subsidizedCapYearOne
  }
  if (year === 2){
    range = data.subsidizedCapYearTwo - data.staffSubsidized
  }
  if (year === 3){
    range = data.subsidizedCapYearThree - data.staffSubsidized
  }
  return enforceRange(
    data.staffSubsidizedMax,
    0,
    range
  );

}

module.exports = subStafford;
