import merge from '../src/utils/merge.js';
import defaultValues from '../src/default-values.js';

const financials = {
  tuitionFees: 10000,
  roomBoard: 2000,
};

const data = merge(defaultValues, financials);

describe('merge objects', function () {
  it('correctly merges two objects', function () {
    expect(data.tuitionFees).toEqual(10000);
    expect(data.roomBoard).toEqual(2000);
    expect(data.perkinsUnderCap).toEqual(5500);
  });
});
