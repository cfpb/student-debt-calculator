import { ratesInState, ratesUnsubsidized } from '../src/rates.js';
import merge from '../src/utils/merge.js';
import defaultValues from '../src/default-values.js';

const financials = {
  tuitionFees: 10000,
  roomBoard: 2000,
  books: 1000,
  transportation: 500,
  otherExpenses: 250,
  scholarships: 0,
  pell: 0,
  savings: 0,
  family: 0,
  perkins: 0,
  staffSubsidized: 0,
  staffUnsubsidized: 0,
  institutionalLoan: 0,
  privateLoan: 13750,
  undergrad: true,
  // specify grant & loan data for testing use
  institutionalLoanRateDefault: 0.079,
  privateLoanRateDefault: 0.079,
  pellCap: 5730,
  perkinsRate: 0.05,
  perkinsUnderCap: 5500,
  perkinsGradCap: 8000,
  subsidizedRate: 0.0466,
  unsubsidizedRateUndergrad: 0.0466,
  unsubsidizedRateGrad: 0.0621,
  DLOriginationFee: 1.01073,
  gradPlusRate: 0.0721,
  parentPlusRate: 0.0721,
  plusOriginationFee: 1.04292,
  homeEquityLoanRate: 0.079,
};

var data = merge(defaultValues, financials);

describe('set in state loan rates', function () {
  it('returns undefined when no in state tuition is specified', function () {
    ratesInState(data);
    expect(data.TFInState).toEqual(undefined);
  });

  it('returns a value for TFInState when in state tuition is specified', function () {
    data.tuitionUndergradInState = 10000;
    ratesInState(data);
    expect(data.TFInState).toEqual(10000);
  });

  it('returns a value for TFInState when in state tuition is specified', function () {
    data.tuitionUndergradInState = 10000;
    ratesInState(data);
    expect(data.TFInState).toEqual(10000);
  });

  it('correctly sets TFInState for grad programs not under public control', function () {
    data.program = 'grad';
    data.tuitiongradins = 60000;
    data.tuitionUndergradInState = 10000;
    ratesInState(data);
    expect(data.TFInState).toEqual(10000);
  });

  it('correctly sets TFInState for grad programs under public control', function () {
    data.control = 'public';
    data.program = 'grad';
    data.tuitiongradins = 10000;
    ratesInState(data);
    expect(data.TFInState).toEqual(10000);
  });
});

describe('set unsubsidized loan rates', function () {
  it('correctly sets unsubsidized loan rates for undergrad programs', function () {
    data.undergrad = true;
    ratesUnsubsidized(data);
    expect(data.unsubsidizedRate).toEqual(0.0466);
  });

  it('correctly sets unsubsidized loan rates for grad programs', function () {
    data.undergrad = false;
    ratesUnsubsidized(data);
    expect(data.unsubsidizedRate).toEqual(0.0621);
  });
});

// unsubsidizedRateUndergrad: 0.0466,
// unsubsidizedRateGrad: 0.0621,
