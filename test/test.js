var debtCalc = require('../index.js');

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
    // specify grant & loan data for testing use
    institutionalLoanRateDefault: 0.079,
    privateLoanRateDefault: 0.079,
    pellCap: 5730
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

  it( '...calculates Stafford subsidized loans.', function() {
    financials.perkins = 0;
    expect( debtCalc( financials ).totalDebt ).to.equal( 68035 );
  });

});