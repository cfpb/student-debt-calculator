import scholarship from '../src/scholarship.js';
import defaultValues from '../src/default-values.js';

describe('set scholarship and grant values', function () {
  it('correctly sets the pell max when year one costs are less than the maximum pell grant', function () {
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 5000;
    scholarship(defaultValues);
    expect(defaultValues.pellMax).toEqual(5000);
  });

  it('correctly sets the pell max when year one costs are more than the maximum pell grant', function () {
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 10000;
    scholarship(defaultValues);
    expect(defaultValues.pellMax).toEqual(defaultValues.pellCap);
  });

  it('correctly sets the pell max for non undergrad programs', function () {
    defaultValues.undergrad = false;
    defaultValues.costOfAttendance = 10000;
    scholarship(defaultValues);
    expect(defaultValues.pellMax).toEqual(0);
  });

  it('calculates the total grants', function () {
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 10000;
    defaultValues.pell = 4400;
    defaultValues.scholarships = 2000;
    scholarship(defaultValues);
    expect(defaultValues.grantsTotal).toEqual(6400);
  });

  it('calculates the first year net cost', function () {
    defaultValues.costOfAttendance = 10000;
    defaultValues.pell = 4400;
    defaultValues.scholarships = 2000;
    scholarship(defaultValues);
    expect(defaultValues.firstYearNetCost).toEqual(3600);
  });

  it('calculates total contributions', function () {
    defaultValues.undergrad = true;
    defaultValues.savings = 10000;
    defaultValues.family = 2400;
    defaultValues.parentPlus = 2000;
    defaultValues.state529plan = 2000;
    defaultValues.workstudy = 2000;
    scholarship(defaultValues);
    expect(defaultValues.savingsTotal).toEqual(18400);
  });

  it('calculates total grants and savings', function () {
    expect(defaultValues.grantsSavingsTotal).toEqual(24800);
  });
});
