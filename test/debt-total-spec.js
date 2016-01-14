var debtTotal = require( '../src/debt-total' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'calculates debt totals', function() {

  it( 'accomodates for overborrowing', function() {
    data.yearOneCosts = 20000;
    data.grantsSavingsTotal = 10000;
    data.borrowingTotal = 12000;
    debtTotal( data );
    expect( data.overborrowing ).to.equal( 2000 );
  });

  it ( 'handles multiple private loans', function() {
    data.privateLoanMulti = [
        { 'amount': 2000, 'rate': .079, 'deferPeriod': 6 },
        { 'amount': 3000, 'rate': .061, 'deferPeriod': 6 },
        { 'amount': 4000, 'rate': .041, 'deferPeriod': 6 }
      ];
    debtTotal( data );
    expect( data.privateLoanDebt ).to.equal( 9896 + 14196 + 17968 );
    });
});
