var subDirect = require( '../src/loans/direct-subsidized' );
var enforceRange = require('../src/utils/enforce-range');
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'sets subsidized Stafford loan values', function() {

  it( 'sets the subsidized max to 0 for grad students', function() {
    data.undergrad = false;
    subDirect( data );
    expect( data.directSubsidizedMax ).to.equal( 0 );
  });

  it( 'sets the subsidized max for undergrad students in year 2', function() {
    data.undergrad = true;
    data.yearInCollege = 2;
    var expectedMax = data.yearOneCosts - data.perkins - data.pell;
    subDirect( data );
    expect( data.directSubsidizedMax ).to.equal( expectedMax );
  });

  it( 'sets the subsidized max for undergrad students in year 3', function() {
    data.undergrad = true;
    data.yearInCollege = 3;
    var expectedMax = data.yearOneCosts - data.perkins - data.pell;
    subDirect( data );
    expect( data.directSubsidizedMax ).to.equal( expectedMax );
  });

  it( 'calculates the aa program max the same as year 1', function() {
    data.program = 'aa';
    data.yearInCollege = 3;
    var aaCalc = subDirect( data );
    data.program = '';
    data.yearInCollege = 1;
    var yearOneCalc = subDirect( data );
    expect( aaCalc.directSubsidizedMax ).to.equal( yearOneCalc.directSubsidizedMax );
  });

});
