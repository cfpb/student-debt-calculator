'use strict';

var enforceRange = require( '../utils/enforce-range' );

var unSubMax = {};

/**
 * calculate grad plus loans
 * @param { object } data - our data object
 * @returns { object } the data object with perkins data added
 */
function unSubStafford( data ) {
  // unsubsidized loan max for independent students
  unSubMax.independent( data );
  // unsubsidized loan max for dependent students
  unSubMax.dependent( data );

  if ( data.depend === 'dependent' ) {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedDepMax;
  } else {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedIndepMax;
  }

  data.staffUnsubsidizedMax = enforceRange(
    data.staffUnsubsidizedMax, 0, false );
  data.staffUnsubsidized = enforceRange(
    data.staffUnsubsidized, 0, data.staffUnsubsidizedMax );

  return data;
}

/**
* calculate unsubsidized max for independent students
* @param { object } data - our data object
* @returns { object } the data object with unsub max data added
*/
unSubMax.independent = function( data ) {
  data.staffUnsubsidizedIndepMax = data.yearOneCosts -
                                   data.pell -
                                   data.perkins -
                                   data.staffSubsidized;

  if ( data.undergrad === false ) {
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad -
                                       data.staffSubsidized;
    }
  } else if ( data.program === 'aa' || data.yearInCollege === 1 ) {
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearOne -
       data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearOne -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne -
      data.staffSubsidized;
    }
  } else if ( data.yearInCollege === 2 ) {
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized;
    }
  } else if ( data.yearInCollege === 3 ) {
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized;
    }
  }

  if ( data.staffUnsubsidizedIndepMax < 0 ) {
    data.staffUnsubsidizedIndepMax = 0;
  }

  return data;
};

/**
* calculate unsubsidized max for dependent students
* @param { object } data - our data object
* @returns { object } the data object with unsub max data     added
*/
unSubMax.dependent = function( data ) {

  data.staffUnsubsidizedDepMax = data.yearOneCosts -
                                 data.pell -
                                 data.perkins -
                                 data.staffSubsidized;

  if ( data.staffUnsubsidizedDepMax < 0 ) {
    data.staffUnsubsidizedDepMax = 0;
    return data;
  }

  if ( data.undergrad === false ) {
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapGrad -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapGrad -
                                     data.staffSubsidized;
    }
  } else if ( data.program === 'aa' || data.yearInCollege === 1 ) {
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearOne -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearOne -
                                     data.staffSubsidized;
    }
  } else if ( data.yearInCollege === 2 ) {
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearTwo -
                                     data.staffSubsidized;
    }
  } else if ( data.yearInCollege === 3 ) {
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearThree -
                                     data.staffSubsidized;
    }
  }

  return data;
};

module.exports = unSubStafford;
