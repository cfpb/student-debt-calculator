var enforceRange = require( '../src/utils/enforce-range' );

var chai = require('chai');
var expect = chai.expect;
var range;

describe( 'enforce a range', function() {
  it( 'sets the max', function() {
    range = enforceRange(6, 1, 5);
    expect( range ).to.equal( 5 );
    range = enforceRange(3, 1, 5);
    expect( range ).to.equal( 3 );
  });

  it( 'sets the min', function() {
    range = enforceRange(1, 2, 5);
    expect( range ).to.equal( 2 );
  });

  it( 'returns false when expected', function() {
    range = enforceRange(3, 1, false);
    expect( range ).to.equal( false );
    range = enforceRange(3, 5, 1);
    expect( range ).to.equal( false );
    range = enforceRange('pizza', 5, 1);
    expect( range ).to.equal( false );
  });
});
