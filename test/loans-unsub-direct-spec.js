var unsubDirect = require( '../src/loans/direct-unsubsidized' );
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
    data.costOfAttendance = 50000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 2000;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 18500 );
  });


  it( 'sets max at zero when the costs are less than the cap', function() {
    data.costOfAttendance = 15000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 15000;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 0 );
  });

  it( 'sets the year two max', function() {
    data.undergrad = true;
    data.yearInCollege = 2;
    data.costOfAttendance = 15000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 0;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 10500 );
  });

  it( 'sets the year two max minus stafford subsidized', function() {
    data.undergrad = true;
    data.yearInCollege = 2;
    data.costOfAttendance = 15000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 1000;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 9500 );
  });

  it( 'sets the year three max', function() {
    data.undergrad = true;
    data.yearInCollege = 3;
    data.costOfAttendance = 20000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 0;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 12500 );
  });

  it( 'sets the year three max minus stafford subsidized', function() {
    data.undergrad = true;
    data.yearInCollege = 3;
    data.costOfAttendance = 20000;
    data.pell = 2000;
    data.perkins = 2000;
    data.directSubsidized = 1000;
    unsubDirect( data );
    expect( data.directUnsubsidizedIndepMax ).to.equal( 11500 );
  });


  it( 'sets the the dependent max to 0 if the value supplied is less than 0', function() {
    data.undergrad = true;
    data.costOfAttendance = 20000;
    data.pell = 15000;
    data.perkins = 5000;
    data.directSubsidized = 1000;
    unsubDirect( data );
    expect( data.directUnsubsidizedDepMax ).to.equal( 0 );
  });

  it( 'sets the the value for dependent when data.depend equal dependent', function() {
    data.depend = 'dependent';
    data.undergrad = true;
    data.costOfAttendance = 20000;
    data.pell = 15000;
    data.perkins = 5000;
    data.directSubsidized = 1000;
    unsubDirect( data );
    expect( data.directUnsubsidizedDepMax ).to.equal( 0 );
  });

});
 
