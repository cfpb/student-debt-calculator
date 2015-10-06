/**
 * @param { object } data 
 * @returns {string}     
 */

 /*
  incomingData:
    tuitionFees
  }

 */

'use strict';

function studentDebtCalculator( financials ) {
  var extend = require('./node_modules/extend/index.js'),
      data = {},
      defaults = {
        // Values expected from 'financials'
        tuitionFees: 0,
        roomBoard: 0,
        books: 0,
        otherExpenses: 0,
        transportation: 0,
        scholarships: 0,
        pell: 0,
        perkins: 0,
        savings: 0,
        family: 0,
        staffSubsidized: 0,
        staffUnsubsidized: 0,
        privateLoan: 0,
        institutionalLoan: 0,
        parentplus: 0,
        gradplus: 0,
        state529plan: 0,
        workstudy: 0,
        homeEquity: 0,
        programLength: 4,
        // Loan rate defaults
        institutionalLoanRateDefault: 0.079,
        privateLoanRateDefault: 0.079,
        // Pell grant settings
        pellMax: 0,
        pellCap: 5730,
        // Military tuition assistance settings
        tuitionAssistCap: 4500,
        tuitionAssist: 0,
        tuitionAssistMax: 0,
        // GI Bill settings
        TFInState: 0,
        GIBillInStateTuition: 0,
        GIBillTF: 0,
        GIBillLA: 0,
        BIBillCh1606: 362,
        tier: 100,
        // veteran status
        vet: false,
        // School is in-state for student
        inState: false,
        // Program is undergrad
        undergrad: true,
        // placeholders
        yearOneCosts: 0,
        yearInCollege: 1,
        // Stafford loans settings
        staffSubsidizedMax: 0,
        staffUnsubsidizedIndepMax: 0,
        staffUnsubsidizedDepMax: 0,
        staffUnsubsidizedWithFee: 0,
        // ???
        yrben: 0,
        subsidizedCapYearOne: 3500,
        subsidizedCapYearTwo: 4500,
        subsidizedCapYearThree: 5500, 
        unsubsidizedCapYearOne: 5500,
        unsubsidizedCapYearTwo: 6500,
        unsubsidizedCapYearThree: 7500,
        unsubsidizedCapIndepYearOne: 9500,
        unsubsidizedCapIndepYearTwo: 10500,
        unsubsidizedCapIndepYearThree: 12500, 
        unsubsidizedCapGrad: 20500,
        perkinsRate: 0.05,
        subsidizedRate: 0.0466,
        unsubsidizedRate: 0,
        unsubsidizedRateUndergrad: 0.0466,
        unsubsidizedRateGrad: 0.0621, 
        DLOriginationFee: 1.01073,
        gradplusrate: 0.0721, 
        parentplusrate: 0.0721,
        plusOriginationFee: 1.04292,
        homeEquityLoanRate: 0.079,
        deferPeriod: 6,
        loanMonthly: 0
      };

  // merge financials into defaults to create data
  data = extend( defaults, financials );

  // tf in-state rate prepopulate (schoolData.tfinsprep)
  if ( ( data.control === "public" ) && ( data.program === "grad" ) ) {
    data.TFInState = data.tuitiongradins;
  }
  else {
    data.TFInState = data.tuitionUndergradInState;
  }

  // Set unsubsidized rate (there is a difference between grad and undergrad direct loan rates)
  if (data.undergrad === true) {
    data.unsubsidizedRate = data.unsubsidizedRateUndergrad;
  }
  else {
    data.unsubsidizedRate = data.unsubsidizedRateGrad;
  }

  // Start calculations
  // Cost of First Year (schoolData.yearOneCosts)
  data.yearOneCosts = data.tuitionFees + data.roomBoard + data.books + data.otherExpenses + data.transportation;

  // SCHOLARSHIPS & GRANTS //
  // Pell Grants
  data.pellMax = 0;
  if ( data.undergrad == true ) {
    data.pellMax = data.pellCap;
  }
  if ( data.pellMax > data.yearOneCosts ) {
    data.pellMax = data.yearOneCosts;
  }
  if ( data.pellMax < 0 ) {
    data.pellMax = 0;
  }
  if (data.pell > data.pellMax){
    data.pell = data.pellMax;
  }

  // Military Tuition Assistance
  if ( data.tuitionAssistCap < data.tuitionFees ) {
    data.tuitionAssistMax = data.tuitionAssistCap;
  }
  else {
    data.tuitionAssistMax = data.tuition;
  }
  if (data.tuitionAssist > data.tuitionAssistMax) {
    data.tuitionAssist = data.tuitionAssistMax;
  }

  // GI Bill
  // Set schoolData.TFInState
  if ( data.inState == false ) {
    data.TFInState = data.GIBillInStateTuition; 
  }
  else {
    data.TFInState = data.tuition;
  }

  // Tuition & Fees benefits:
  if (data.vet == false) {
    data.GIBillTF = 0; 
  }
  else {
     
    // Calculate veteran benefits:    
    if ( ( data.control == "Public" ) && ( data.inState == true ) ) {
      data.GIBillTF = ( data.tuitionFees - data.scholarships - data.tuitionAssist ) * data.tier;
      if ( data.GIBillTF < 0 ) {
        data.GIBillTF = 0;
      }
    }
    else if ( ( data.control == "Public" ) && ( data.inState == false ) ) {
      data.GIBillTF = ( data.TFInState + (data.yrben * 2) - data.scholarships - data.tuitionAssist ) * data.tier;
      if ( data.GIBillTF < 0 ) {
        data.GIBillTF = 0;
      }
      if ( data.GIBillTF > ( ( data.tuitionFees - data.scholarships - data.tuitionAssist) * data.tier ) ) {
        data.GIBillTF = data.tuitionFees * data.tier;
      }
    }
    else { // School is not public
      data.GIBillTF = ( data.tfcap + (data.yrben * 2) - data.scholarships - data.tuitionAssist ) * data.tier;
      if ( data.GIBillTF < 0 ) {
        data.GIBillTF = 0;
      }
      if ( data.GIBillTF > ( ( data.tuitionFees - data.scholarships - data.tuitionAssist) * data.tier ) ) {
        data.GIBillTF = data.tuitionFees * data.tier;
      }
    }
  }

  // GI living allowance benefits:
  if (data.vet === false) {
    data.GIBillLA = 0;
  }
  else { 
    if (data.serving == "ad") { 
      data.GIBillLA = 0;
    }
    else if ( ( data.tier == 0 ) && ( data.serving == "ng" ) ) {
      data.GIBillLA = data.GIBillch1606 * 9;
    }
    else {
      if (data.online == "Yes" ) {
        data.GIBillLA = ( ( ( data.avgbah / 2 * data.tier ) + data.kicker ) * data.rop) * 9;
      }
      else {
        data.GIBillLA = data.bah * data.tier * 9 * data.rop;
      }
    }
  }


  // GI Bill Book Stipend
  if (data.vet === false) {
    data.GIBillBS = 0;
  }
  else {
    data.GIBillBS = data.bscap * data.tier * data.rop;
  }

  // Total GI Bill
  data.GIBill = data.GIBillTF + data.GIBillLA + data.GIBillBS;

  // Total Grants
  data.grantsTotal = data.pell + data.scholarships + data.GIBill + data.tuitionAssist;

  // First Year Net Cost
  data.firstYearNetCost = data.yearOneCosts - data.grantsTotal;

  // Total Contributions
  data.savingsTotal = data.savings + data.family + data.state529plan + data.workstudy;
  
  // grants and savings
  data.totalgrantsandsavings = data.savingsTotal + data.grantsTotal;

  // FEDERAL LOANS //
  // Perkins Loan

  data.perkins_max = data.yearOneCosts - data.pell;
  if ( data.perkins_max < 0 ) {
    data.perkins_max = 0;
  }
  if ( data.undergrad == true ) {
    if ( data.perkins_max > data.perkinscapunder ) {
      data.perkins_max = data.perkinscapunder;
    }
  }
  else {
    if ( data.perkins_max > data.perkinscapgrad ) {
      data.perkins_max = data.perkinscapgrad;
    }   
  }
  if (data.perkins > data.perkins_max) {
    data.perkins = data.perkins_max;
  }
    
  // Subsidized Stafford Loan
  if (data.undergrad == false) {
    data.staffSubsidizedMax = 0;
  }
  else {
    if ((data.program == "aa") || (data.yearInCollege == 1)) {
      data.staffSubsidizedMax = data.yearOneCosts - data.pell - data.perkins;
      if ( data.staffSubsidizedMax > data.subsidizedCapYearOne ) {
        data.staffSubsidizedMax = data.subsidizedCapYearOne;
      }
      if ( data.staffSubsidizedMax < 0 ) {
        data.staffSubsidizedMax = 0;
      }
    }
    else if (data.yearInCollege == 2) {
      data.staffSubsidizedMax = data.yearOneCosts - data.perkins - data.pell;
      if ( data.staffSubsidizedMax > ( data.subsidizedCapYearTwo - data.staffSubsidized ) ) {
        data.staffSubsidizedMax = data.subsidizedCapYearTwo - data.staffSubsidized ;
      }
      if ( data.staffSubsidizedMax < 0 ) {
        data.staffSubsidizedMax = 0;
      }
    }
    else if (data.yearInCollege == 3) {
      data.staffSubsidizedMax = data.yearOneCosts - data.perkins - data.pell;
      if ( data.staffSubsidizedMax > ( data.subsidizedCapYearThree - data.staffSubsidized ) ) {
        data.staffSubsidizedMax = data.subsidizedCapYearThree - data.staffSubsidized ;
      }
      if ( data.staffSubsidizedMax < 0 ) {
        data.staffSubsidizedMax = 0;
      }
    }
  }
  if (data.staffSubsidizedMax < 0){
    data.staffSubsidized = 0;
  }
  if (data.staffSubsidized > data.staffSubsidizedMax){
    data.staffSubsidized = data.staffSubsidizedMax;
  }

  //unsubsidized loan max for independent students
  if ( data.undergrad == false) { 
    data.staffUnsubsidizedIndepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
    if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad ) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad;
    }
    if (data.staffUnsubsidizedIndepMax > data.unsubsidizedCapGrad - data.staffSubsidized) {
      data.staffUnsubsidizedIndepMax = data.unsubsidizedCapGrad - data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedIndepMax < 0 ) {
      data.staffUnsubsidizedIndepMax = 0;
    }
  } 
  else {
    if ( ( data.program == "aa" ) || ( data.yearInCollege == 1 ) ) { 
      data.staffUnsubsidizedIndepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
      if ( data.staffUnsubsidizedIndepMax > ( data.unsubsidizedCapIndepYearOne - data.staffSubsidized ) ) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne;
      }
      if (data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearOne - data.staffSubsidized) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearOne - data.staffSubsidized;
      }
      if ( data.staffUnsubsidizedIndepMax < 0 ) {
        data.staffUnsubsidizedIndepMax = 0;
      }
    }
    else if ( data.yearInCollege == 2) { 
      data.staffUnsubsidizedIndepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
      if ( data.staffUnsubsidizedIndepMax > ( data.unsubsidizedCapIndepYearTwo - data.staffSubsidized ) ) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo;
      }
      if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearTwo - data.staffSubsidized ) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearTwo - data.staffSubsidized;
      }
      if ( data.staffUnsubsidizedIndepMax < 0 ) {
        data.staffUnsubsidizedIndepMax = 0;
      }
    }
    else if ( data.yearInCollege == 3) { 
      data.staffUnsubsidizedIndepMax = data.yearOneCosts - data.pell - data.perkins- data.staffSubsidized;
      if ( data.staffUnsubsidizedIndepMax > ( data.unsubsidizedCapIndepYearThree - data.staffSubsidized ) ) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree;
      }
      if ( data.staffUnsubsidizedIndepMax > data.unsubsidizedCapIndepYearThree - data.staffSubsidized ) {
        data.staffUnsubsidizedIndepMax = data.unsubsidizedCapIndepYearThree - data.staffSubsidized;
      }
      if ( data.staffUnsubsidizedIndepMax < 0 ) {
        data.staffUnsubsidizedIndepMax = 0;
      }
    }
  }
  // unsubsidized loan max for dependent students
  if ( data.undergrad == false ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapGrad - data.staffSubsidized) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapGrad - data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  } 
  else if ( data.program == "aa" || data.yearInCollege == 1 ) {
    data.staffUnsubsidizedDepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearOne - data.staffSubsidized) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearOne - data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  }
  else if ( data.yearInCollege == 2) { 
    data.staffUnsubsidizedDepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > data.unsubsidizedCapYearTwo - data.staffSubsidized) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearTwo - data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  } 
  else if ( data.yearInCollege == 3 ) { 
    data.staffUnsubsidizedDepMax = data.yearOneCosts - data.pell - data.perkins - data.staffSubsidized;
    if ( data.staffUnsubsidizedDepMax > (data.unsubsidizedCapYearThree - data.staffSubsidized) ) {
      data.staffUnsubsidizedDepMax = data.unsubsidizedCapYearThree - data.staffSubsidized;
    }
    if ( data.staffUnsubsidizedDepMax < 0 ) {
      data.staffUnsubsidizedDepMax = 0;
    }
  }

  // Unsubsidized Stafford Loans
  if ( data.depend == "dependent" ) {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedDepMax;
  }
  else {
    data.staffUnsubsidizedMax = data.staffUnsubsidizedIndepMax;
  }
  if (data.staffUnsubsidizedMax < 0) {
    data.staffUnsubsidizedMax = 0;
  }
  if (data.staffUnsubsidized > data.staffUnsubsidizedMax) {
    data.staffUnsubsidized = data.staffUnsubsidizedMax;
  }

  // Gradplus
  if (data.undergrad == true) {
    data.gradplusMax = 0;
  }
  else {
    data.gradplusMax = data.firstYearNetCost - data.perkins - data.staffSubsidized - data.staffUnsubsidized;
  }
  if ( data.gradplusMax < 0 ) {
    data.gradplusMax = 0;
  }
  if (data.gradplus > data.gradplusMax) {
    data.gradplus = data.gradplusMax;
  }

  // Federal Total Loan
  data.federalTotal = data.perkins + data.staffSubsidized + data.staffUnsubsidized + data.gradplus;

  // PRIVATE LOANS //
  // Institution Loans
  data.institutionalLoanMax = data.firstYearNetCost - data.perkins - data.staffSubsidized - data.staffUnsubsidized - data.parentplus - data.gradplus - data.homeEquity;
  if ( data.institutionalLoanMax < 0 ) {
    data.institutionalLoanMax = 0;
  }
  if (data.institutionalLoan > data.institutionalLoanMax) {
    data.institutionalLoan = data.institutionalLoanMax;
  }

  // Institutional Loan Rate
  if ( data.institutionalLoanRate === undefined || data.institutionalLoanRate === 0) {
    data.institutionalLoanRate = data.institutionalLoanRateDefault;
  }
  if ( data.institutionalLoanRate > .2 ) {
    data.institutionalLoanRate = .2;
  }
  if ( data.institutionalLoanRate < .01 ) {
    data.institutionalLoanRate = .01;
  }

  data.privateLoanMax = data.firstYearNetCost - data.perkins - data.staffSubsidized - data.staffUnsubsidized - data.institutionalLoan - data.gradplus;
  if ( data.privateLoanMax < 0 ) {
    data.privateLoanMax = 0;
  }
  if (data.privateLoan > data.privateLoanMax) {
    data.privateLoan = data.privateLoanMax;
  }

  // Private Loan Rate
  if ( data.privateLoanRate === undefined || data.privateLoanRate === 0 ) {
    data.privateLoanRate = data.privateLoanRateDefault;
  }
  if ( data.privateLoanRate > .2 ) {
    data.privateLoanRate = .2;
  }
  if ( data.privateLoanRate < .01 ) {
    data.privateLoanRate = .01;
  }

  // Private Loan Total
  data.privateTotal = data.privateLoan + data.institutionalLoan;

  // gap
  data.gap = data.firstYearNetCost - data.perkins - data.staffSubsidized - data.staffUnsubsidized - data.workstudy - data.savings - data.family - data.state529plan - data.privateLoan - data.institutionalLoan - data.parentplus - data.homeEquity;

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
    data.loanDebtYearOne = data.perkins + data.staffSubsidized + data.staffUnsubsidized + data.gradplus + data.privateLoan + data.institutionalLoan + data.parentplus + data.homeEquity;

  // Borrowing over cost of attendance
  data.overborrowing = 0;
  if ( data.yearOneCosts < ( data.outofpockettotal + data.borrowingtotal ) ) {
    data.overborrowing = data.borrowingtotal + data.outofpockettotal - data.yearOneCosts;
  }

  // Estimated Debt Calculation
  // Perkins debt at graduation
  data.perkinsTotal = data.perkins * data.programLength;

  // Direct Subsidized Loan with 1% Origination Fee
  data.staffSubsidizedWithFee = data.staffSubsidized * data.DLOriginationFee;

  // Subsidized debt at graduation
  data.staffSubsidizedTotal = data.staffSubsidizedWithFee * data.programLength;

  // Direct Unsubsidized Loan with 1% Origination Fee
  data.staffUnsubsidizedWithFee = data.staffUnsubsidized * data.DLOriginationFee;

  // Unsubsidized debt at graduation
  data.staffUnsubsidizedTotal = (data.staffUnsubsidizedWithFee  * data.unsubsidizedRate / 12 * ((data.programLength * (data.programLength + 1) / 2 * 12 + data.programLength * data.deferPeriod)) + (data.staffUnsubsidizedWithFee  * data.programLength));

  // Grad Plus with origination
  data.gradplusWithFee = data.gradplus * data.plusOriginationFee;

  // Grad Plus debt at graduation
  data.gradplusTotal = (data.gradplusWithFee * data.gradplusrate  / 12 * ((data.programLength * (data.programLength + 1) / 2 * 12 + data.programLength * data.deferPeriod)) + (data.gradplusWithFee * data.programLength));
  
  // Parent Plus Loans with origination fees
  data.parentplusWithFee = data.parentplus * data.plusOriginationFee;

  // Parent Plus Loans at graduation
  data.parentplusTotal = data.parentplusWithFee * data.programLength;

  // Private Loan debt at graduation
  data.privateLoanTotal = (data.privateLoan * data.privateLoanRate / 12  * ((data.programLength * (data.programLength + 1) / 2 * 12 + data.programLength * data.deferPeriod)) + (data.privateLoan * data.programLength));

  // Institutional Loan debt at graduation
  data.institutionalLoanTotal =  (data.institutionalLoan * data.institutionalLoanRate  / 12 * ((data.programLength * (data.programLength + 1) / 2 * 12 + data.programLength * data.deferPeriod)) + (data.institutionalLoan * data.programLength));
  
  // Home Equity Loans at graduation
  data.homeEquityTotal = (data.homeEquity * .079 / 12 * ((data.programLength * (data.programLength + 1) / 2 * 12)));

  // Debt after 1 yr
  data.loanDebtYearOne = data.perkins + data.staffSubsidized + data.staffUnsubsidized + data.gradplus + data.privateLoan + data.institutionalLoan + data.parentplus + data.homeEquity;

  // Total debt at graduation
  data.totalDebt = data.perkinsTotal + data.staffSubsidizedTotal + data.staffUnsubsidizedTotal + data.gradplusTotal + data.parentplusTotal + data.privateLoanTotal + data.institutionalLoanTotal + data.homeEquityTotal;

  // repayment term
  if ( data.repaymentTerminput == "10 years") { 
    data.repaymentTerm = 10;
  } 
  else if ( data.repaymentTerminput == "20 years") {
    data.repaymentTerm =  20; 
  }
  else {
    data.repaymentTerm = 10;
  }
  
  // loanMonthly - "Monthly Payments"
  data.loanMonthly =
  ( data.perkinsTotal * ( data.perkinsRate / 12 ) / ( 1 - Math.pow((1 + data.perkinsRate / 12), ( -data.repaymentTerm * 12 ) ) ) )
    + (data.staffSubsidizedTotal 
      * (data.subsidizedRate / 12) / (1 - Math.pow((1 + data.subsidizedRate / 12), (-data.repaymentTerm * 12))))
    + (data.staffUnsubsidizedTotal 
      * (data.unsubsidizedRate / 12) / (1 - Math.pow((1 + data.unsubsidizedRate / 12), (-data.repaymentTerm  * 12))))
    + (data.gradplusTotal * (data.gradplusrate / 12) / (1 - Math.pow((1 + data.gradplusrate /12), (-data.repaymentTerm * 12))))
    + (data.privateLoanTotal * (data.privateLoanRate / 12) / (1 - Math.pow((1 + data.privateLoanRate /12), (-data.repaymentTerm * 12))))
    + (data.institutionalLoanTotal 
      * (data.institutionalLoanRate / 12) / (1 - Math.pow((1 + data.institutionalLoanRate /12), (-data.repaymentTerm * 12))));
  
  // loanMonthlyparent
  data.loanMonthlyparent = (data.parentplus * (data.parentplusrate / 12) / (Math.pow(1 - (1 + data.parentplusrate / 12), (-data.repaymentTerm * 12)))) + (data.homeEquity * (data.homeEquityLoanRate / 12) / (Math.pow(1 - (1 + data.homeEquityLoanRate / 12), (-data.repaymentTerm * 12))));
  
  // loanlifetime
  data.loanlifetime = data.loanMonthly * data.repaymentTerm  * 12;

  // // salaryneeded
  // data.salaryneeded = data.loanMonthly * 12 / 0.14;

  // // Expected salary and Annual salary (educ lvl)
  // if ( data.program == "aa" ) {
  //   data.salaryexpected25yrs = data.salaryaa * 52.1775;
  // }
  // else if ( data.program == "ba" ) {
  //   data.salaryexpected25yrs =  data.salaryba * 52.1775
  // }
  // else {
  //   data.salaryexpected25yrs = data.salarygrad * 52.1775;
  // }
  // data.salarymonthly = data.salary / 12;

  console.log( data );

  return data.totalDebt;

}
module.exports = studentDebtCalculator;