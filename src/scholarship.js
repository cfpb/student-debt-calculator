import enforceRange from './utils/enforce-range.js';

/**
 * Calculate scholarships and grants.
 * @param { object } data - the data object
 * @returns { object } the data object with scholarship and grant totals
 */
function scholarship(data) {
  // Pell Grants
  data.pellMax = 0;
  if (data.undergrad === true) {
    data.pellMax = data.pellCap;
  }
  // enforce limits on Pell grants
  if (data.pell > data.costOfAttendance) {
    data.errors.pellOverCosts =
      'The Pell grant exceeds the cost of attendance.';
  }
  data.pellMax = enforceRange(data.pellMax, 0, data.costOfAttendance);

  if (data.pell > data.pellMax) {
    data.errors.pellOverCap =
      'The Pell grant exceeds the federal limit of ' + data.pellCap + '.';
  }
  data.pell = enforceRange(data.pell, 0, data.pellMax);

  // enoforce limits on Military Tuition Assistance
  if (data.militaryTuitionAssistance > data.militaryAssistanceCap) {
    data.errors.mtaOverCap =
      'Military Tuition Assistance exceeds the federal limit of ' +
      data.militaryAssistanceCap +
      '.';
  }
  data.militaryTuitionAssistance = enforceRange(
    data.militaryTuitionAssistance,
    0,
    data.militaryAssistanceCap
  );

  // Total Grants
  data.grantsTotal =
    data.pell +
    data.scholarships +
    data.GIBill +
    data.militaryTuitionAssistance;

  // First Year Net Cost
  data.firstYearNetCost = data.costOfAttendance - data.grantsTotal;

  // Total Contributions
  data.savingsTotal =
    data.savings +
    data.family +
    data.state529plan +
    data.parentPlus +
    data.workstudy;

  // Total grants and savings
  data.grantsSavingsTotal = data.grantsTotal + data.savingsTotal;

  return data;
}

export default scholarship;
