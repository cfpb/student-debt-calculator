var scholarship = require( '../src/scholarship' );
var data = require( '../src/default-values' );

var chai = require('chai');
var expect = chai.expect;


describe( 'set scholarship and grant values', function() {
  it( 'correctly sets the pell max when year one costs are less than the maximum pell grant', function() {
    data.undergrad = true;
    data.costOfAttendance = 5000;
    scholarship( data );
    expect( data.pellMax ).to.equal( 5000 );
  });

  it( 'correctly sets the pell max when year one costs are more than the maximum pell grant', function() {
    data.undergrad = true;
    data.costOfAttendance = 10000;
    scholarship( data );
    expect( data.pellMax ).to.equal( data.pellCap );
  });

  it( 'correctly sets the pell max for non undergrad programs', function() {
    data.undergrad = false;
    data.costOfAttendance = 10000;
    scholarship( data );
    expect( data.pellMax ).to.equal( 0 );
  });

  it( 'calculates the total grants', function() {
    data.undergrad = true;
    data.costOfAttendance = 10000;
    data.pell = 4400;
    data.scholarships = 2000;
    scholarship( data );
    expect( data.grantsTotal ).to.equal( 6400 );
  });

  it( 'calculates the first year net cost', function() {
    data.costOfAttendance = 10000;
    data.pell = 4400;
    data.scholarships = 2000;
    scholarship( data );
    expect( data.firstYearNetCost ).to.equal( 3600 );
  });

  it( 'calculates total contributions', function() {
    data.undergrad = true;
    data.savings = 10000;
    data.family = 2400;
    data.parentPlus = 2000;
    data.state529plan = 2000;
    data.workstudy = 2000;
    scholarship( data );
    expect( data.savingsTotal ).to.equal( 18400 );
  });

  it( 'calculates total grants and savings', function() {
    expect( data.grantsSavingsTotal ).to.equal( 24800 );
  });
});
