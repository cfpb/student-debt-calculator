var gradPlus = require( '../src/loans/grad-plus' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'sets Grad PLUS loan values', function() {

  it( 'sets the grad plus values for undergrad students', function() {
    data.undergrad = true;
    gradPlus( data );
    expect( data.gradPlus ).to.equal( 0 );
  });

  it( 'sets the grad plus values for grad students', function() {
    data.undergrad = false;
    data.costOfAttendance = 10000;
    data.perkins = 1000;
    data.directUnsubsidized = 1000;
    data.gradPlus = 11000;
    gradPlus( data );
    expect( data.gradPlus ).to.equal( 8000 );
  });



});
