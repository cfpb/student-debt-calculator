import enforceRange from '../src/utils/enforce-range.js';

let range;

describe('enforce a range', function () {
  it('sets the max', function () {
    range = enforceRange(6, 1, 5);
    expect(range).toEqual(5);
    range = enforceRange(3, 1, 5);
    expect(range).toEqual(3);
  });

  it('sets the min', function () {
    range = enforceRange(1, 2, 5);
    expect(range).toEqual(2);
  });

  it('returns false when expected', function () {
    range = enforceRange(3, 1, false);
    expect(range).toEqual(false);
    range = enforceRange(3, 5, 1);
    expect(range).toEqual(false);
    range = enforceRange('pizza', 5, 1);
    expect(range).toEqual(false);
  });
});
