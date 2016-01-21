var gradPlus = require( '../src/loans/grad-plus' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'sets Grad PLUS loan values', function() {

  it( 'sets the grad plus values for undergrad students', function() {
    data.undergrad = true;
    gradPlus( data );
    expect( data.gradplusMax ).to.equal( 0 );
    expect( data.gradplus ).to.equal( 0 );
  });

  it( 'sets the grad plus values for grad students', function() {
    data.undergrad = false;
    data.firstYearNetCost = 10000;
    data.perkins = 1000;
    data.directSubsidized = 1000;
    data.directUnsubsidized = 0;
    data.gradplus = 9000;
    gradPlus( data );
    expect( data.gradplusMax ).to.equal( 8000 );
    expect( data.gradplus ).to.equal( 8000 );
  });



});
