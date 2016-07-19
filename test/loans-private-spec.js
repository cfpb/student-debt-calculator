var loans = require( '../src/loans/index.js' );
var data = require( '../src/default-values' );
var payment = require( '../src/payment' );

var chai = require('chai');
var expect = chai.expect;

describe( 'private loan functions', function() {

  it ( 'totals multiple private loans', function() {
    data.privateLoanMulti = [
        { 'amount': 2000, 'rate': .079, 'deferPeriod': 6 },
        { 'amount': 3000, 'rate': .061, 'deferPeriod': 6 },
        { 'amount': 4000, 'rate': .041, 'deferPeriod': 6 }
      ];
    loans( data );
    expect( data.privateLoanTotal ).to.equal( 9000 );
  } );

});
