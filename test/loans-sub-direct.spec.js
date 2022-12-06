import subDirect from '../src/loans/direct-subsidized.js';
import defaultValues from '../src/default-values.js';

describe('sets subsidized Stafford loan values', () => {
  it('sets the subsidized max to 0 for grad students', () => {
    defaultValues.undergrad = false;
    subDirect(defaultValues);
    expect(defaultValues.directSubsidizedMax).toEqual(0);
  });

  it('sets the subsidized max for undergrad students in year 2', () => {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 2;
    var expectedMax =
      defaultValues.subsidizedCapYearTwo - defaultValues.directSubsidized;
    subDirect(defaultValues);
    expect(defaultValues.directSubsidizedMax).toEqual(expectedMax);
  });

  it('sets the subsidized max for undergrad students in year 3', () => {
    defaultValues.undergrad = true;
    defaultValues.yearInCollege = 3;
    var expectedMax =
      defaultValues.subsidizedCapYearThree - defaultValues.directSubsidized;
    subDirect(defaultValues);
    expect(defaultValues.directSubsidizedMax).toEqual(expectedMax);
  });

  it('calculates the aa program max the same as year 1', () => {
    defaultValues.program = 'aa';
    defaultValues.yearInCollege = 3;
    var aaCalc = subDirect(defaultValues);
    defaultValues.program = '';
    defaultValues.yearInCollege = 1;
    var yearOneCalc = subDirect(defaultValues);
    expect(aaCalc.directSubsidizedMax).toEqual(yearOneCalc.directSubsidizedMax);
  });
});
