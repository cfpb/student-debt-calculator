var loans = require( '../src/loans/' );
var tuitionRepayCalc = require( '../src/loans/tuition-repayment' );
var testData = {
  'tuitionRepay': 10000,
  'tuitionRepayTerm': 12,
  'tuitionRepayRate': .0379,
  'programLength': 4
};

var chai = require('chai');
var expect = chai.expect;

describe( 'tuitionRepayCalc ', function() {

  it ( 'calculates the subsidized portion of a tuition repayment plan', function() {
    var subsidized = tuitionRepayCalc.getSubsidizedPortion( testData );
    expect( Math.round( subsidized ) ).to.equal( 10000 );
  });

  it ( 'calculates the unsubsidized portion of a tuition repayment plan', function() {
    var unsubsized = tuitionRepayCalc.getUnsubsidizedPortion( testData );
    expect( Math.round( unsubsized ) ).to.equal( 0 );
  });

  it ( 'calculates tuition repayment monthly payment', function() {
    var debtAtGrad = tuitionRepayCalc.calculateMonthlyPayment( testData );
    expect( Math.round( debtAtGrad ) ).to.equal( 833 );
  });

  it ( 'calculates tuition repayment debt when unsubsized term is 0',
    function() {
      var debtAtGrad = tuitionRepayCalc.calculateDebtAtGrad( testData );
      expect( Math.round( debtAtGrad ) ).to.equal( 0 );
    }
  );

  it ( 'calculates tuition repayment debt with an unsubsized term',
    function() {
      testData.tuitionRepayTerm = 48;
      testData.programLength = 2;
      var debtAtGrad = tuitionRepayCalc.calculateDebtAtGrad( testData );
      expect( Math.round( debtAtGrad ) ).to.equal( 5100 );
    }
  );

});
