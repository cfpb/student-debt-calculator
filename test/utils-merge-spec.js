var rates = require( '../src/rates' );
var merge = require( '../src/utils/merge' );
var defaults = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

var financials = {
  tuitionFees: 10000,
  roomBoard: 2000
};

var data = merge( defaults, financials );

describe( 'merge objects', function() {
  it( 'correctly merges two objects', function() {
    expect( data.tuitionFees ).to.equal( 10000 );
    expect( data.roomBoard ).to.equal( 2000 );
    expect( data.perkinsUnderCap ).to.equal( 5500 );
  });
});
