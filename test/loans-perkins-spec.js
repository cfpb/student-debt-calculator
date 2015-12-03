var perkins = require( '../src/loans/perkins' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'sets Perkins loan values', function() {

  it( 'sets the perkins max when costs minus pell are less than the perkins cap', function() {
    data.yearOneCosts = 10000;
    data.pell = 6000;
    perkins( data );
    expect( data.perkinsMax ).to.equal( 4000 );
  });

  it( 'sets the perkins to the capped value when costs minus pell are greater than the cap', function() {
    data.yearOneCosts = 10000;
    data.pell = 4000;
    perkins( data );
    expect( data.perkinsMax ).to.equal( 5500 );
  });

  it( 'sets the perkins to the graduate capped value', function() {
    data.undergrad = false;
    data.yearOneCosts = 20000;
    data.pell = 4000;
    perkins( data );
    expect( data.perkinsMax ).to.equal( 5500 );
  });

  it( 'enforces range for the total perkins value', function() {
    data.undergrad = true;
    data.yearOneCosts = 10000;
    data.perkins = 5000;
    data.pell = 4000;
    expect( data.perkins ).to.equal( 5000 );
  });


});
