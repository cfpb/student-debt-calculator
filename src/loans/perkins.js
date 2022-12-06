import enforceRange from '../utils/enforce-range.js';

/**
 * calculate perkins loans
 * @param { object } data - our data object
 * @returns { object } the data object with perkins data added
 */
function perkins(data) {
  var costMax = data.costOfAttendance - data.pell,
    perkinsCap = data.perkinsUnderCap;

  if (data.perkins > costMax) {
    data.errors.perkinsOverCost = 'Perkins loan exceeded cost of attendance.';
    data.perkins = enforceRange(data.perkins, 0, costMax);
  }

  if (data.undergrad !== true) {
    perkinsCap = data.perkinsGradCap;
  }

  if (data.perkins > perkinsCap) {
    data.errors.perkinsOverCap =
      'Perkins loan exceeded federal limit of ' + data.perkinsCap + '.';
    data.perkins = enforceRange(data.perkins, 0, perkinsCap);
  }

  return data;
}

export default perkins;
