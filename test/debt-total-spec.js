var debtTotal = require( '../src/debt-total' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'calculates debt totals', function() {

  it( 'accomodates for overborrowing', function() {
    data.yearOneCosts = 20000;
    data.outofpockettotal = 10000;
    data.borrowingtotal = 12000;
    debtTotal( data );
    expect( data.overborrowing ).to.equal( 2000 );
  });


});
