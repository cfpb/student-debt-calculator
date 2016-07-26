var payment = require( '../src/payment' );
var data = require( '../src/default-values' );
var calcDebt = require( '../src/calc-debt.js' );

var chai = require('chai');
var expect = chai.expect;

describe( 'payment calculator', function() {

  it( 'calculates the cost of loans over the lifetime of the loan', function() {
    data.programLength = 2;
    data.perkinsDebt = 2000;
    data.directSubsidizedDebt = 0;
    data.directUnsubsidizedDebt = 0;
    data.gradPlusDebt = 0;
    data.privateLoanTotal = 0;
    data.institutionalLoanDebt = 0;
    data.perkinsLoanRate = .05;
    data.privateLoanMulti = [];
    data.privateLoan = 0;
    data.privateLoanDebt = 0;

    payment( data );

    expect( Math.round( data.loanLifetime ) ).to.equal( 2546 );
    expect( Math.round( data.tenYear.loanLifetime ) ).to.equal( 2546 );
    expect( Math.round( data.twentyFiveYear.loanLifetime ) ).to.equal( 3508 );

    data.directSubsidizedDebt = 4000;
    data.subsidizedRate = 0.0466;
    payment( data );
    expect( Math.round( data.loanLifetime ) ).to.equal( 7557 );
    expect( Math.round( data.tenYear.loanLifetime ) ).to.equal( 7557 );
    expect( Math.round( data.twentyFiveYear.loanLifetime ) ).to.equal( 10287 );

    data.directUnsubsidizedWithFee = 1500;
    data.unsubsidizedRate = 0.0466;
    data.deferPeriod = 6;
    data.directUnsubsidizedDebt = calcDebt(
      data.directUnsubsidizedWithFee,
      data.unsubsidizedRate,
      data.programLength,
      data.deferPeriod
    );
    payment( data );
    expect( Math.round( data.loanLifetime ) ).to.equal( 11666 );
    expect( Math.round( data.tenYear.loanLifetime ) ).to.equal( 11666 );
    expect( Math.round( data.twentyFiveYear.loanLifetime ) ).to.equal( 15845 );

    data.institutionalLoan = 1500;
    data.institutionalLoanRate = 0.079;
    data.institutionalLoanDebt = calcDebt(
      data.institutionalLoan,
      data.institutionalLoanRate,
      data.programLength,
      data.deferPeriod
    );   
    payment( data );
    expect( Math.round( data.loanLifetime ) ).to.equal( 16702 );
    expect( Math.round( data.tenYear.loanLifetime ) ).to.equal( 16702 );
    expect( Math.round( data.twentyFiveYear.loanLifetime ) ).to.equal( 23820 );

    data.privateLoanMulti = [ { amount: 5000, fees: 0, rate: 0.079, deferPeriod: 0, totalDebt: 11580 } ];
    payment( data );
    expect( Math.round( data.loanLifetime ) ).to.equal( 33489 );
    expect( Math.round( data.tenYear.loanLifetime ) ).to.equal( 33489 );
    expect( Math.round( data.twentyFiveYear.loanLifetime ) ).to.equal( 50404 );

    data.privateLoanMulti = [
      { amount: 1000, rate: 0, deferPeriod: 0, totalDebt: 2000 }
    ];
    payment( data );
    expect( Math.round( data.loanMonthly ) ).to.equal( 156 );

  });


});
