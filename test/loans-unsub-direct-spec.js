import unsubDirect from '../src/loans/direct-unsubsidized.js';
import defaultValues from '../src/default-values.js';

describe('calculates the unsubsidized max for independent loans', function () {});

describe('sets unsubsidized Stafford loan values', function () {
  // defaultValues.unsubsidizedCapGrad === 20500

  it('sets the max at cap when the costs are greater than the cap minus the subsidized stafford', function () {
    defaultValues.undergrad = false;
    defaultValues.costOfAttendance = 50000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 2000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(18500);
  });

  it('sets max at zero when the costs are less than the cap', function () {
    defaultValues.costOfAttendance = 15000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 15000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(0);
  });

  it('sets the year two max', function () {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 2;
    defaultValues.costOfAttendance = 15000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 0;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(10500);
  });

  it('sets the year two max minus stafford subsidized', function () {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 2;
    defaultValues.costOfAttendance = 15000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 1000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(9500);
  });

  it('sets the year three max', function () {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 3;
    defaultValues.costOfAttendance = 20000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 0;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(12500);
  });

  it('sets the year three max minus stafford subsidized', function () {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 3;
    defaultValues.costOfAttendance = 20000;
    defaultValues.pell = 2000;
    defaultValues.perkins = 2000;
    defaultValues.directSubsidized = 1000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedIndepMax).toEqual(11500);
  });

  it('sets the the dependent max to 0 if the value supplied is less than 0', function () {
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 20000;
    defaultValues.pell = 15000;
    defaultValues.perkins = 5000;
    defaultValues.directSubsidized = 1000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedDepMax).toEqual(0);
  });

  it('sets the the value for dependent when defaultValues.depend equal dependent', function () {
    defaultValues.depend = 'dependent';
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 20000;
    defaultValues.pell = 15000;
    defaultValues.perkins = 5000;
    defaultValues.directSubsidized = 1000;
    unsubDirect(defaultValues);
    expect(defaultValues.directUnsubsidizedDepMax).toEqual(0);
  });
});
