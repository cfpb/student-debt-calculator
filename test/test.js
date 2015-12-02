var debtCalc = require('../src/index.js');

var chai = require('chai');
var expect = chai.expect;

describe( 'debtCalc...', function() {
  var financials = {
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
    gradplusrate: 0.0721,
    parentplusrate: 0.0721,
    plusOriginationFee: 1.04292,
    homeEquityLoanRate: 0.079,
  };

  it( '...calculates private loans.', function() {
    expect( debtCalc( financials ).totalDebt ).to.equal( 68035 );
  });

  it( '...calculates institutional loans.', function() {
    financials.privateLoan = 0;
    financials.institutionalLoan = 13750;
    expect( debtCalc( financials ).totalDebt ).to.equal( 68035 );
  });

  it( '...calculates Perkins loans.', function() {
    financials.institutionalLoan = 0;
    financials.perkins = 5500;
    expect( debtCalc( financials ).totalDebt ).to.equal( 22000 );
  });

  it( '...enforces Perkins loan limit.', function() {
    financials.institutionalLoan = 0;
    financials.perkins = 999999;
    expect( debtCalc( financials ).totalDebt ).to.equal( 22000 );
  });

  it( '...calculates Stafford subsidized loans.', function() {
    financials.perkins = 0;
    financials.staffSubsidized = 3500;
    expect( Math.floor( debtCalc( financials ).totalDebt ) ).to.equal( 14150 );
  });

  it( '...enforces Stafford subsidized loan limit.', function() {
    financials.perkins = 0;
    financials.staffSubsidized = 999999;
    expect( Math.floor( debtCalc( financials ).totalDebt ) ).to.equal( 14150 );
  });

  it( '...calculates Stafford unsubsidized loans.', function() {
    financials.staffSubsidized = 0;
    financials.staffUnsubsidized = 9500;
    expect( Math.floor( debtCalc( financials ).totalDebt ) ).to.equal( 43777 );
  });

  it( '...enforces Stafford unsubsidized loan limit.', function() {
    financials.staffSubsidized = 0;
    financials.staffUnsubsidized = 999999;
    expect( Math.floor( debtCalc( financials ).totalDebt ) ).to.equal( 43777 );
  });

  it( '...properly calculates multiple loans.', function() {
    financials.perkins = 1000;
    financials.staffSubsidized = 2000;
    financials.staffUnsubsidized = 3000;
    financials.institutionalLoan = 1500;
    financials.privateLoan = 2500;
    expect( Math.floor( debtCalc( financials ).totalDebt ) ).to.equal( 45702 );
  });

});
