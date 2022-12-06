import enforceRange from '../utils/enforce-range.js';

var unsubMax = {};

/**
 * calculate grad plus loans
 * @param { object } data - our data object
 * @returns { object } the data object with perkins data added
 */
function unsubDirect(data) {
  var costMax =
    data.costOfAttendance - data.pell - data.perkins - data.directSubsidized;
  // unsubsidized loan max for independent students
  unsubMax.independent(data);
  // unsubsidized loan max for dependent students
  unsubMax.dependent(data);

  if (data.depend === 'dependent') {
    data.directUnsubsidizedMax = data.directUnsubsidizedDepMax;
  } else if (data.undergrad === true) {
    data.directUnsubsidizedMax = data.directUnsubsidizedIndepMax;
  } else {
    // graduate student max
    data.directUnsubsidizedMax = data.unsubsidizedCapGrad;
  }

  data.directUnsubsidizedMax = enforceRange(
    data.directUnsubsidizedMax,
    0,
    false
  );

  // error handling
  if (data.directUnsubsidized > costMax) {
    data.errors.unsubsidizedOverCost =
      'Direct unsubsidized loans exceed cost of attendance.';
  }
  if (data.directUnsubsidized > data.directUnsubsidizedMax) {
    data.errors.unsubsidizedOverCap =
      'Direct unsubsidized loans exceed federal limit of ' +
      data.directUnsubsidizedMax +
      '.';
  }

  data.directUnsubsidized = enforceRange(
    data.directUnsubsidized,
    0,
    data.directUnsubsidizedMax
  );

  return data;
}

/**
 * calculate unsubsidized max for independent students
 * @param { object } data - our data object
 * @returns { object } the data object with unsub max data added
 */
unsubMax.independent = function (data) {
  data.directUnsubsidizedIndepMax =
    data.costOfAttendance - data.pell - data.perkins - data.directSubsidized;

  if (data.undergrad === false) {
    if (data.directUnsubsidizedIndepMax > data.unsubsidizedCapGrad) {
      data.directUnsubsidizedIndepMax = data.unsubsidizedCapGrad;
    }
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapGrad - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax =
        data.unsubsidizedCapGrad - data.directSubsidized;
    }
  } else if (data.program === 'aa' || data.yearInCollege === 1) {
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearOne - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne;
    }
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearOne - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax =
        data.unsubsidizedCapIndepYearOne - data.directSubsidized;
    }
  } else if (data.yearInCollege === 2) {
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearTwo - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo;
    }
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearTwo - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax =
        data.unsubsidizedCapIndepYearTwo - data.directSubsidized;
    }
  } else if (data.yearInCollege === 3) {
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearThree - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree;
    }
    if (
      data.directUnsubsidizedIndepMax >
      data.unsubsidizedCapIndepYearThree - data.directSubsidized
    ) {
      data.directUnsubsidizedIndepMax =
        data.unsubsidizedCapIndepYearThree - data.directSubsidized;
    }
  }

  if (data.directUnsubsidizedIndepMax < 0) {
    data.directUnsubsidizedIndepMax = 0;
  }

  return data;
};

/**
 * calculate unsubsidized max for dependent students
 * @param { object } data - our data object
 * @returns { object } the data object with unsub max data     added
 */
unsubMax.dependent = function (data) {
  data.directUnsubsidizedDepMax =
    data.costOfAttendance - data.pell - data.perkins - data.directSubsidized;

  if (data.directUnsubsidizedDepMax < 0) {
    data.directUnsubsidizedDepMax = 0;
    return data;
  }

  if (data.undergrad === false) {
    if (
      data.directUnsubsidizedDepMax >
      data.unsubsidizedCapGrad - data.directSubsidized
    ) {
      data.directUnsubsidizedDepMax =
        data.unsubsidizedCapGrad - data.directSubsidized;
    }
  } else if (data.program === 'aa' || data.yearInCollege === 1) {
    if (
      data.directUnsubsidizedDepMax >
      data.unsubsidizedCapYearOne - data.directSubsidized
    ) {
      data.directUnsubsidizedDepMax =
        data.unsubsidizedCapYearOne - data.directSubsidized;
    }
  } else if (data.yearInCollege === 2) {
    if (
      data.directUnsubsidizedDepMax >
      data.unsubsidizedCapYearTwo - data.directSubsidized
    ) {
      data.directUnsubsidizedDepMax =
        data.unsubsidizedCapYearTwo - data.directSubsidized;
    }
  } else if (data.yearInCollege === 3) {
    if (
      data.directUnsubsidizedDepMax >
      data.unsubsidizedCapYearThree - data.directSubsidized
    ) {
      data.directUnsubsidizedDepMax =
        data.unsubsidizedCapYearThree - data.directSubsidized;
    }
  }

  return data;
};

export default unsubDirect;
