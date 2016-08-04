var debtTotal = require( '../src/debt-total' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;

describe( 'calculates debt totals', function() {

  it( 'accomodates for overborrowing', function() {
    data.grantsSavingsTotal = 10000;
    data.borrowingTotal = 12000;
    debtTotal( data );
    console.log( data.borrowingTotal, data.grantsSavingsTotal, data.costOfAttendance )
    expect( data.overborrowing ).to.equal( 8250 );
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

  it ( 'handles multiple private loans with fees', function() {
    data.privateLoanMulti = [
        { 'amount': 2000, 'rate': .079, 'deferPeriod': 6, 'fees': .02 },
        { 'amount': 3000, 'rate': .061, 'deferPeriod': 6, 'fees': .01 },
        { 'amount': 4000, 'rate': .041, 'deferPeriod': 6, 'fees': .03 }
      ];
    debtTotal( data );
    expect( data.privateLoanDebt ).to.equal( 10093.92 + 14337.96 + 18507.04 );
    });
});
