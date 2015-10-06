var debtCalc = require('../index.js');

var chai = require('chai');
var expect = chai.expect;

describe( 'debtCalc...', function() {
  var financials = {
    tuitionFees: 10000,
    roomBoard: 0,
    books: 0,
    otherExpenses: 0,
    transportation: 0,
    scholarships: 0,
    pell: 0,
    savings: 0,
    family: 0,
    privateLoan: 10000
  }

  it( '...probably breaks', function() {
    expect( debtCalc( financials ) ).to.equal( '$5' );
  });

});