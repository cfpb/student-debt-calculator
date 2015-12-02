'use strict';

var merge = require( './utils/merge' );
var enforceRange = require( './utils/enforce-range.js' );
var defaults = require( './default-values' );
var rates = require( './rates' );
var scholarship = require( './scholarship' );
var calcDebt = require( './calc-debt.js' );

/**
 * calculate student debt
 * @param { object } financials - an object containing unique loan values
 * @returns { object } an with the overall cost of the loan
 */
function studentDebtCalculator( financials ) {

  var data = {};

  // merge financials into defaults to create data
  data = merge( defaults, financials );

  // set rate values
  rates.inState( data );
  rates.unsubsidized( data );

  // Start calculations
  // Cost of First Year (schoolData.yearOneCosts)
  data.yearOneCosts = data.tuitionFees +
                      data.roomBoard +
                      data.books +
                      data.otherExpenses +
                      data.transportation;

  // calculate scholarships and grants
  scholarship( data );


  // FEDERAL LOANS //
  // Perkins Loan

  data.perkinsMax = data.yearOneCosts - data.pell;
  data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsUnderCap );
  if ( data.undergrad !== true ) {
    data.perkinsMax = enforceRange( data.perkinsMax, 0, data.perkinsGradCap );
  }
  data.perkins = enforceRange( data.perkins, 0, data.perkinsMax );

  // Subsidized Stafford Loan
  if ( data.undergrad === false ) {
    data.staffSubsidizedMax = 0;
  } else if ( data.program === 'aa' || data.yearInCollege === 1 ) {
    data.staffSubsidizedMax = data.yearOneCosts - data.pell - data.perkins;
    data.staffSubsidizedMax = enforceRange(
      data.staffSubsidizedMax, 0, data.subsidizedCapYearOne );
  } else if ( data.yearInCollege === 2 ) {
    data.staffSubsidizedMax = data.yearOneCosts - data.perkins - data.pell;
    data.staffSubsidizedMax = enforceRange(
      data.staffSubsidizedMax,
      0,
      data.subsidizedCapYearTwo - data.staffSubsidized
    );
  } else if ( data.yearInCollege === 3 ) {
    data.staffSubsidizedMax = data.yearOneCosts - data.perkins - data.pell;
    data.staffSubsidizedMax = enforceRange(
      data.staffSubsidizedMax,
      0,
      data.subsidizedCapYearThree - data.staffSubsidized
    );
  }

  data.staffSubsidized = enforceRange(
    data.staffSubsidized,
    0,
    data.staffSubsidizedMax
  );

  // unsubsidized loan max for independent students
  if ( data.undergrad === false ) {
    data.staffUnsubsidizedIndepMax = data.yearOneCosts -
                                    data.pell -
                                    data.perkins -
                                    data.staffSubsidized;
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad -
                                       data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedIndepMax < 0 ) {
      data.staffUnsubsidizedIndepMax = 0;
    }
  } else if ( data.program === 'aa' || data.yearInCollege === 1 ) {
    data.staffUnsubsidizedIndepMax = data.yearOneCosts -
                                    data.pell -
                                    data.perkins -
                                    data.staffSubsidized;
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearOne -
       data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearOne -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne -
      data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedIndepMax < 0 ) {
      data.staffUnsubsidizedIndepMax = 0;
    }
  } else if ( data.yearInCollege === 2 ) {
    data.staffUnsubsidizedIndepMax = data.yearOneCosts -
                                    data.pell -
                                    data.perkins -
                                    data.staffSubsidized;
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo -
      data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedIndepMax < 0 ) {
      data.staffUnsubsidizedIndepMax = 0;
    }
  } else if ( data.yearInCollege === 3 ) {
    data.staffUnsubsidizedIndepMax = data.yearOneCosts -
                                     data.pell -
                                     data.perkins -
                                     data.staffSubsidized;
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree;
    }
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree -
      data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedIndepMax < 0 ) {
      data.staffUnsubsidizedIndepMax = 0;
    }
  }
  // unsubsidized loan max for dependent students
  if ( data.undergrad === false ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts -
                                   data.pell -
                                   data.perkins -
                                   data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapGrad -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapGrad -
                                     data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  } else if ( data.program === 'aa' || data.yearInCollege === 1 ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts -
                                   data.pell -
                                   data.perkins -
                                   data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearOne -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearOne -
                                     data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  } else if ( data.yearInCollege === 2 ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts -
                                   data.pell -
                                   data.perkins -
                                   data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearTwo -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearTwo -
                                     data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  } else if ( data.yearInCollege === 3 ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts -
                                   data.pell -
                                   data.perkins -
                                   data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearThree -
      data.staffSubsidized ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearThree -
                                     data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  }

  // Unsubsidized Stafford Loans
  if ( data.depend === 'dependent' ) {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedDepMax;
  } else {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedIndepMax;
  }
  data.staffUnsubsidizedMax = enforceRange(
    data.staffUnsubsidizedMax, 0, false );
  data.staffUnsubsidized = enforceRange(
    data.staffUnsubsidized, 0, data.staffUnsubsidizedMax );

  // Gradplus
  if ( data.undergrad === true ) {
    data.gradplusMax = 0;
  } else {
    data.gradplusMax = data.firstYearNetCost -
                      data.perkins -
                      data.staffSubsidized -
                      data.staffUnsubsidized;
  }
  data.gradplusMax = enforceRange( data.gradplusMax, 0, false );
  data.gradplus = enforceRange( data.gradplus, 0, data.gradplusMax );

  // Federal Total Loan
  data.federalTotal = data.perkins +
                      data.staffSubsidized +
                      data.staffUnsubsidized +
                      data.gradplus;

  // PRIVATE LOANS //
  // Institution Loans
  data.institutionalLoanMax = data.firstYearNetCost -
                              data.perkins -
                              data.staffSubsidized -
                              data.staffUnsubsidized -
                              data.parentplus -
                              data.gradplus -
                              data.homeEquity;

  // maximum cannot be less than 0
  data.institutionalLoanMax = enforceRange(
    data.institutionalLoanMax, 0, false );

  // enforce institutional loan limits
  data.institutionalLoan = enforceRange(
    data.institutionalLoan,
    0,
    data.institutionalLoanMax
  );

  // Other Loans
  data.privateLoanMax = data.firstYearNetCost -
                        data.perkins -
                        data.staffSubsidized -
                        data.staffUnsubsidized -
                        data.institutionalLoan -
                        data.gradplus;

  // maximum cannot be less than 0
  data.privateLoanMax = enforceRange( data.privateLoanMax, 0, false );

  // enforce "other private" loan limits
  data.privateLoan = enforceRange( data.privateLoan, 0, data.privateLoanMax );

  // Private Loan Total
  data.privateTotal = data.privateLoan + data.institutionalLoan;

  // gap
  data.gap = data.firstYearNetCost -
             data.perkins -
             data.staffSubsidized -
             data.staffUnsubsidized -
             data.workstudy -
             data.savings -
             data.family -
             data.state529plan -
             data.privateLoan -
             data.institutionalLoan -
             data.parentplus -
             data.homeEquity;

  // ===Loan Calculation===
  // Borrowing Total
  data.borrowingtotal = data.privateTotal + data.federalTotal;

  // Out of Pocket Total
  data.totalOutOfPocket = data.grantsTotal + data.savingsTotal;

  // Money for College Total
  data.moneyforcollege = data.totalOutOfPocket + data.borrowingtotal;

  // remainingcost -- "Left to Pay"
  data.remainingcost = data.firstYearNetCost - data.totalOutOfPocket;
  if ( data.remainingcost < 0 ) {
    data.remainingcost = 0;
  }

  // loanDebtYearOne -- "Estimated Total Borrowing"
  data.loanDebtYearOne = data.perkins +
                        data.staffSubsidized +
                        data.staffUnsubsidized +
                        data.gradplus +
                        data.privateLoan +
                        data.institutionalLoan +
                        data.parentplus +
                        data.homeEquity;

  // Borrowing over cost of attendance
  data.overborrowing = 0;
  if ( data.yearOneCosts < data.outofpockettotal +
    data.borrowingtotal ) {
    data.overborrowing = data.borrowingtotal +
                         data.outofpockettotal -
                         data.yearOneCosts;
  }

  // Estimated Debt Calculation
  // Perkins debt at graduation
  data.perkinsTotal = data.perkins * data.programLength;

  // Direct Subsidized Loan with 1% Origination Fee
  data.staffSubsidizedWithFee = data.staffSubsidized *
                                data.DLOriginationFee;

  // Subsidized debt at graduation
  data.staffSubsidizedTotal = data.staffSubsidizedWithFee *
                              data.programLength;

  // Direct Unsubsidized Loan with 1% Origination Fee
  data.staffUnsubsidizedWithFee = data.staffUnsubsidized *
                                  data.DLOriginationFee;

  // Unsubsidized debt at graduation
  data.staffUnsubsidizedTotal = calcDebt(
    data.staffUnsubsidizedWithFee,
    data.unsubsidizedRate,
    data.programLength,
    data.deferPeriod
  );

  // Grad Plus with origination
  data.gradplusWithFee = data.gradplus * data.plusOriginationFee;

  // Grad Plus debt at graduation
  data.gradplusTotal = calcDebt(
    data.gradplusWithFee,
    data.gradplusRate,
    data.programLength,
    data.deferPeriod
  );

  // Parent Plus Loans with origination fees
  data.parentplusWithFee = data.parentplus * data.plusOriginationFee;

  // Parent Plus Loans at graduation
  data.parentplusTotal = data.parentplusWithFee * data.programLength;

  // Private Loan debt at graduation
  data.privateLoanTotal = calcDebt( data.privateLoan,
    data.privateLoanRate, data.programLength, data.deferPeriod );

  // Institutional Loan debt at graduation
  data.institutionalLoanTotal = calcDebt( data.institutionalLoan,
    data.institutionalLoanRate, data.programLength, data.deferPeriod );

  // Home Equity Loans at graduation
  data.homeEquityTotal = data.homeEquity * data.homeEquityLoanRate / 12 *
  ( ( data.programLength * ( data.programLength + 1 ) / 2 * 12 ) );

  // Debt after 1 yr
  data.loanDebtYearOne = data.perkins +
                        data.staffSubsidized +
                        data.staffUnsubsidized +
                        data.gradplus +
                        data.privateLoan +
                        data.institutionalLoan +
                        data.parentplus +
                        data.homeEquity;

  // Total debt at graduation
  data.totalDebt = data.perkinsTotal +
                  data.staffSubsidizedTotal +
                  data.staffUnsubsidizedTotal +
                  data.gradplusTotal +
                  data.parentplusTotal +
                  data.privateLoanTotal +
                  data.institutionalLoanTotal +
                  data.homeEquityTotal;

  // loanMonthly - "Monthly Payments"
  data.loanMonthly = data.perkinsTotal * ( data.perkinsRate / 12 ) / ( 1 - Math.pow( 1 + data.perkinsRate / 12, -data.repaymentTerm * 12 ) ) +
  data.staffSubsidizedTotal * ( data.subsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.subsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.staffUnsubsidizedTotal * ( data.unsubsidizedRate / 12 ) / ( 1 - Math.pow( 1 + data.unsubsidizedRate / 12, -data.repaymentTerm * 12 ) ) +
  data.gradplusTotal * ( data.gradplusRate / 12 ) / ( 1 - Math.pow( 1 + data.gradplusRate / 12, -data.repaymentTerm * 12 ) ) +
  data.privateLoanTotal * ( data.privateLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.privateLoanRate / 12, -data.repaymentTerm * 12 ) ) +
  data.institutionalLoanTotal * ( data.institutionalLoanRate / 12 ) / ( 1 - Math.pow( 1 + data.institutionalLoanRate / 12, -data.repaymentTerm * 12 ) );

  // loanMonthlyparent
  data.loanMonthlyparent = data.parentplus * ( data.parentplusrate / 12 ) / Math.pow( 1 - ( 1 + data.parentplusrate / 12 ), -data.repaymentTerm * 12 ) + data.homeEquity * ( data.homeEquityLoanRate / 12 ) / Math.pow( 1 - ( 1 + data.homeEquityLoanRate / 12 ), -data.repaymentTerm * 12 );

  // loanLifetime
  data.loanLifetime = data.loanMonthly * data.repaymentTerm * 12;

  return data;

}
module.exports = studentDebtCalculator;
