var cost = require( '../src/cost' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'calculates costs', function() {

  it( 'calculates the remaining cost', function() {
    data.costOfAttendance = 13750;
    data.grantsSavingsTotal = 2000;
    cost( data );
    expect( data.remainingCost ).to.equal( 11750 );
  });


});
