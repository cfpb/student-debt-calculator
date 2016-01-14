var loans = require( '../src/loans/' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'student loan functions', function() {

  it ( 'totals multiple private loans', function() {
    data.privateLoanMulti = [
        { 'amount': 2000, 'rate': .079, 'deferPeriod': 6 },
        { 'amount': 3000, 'rate': .061, 'deferPeriod': 6 },
        { 'amount': 4000, 'rate': .041, 'deferPeriod': 6 }
      ];
    loans( data );
    expect( data.privateTotal ).to.equal( 9000 );
  });
});
