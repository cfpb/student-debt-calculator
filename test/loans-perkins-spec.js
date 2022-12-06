import perkins from '../src/loans/perkins.js';
import defaultValues from '../src/default-values.js';

describe('sets Perkins loan values', () => {
  it('sets the perkins max when costs minus pell are less than the perkins cap', () => {
    defaultValues.costOfAttendance = 10000;
    defaultValues.perkins = 5000;
    defaultValues.pell = 6000;
    perkins(defaultValues);
    expect(defaultValues.perkins).toEqual(4000);
  });

  it('sets the perkins to the capped value when costs minus pell are greater than the cap', () => {
    defaultValues.costOfAttendance = 10000;
    defaultValues.undergrad = true;
    defaultValues.perkins = 9000;
    defaultValues.perkinsUnderCap = 5500;
    defaultValues.pell = 4000;
    perkins(defaultValues);
    console.log(defaultValues.perkinsUnderCap);
    expect(defaultValues.perkins).toEqual(5500);
  });

  it('sets the perkins to the graduate capped value', () => {
    defaultValues.undergrad = false;
    defaultValues.perkins = 999000;
    defaultValues.perkinsGradCap = 9000;
    defaultValues.costOfAttendance = 20000;
    defaultValues.pell = 0;
    perkins(defaultValues);
    expect(defaultValues.perkins).toEqual(9000);
  });

  it('enforces range for the total perkins value', () => {
    defaultValues.undergrad = true;
    defaultValues.costOfAttendance = 10000;
    defaultValues.perkins = 5000;
    defaultValues.pell = 4000;
    expect(defaultValues.perkins).toEqual(5000);
  });
});
