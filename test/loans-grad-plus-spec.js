import gradPlus from '../src/loans/grad-plus.js';
import defaultValues from '../src/default-values.js';

describe('sets Grad PLUS loan values', () => {
  it('sets the grad plus values for undergrad students', () => {
    defaultValues.undergrad = true;
    gradPlus(defaultValues);
    expect(defaultValues.gradPlus).toEqual(0);
  });

  it('sets the grad plus values for grad students', () => {
    defaultValues.undergrad = false;
    defaultValues.costOfAttendance = 10000;
    defaultValues.perkins = 1000;
    defaultValues.directUnsubsidized = 1000;
    defaultValues.gradPlus = 11000;
    gradPlus(defaultValues);
    expect(defaultValues.gradPlus).toEqual(8000);
  });
});
