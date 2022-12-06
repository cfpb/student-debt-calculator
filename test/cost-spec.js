import cost from '../src/cost.js';
import defaultValues from '../src/default-values.js';

describe('calculates costs', () => {
  it('calculates the remaining cost', () => {
    defaultValues.costOfAttendance = 13750;
    defaultValues.grantsSavingsTotal = 2000;
    cost(defaultValues);
    expect(defaultValues.remainingCost).toEqual(11750);
  });
});
