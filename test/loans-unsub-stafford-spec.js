var unSubStafford = require( '../src/loans/unsubsidized-stafford' );
var enforceRange = require('../src/utils/enforce-range');
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;


describe( 'calculates the unsubsidized max for independent loans', function() {

});

describe( 'sets unsubsidized Stafford loan values', function() {

  // data.unsubsidizedCapGrad === 20500

  it( 'sets the max at cap when the costs are greater than the cap minus the subsidized stafford', function() {
    data.undergrad = false;
    data.yearOneCosts = 50000;
    data.pell = 2000;
    data.perkins = 2000;
    data.staffSubsidized = 2000;
    unSubStafford( data );
    expect( data.staffUnsubsidizedIndepMax ).to.equal( 18500 );
  });


  it( 'sets max at zero when the costs are less than the cap', function() {
    data.undergrad = false;
    data.yearOneCosts = 15000;
    data.pell = 2000;
    data.perkins = 2000;
    data.staffSubsidized = 15000;
    unSubStafford( data );
    expect( data.staffUnsubsidizedIndepMax ).to.equal( 0 );
  });
});
 
