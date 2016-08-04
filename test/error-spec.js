var debtCalc = require('../src/index.js');

var chai = require('chai');
var expect = chai.expect;

describe( 'error reporting', function() {
  var financials = {
    tuitionFees: 1,
    roomBoard: 0,
    books: 0,
    transportation: 0,
    otherExpenses: 0,
    scholarships: 0,
    pell: 0,
    savings: 0,
    family: 0,
    perkins: 0,
    directSubsidized: 0,
    directUnsubsidized: 0,
    institutionalLoan: 0,
    gradPlus: 0,
    privateLoan: 0,
    undergrad: true,
    // specify grant & loan data for testing use
    institutionalLoanRate: 0.079,
    privateLoanRate: 0.079,
    pell: 2,
    pellCap: 5730,
    perkinsRate: 0.05,
    perkinsUnderCap: 5500,
    perkinsGradCap: 8000,
    militaryAssistanceCap: 4500,
    subsidizedRate: 0.0466,
    unsubsidizedRateUndergrad: 0.0466,
    unsubsidizedRateGrad: 0.0621,
    DLOriginationFee: 1.01073,
    gradPlusRate: 0.0721,
    parentPlusRate: 0.0721,
    plusOriginationFee: 1.04292,
    homeEquityLoanRate: 0.079,
    privateLoanMulti: [],
    programLength: 4
  };

  it( '...reports an error when Pell grants exceed costs.', function() {
    expect( debtCalc( financials ).errors ).property( 'pellOverCosts' );
  });

  it( '...reports an error when Pell grants exceed max.', function() {
    financials.pell = 9999;
    expect( debtCalc( financials ).errors ).property( 'pellOverCap' );
  });

  it( '...reports an error when Perkins loan exceeds costs.', function() {
    financials.pell = 0;
    financials.perkins = 2;
    expect( debtCalc( financials ).errors ).property( 'perkinsOverCost' );
  });

  it( '...reports an error when Perkins loan exceeds federal limit.', function() {
    financials.tuitionFees = 99999;
    financials.perkins = 99999;
    expect( debtCalc( financials ).errors ).property( 'perkinsOverCap' );
  });

  it( '...reports an error when military tuition assistance exceeds federal limit.', function() {
    financials.perkins = 0;
    financials.militaryTuitionAssistance = 99999;
    expect( debtCalc( financials ).errors ).property( 'mtaOverCap' );
  });

  it( '...reports an error when subsidized loans exceeds costs.', function() {
    financials.militaryTuitionAssistance = 0;
    financials.tuitionFees = 0;
    financials.directSubsidized = 99999;
    expect( debtCalc( financials ).errors ).property( 'subsidizedOverCost' );
  });

  it( '...reports an error when subsidized loans exceeds federal limit.', function() {
    financials.yearInCollege = 1;
    expect( debtCalc( financials ).errors ).property( 'subsidizedOverCap' );
  });

  it( '...reports an error when unsubsidized loans exceeds costs.', function() {
    financials.directSubsidized = 0;
    financials.directUnsubsidized = 99999;
    expect( debtCalc( financials ).errors ).property( 'unsubsidizedOverCost' );
  });

  it( '...reports an error when unsubsidized loans exceeds federal limit.', function() {
    expect( debtCalc( financials ).errors ).property( 'unsubsidizedOverCost' );
  });

  it( '...reports an error when gradPlus loans exceeds costs.', function() {
    financials.militaryTuitionAssistance = 0;
    financials.directUnsubsidized = 0;
    financials.tuitionFees = 1;
    financials.undergrad = false;
    financials.gradPlus = 99999;
    expect( debtCalc( financials ).errors ).property( 'gradPlusOverCost' );
  });



});
