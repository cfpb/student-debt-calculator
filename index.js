/**
 * @param { object } data 
 * @returns {string}     
 */

'use strict';

function studentDebtCalculator( data ) {
  var commaSeparate = require('./node_modules/.js');

      // Start calculations
      // Cost of First Year (schoolData.firstyrcostattend)
      data.firstyrcostattend = data.tuitionfees + data.roombrd + data.books + data.otherexpenses + data.transportation;

      // SCHOLARSHIPS & GRANTS //
      // Pell Grants
      data.pell_max = 0;
      if ( data.undergrad == true ) {
        data.pell_max = global.pellcap;
      }
      if ( data.pell_max > data.firstyrcostattend ) {
        data.pell_max = data.firstyrcostattend;
      }
      if ( data.pell_max < 0 ) {
        data.pell_max = 0;
      }
      if (data.pell > data.pell_max){
        data.pell = data.pell_max;
      }

      // Military Tuition Assistance
      if ( global.tuitionassistcap < data.tuitionfees ) {
        data.tuitionassist_max = global.tuitionassistcap;
      }
      else {
        data.tuitionassist_max = data.tuitionfees;
      }
      if (data.tuitionassist > data.tuitionassist_max) {
        data.tuitionassist = data.tuitionassist_max;
      }

      // GI Bill
      // Set schoolData.tfinstate
      if ( data.instate == false ) {
        data.tfinstate = data.gibillinstatetuition; 
      }
      else {
        data.tfinstate = data.tuitionfees;
      }

      // Tuition & Fees benefits:
      if (global.vet == false) {
        data.gibilltf = 0; 
      }
      else {
         
        // Calculate veteran benefits:    
        if ( ( data.control == "Public" ) && ( data.instate == true ) ) {
          data.gibilltf = ( data.tuitionfees - data.scholar - data.tuitionassist ) * global.tier;
          if ( data.gibilltf < 0 ) {
            data.gibilltf = 0;
          }
        }
        else if ( ( data.control == "Public" ) && ( data.instate == false ) ) {
          data.gibilltf = ( data.tfinstate + (global.yrben * 2) - data.scholar - data.tuitionassist ) * global.tier;
          if ( data.gibilltf < 0 ) {
            data.gibilltf = 0;
          }
          if ( data.gibilltf > ( ( data.tuitionfees - data.scholar - data.tuitionassist) * global.tier ) ) {
            data.gibilltf = data.tuitionfees * global.tier;
          }
        }
        else { // School is not public
          data.gibilltf = ( global.tfcap + (global.yrben * 2) - data.scholar - data.tuitionassist ) * global.tier;
          if ( data.gibilltf < 0 ) {
            data.gibilltf = 0;
          }
          if ( data.gibilltf > ( ( data.tuitionfees - data.scholar - data.tuitionassist) * global.tier ) ) {
            data.gibilltf = data.tuitionfees * global.tier;
          }
        }
      }

      // GI living allowance benefits:
      if (global.vet === false) {
        data.gibillla = 0;
      }
      else { 
        if (global.serving == "ad") { 
          data.gibillla = 0;
        }
        else if ( ( global.tier == 0 ) && ( global.serving == "ng" ) ) {
          data.gibillla = global.gibillch1606 * 9;
        }
        else {
          if (data.online == "Yes" ) {
            data.gibillla = ( ( ( global.avgbah / 2 * global.tier ) + global.kicker ) * global.rop) * 9;
          }
          else {
            data.gibillla = data.bah * global.tier * 9 * global.rop;
          }
        }
      }


      // GI Bill Book Stipend
      if (global.vet === false) {
        data.gibillbs = 0;
      }
      else {
        data.gibillbs = global.bscap * global.tier * global.rop;
      }

      // Total GI Bill
      data.gibill = data.gibilltf + data.gibillla + data.gibillbs;

      // Total Grants
      data.grantstotal = data.pell + data.scholar + data.gibill + data.tuitionassist;

      // First Year Net Cost
      data.firstyrnetcost = data.firstyrcostattend - data.grantstotal;

      // Total Contributions
      data.savingstotal = data.savings + data.family + data.state529plan + data.workstudy;
      
      // grants and savings
      data.totalgrantsandsavings = data.savingstotal + data.grantstotal;

      // FEDERAL LOANS //
      // Perkins Loan

      data.perkins_max = data.firstyrcostattend - data.pell;
      if ( data.perkins_max < 0 ) {
        data.perkins_max = 0;
      }
      if ( data.undergrad == true ) {
        if ( data.perkins_max > global.perkinscapunder ) {
          data.perkins_max = global.perkinscapunder;
        }
      }
      else {
        if ( data.perkins_max > global.perkinscapgrad ) {
          data.perkins_max = global.perkinscapgrad;
        }   
      }
      if (data.perkins > data.perkins_max) {
        data.perkins = data.perkins_max;
      }
        
      // Subsidized Stafford Loan
      if (data.undergrad == false) {
        data.staffsubsidized_max = 0;
      }
      else {
        if ((data.program == "aa") || (data.yrincollege == 1)) {
          data.staffsubsidized_max = data.firstyrcostattend - data.pell - data.perkins;
          if ( data.staffsubsidized_max > global.subsidizedcapyr1 ) {
            data.staffsubsidized_max = global.subsidizedcapyr1;
          }
          if ( data.staffsubsidized_max < 0 ) {
            data.staffsubsidized_max = 0;
          }
        }
        else if (data.yrincollege == 2) {
          data.staffsubsidized_max = data.firstyrcostattend - data.perkins - data.pell;
          if ( data.staffsubsidized_max > ( global.subsidizedcapyr2 - data.staffsubsidized ) ) {
            data.staffsubsidized_max = global.subsidizedcapyr2 - data.staffsubsidized ;
          }
          if ( data.staffsubsidized_max < 0 ) {
            data.staffsubsidized_max = 0;
          }
        }
        else if (data.yrincollege == 3) {
          data.staffsubsidized_max = data.firstyrcostattend - data.perkins - data.pell;
          if ( data.staffsubsidized_max > ( global.subsidizedcapyr3 - data.staffsubsidized ) ) {
            data.staffsubsidized_max = global.subsidizedcapyr3 - data.staffsubsidized ;
          }
          if ( data.staffsubsidized_max < 0 ) {
            data.staffsubsidized_max = 0;
          }
        }
      }
      if (data.staffsubsidized_max < 0){
        data.staffsubsidized = 0;
      }
      if (data.staffsubsidized > data.staffsubsidized_max){
        data.staffsubsidized = data.staffsubsidized_max;
      }

      //unsubsidized loan max for independent students
      if ( data.undergrad == false) { 
        data.staffunsubsidizedindep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
        if ( data.staffunsubsidizedindep_max > global.unsubsidizedcapgrad ) {
          data.staffunsubsidizedindep_max = global.unsubsidizedcapgrad;
        }
        if (data.staffunsubsidizedindep_max > global.unsubsidizedcapgrad - data.staffsubsidized) {
          data.staffunsubsidizedindep_max = global.unsubsidizedcapgrad - data.staffsubsidized;
        }
        if ( data.staffunsubsidizedindep_max < 0 ) {
          data.staffunsubsidizedindep_max = 0;
        }
      } 
      else {
        if ( ( data.program == "aa" ) || ( data.yrincollege == 1 ) ) { 
          data.staffunsubsidizedindep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
          if ( data.staffunsubsidizedindep_max > ( global.unsubsidizedcapindepyr1 - data.staffsubsidized ) ) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr1;
          }
          if (data.staffunsubsidizedindep_max > global.unsubsidizedcapindepyr1 - data.staffsubsidized) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr1 - data.staffsubsidized;
          }
          if ( data.staffunsubsidizedindep_max < 0 ) {
            data.staffunsubsidizedindep_max = 0;
          }
        }
        else if ( data.yrincollege == 2) { 
          data.staffunsubsidizedindep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
          if ( data.staffunsubsidizedindep_max > ( global.unsubsidizedcapindepyr2 - data.staffsubsidized ) ) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr2;
          }
          if ( data.staffunsubsidizedindep_max > global.unsubsidizedcapindepyr2 - data.staffsubsidized ) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr2 - data.staffsubsidized;
          }
          if ( data.staffunsubsidizedindep_max < 0 ) {
            data.staffunsubsidizedindep_max = 0;
          }
        }
        else if ( data.yrincollege == 3) { 
          data.staffunsubsidizedindep_max = data.firstyrcostattend - data.pell - data.perkins- data.staffsubsidized;
          if ( data.staffunsubsidizedindep_max > ( global.unsubsidizedcapindepyr3 - data.staffsubsidized ) ) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr3;
          }
          if ( data.staffunsubsidizedindep_max > global.unsubsidizedcapindepyr3 - data.staffsubsidized ) {
            data.staffunsubsidizedindep_max = global.unsubsidizedcapindepyr3 - data.staffsubsidized;
          }
          if ( data.staffunsubsidizedindep_max < 0 ) {
            data.staffunsubsidizedindep_max = 0;
          }
        }
      }
      // unsubsidized loan max for dependent students
      if ( data.undergrad == false ) {
        data.staffunsubsidizeddep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
        if ( data.staffunsubsidizeddep_max > global.unsubsidizedcapgrad - data.staffsubsidized) {
          data.staffunsubsidizeddep_max = global.unsubsidizedcapgrad - data.staffsubsidized;
        }
        if ( data.staffunsubsidizeddep_max < 0 ) {
          data.staffunsubsidizeddep_max = 0;
        }
      } 
      else if ( data.program == "aa" || data.yrincollege == 1 ) {
        data.staffunsubsidizeddep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
        if ( data.staffunsubsidizeddep_max > global.unsubsidizedcapyr1 - data.staffsubsidized) {
          data.staffunsubsidizeddep_max = global.unsubsidizedcapyr1 - data.staffsubsidized;
        }
        if ( data.staffunsubsidizeddep_max < 0 ) {
          data.staffunsubsidizeddep_max = 0;
        }
      }
      else if ( data.yrincollege == 2) { 
        data.staffunsubsidizeddep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
        if ( data.staffunsubsidizeddep_max > global.unsubsidizedcapyr2 - data.staffsubsidized) {
          data.staffunsubsidizeddep_max = global.unsubsidizedcapyr2 - data.staffsubsidized;
        }
        if ( data.staffunsubsidizeddep_max < 0 ) {
          data.staffunsubsidizeddep_max = 0;
        }
      } 
      else if ( data.yrincollege == 3 ) { 
        data.staffunsubsidizeddep_max = data.firstyrcostattend - data.pell - data.perkins - data.staffsubsidized;
        if ( data.staffunsubsidizeddep_max > (global.unsubsidizedcapyr3 - data.staffsubsidized) ) {
          data.staffunsubsidizeddep_max = global.unsubsidizedcapyr3 - data.staffsubsidized;
        }
        if ( data.staffunsubsidizeddep_max < 0 ) {
          data.staffunsubsidizeddep_max = 0;
        }
      }

      // Unsubsidized Stafford Loans
      if ( global.depend == "dependent" ) {
        data.staffunsubsidized_max = data.staffunsubsidizeddep_max;
      }
      else {
        data.staffunsubsidized_max = data.staffunsubsidizedindep_max;
      }
      if (data.staffunsubsidized_max < 0) {
        data.staffunsubsidized_max = 0;
      }
      if (data.staffunsubsidized > data.staffunsubsidized_max) {
        data.staffunsubsidized = data.staffunsubsidized_max;
      }

      // Gradplus
      if (data.undergrad == true) {
        data.gradplus_max = 0;
      }
      else {
        data.gradplus_max = data.firstyrnetcost - data.perkins - data.staffsubsidized - data.staffunsubsidized;
      }
      if ( data.gradplus_max < 0 ) {
        data.gradplus_max = 0;
      }
      if (data.gradplus > data.gradplus_max) {
        data.gradplus = data.gradplus_max;
      }

      // Federal Total Loan
      data.federaltotal = data.perkins + data.staffsubsidized + data.staffunsubsidized + data.gradplus;

      // PRIVATE LOANS //
      // Institution Loans
      data.institutionalloan_max = data.firstyrnetcost - data.perkins - data.staffsubsidized - data.staffunsubsidized - data.parentplus - data.gradplus - data.homeequity;
      if ( data.institutionalloan_max < 0 ) {
        data.institutionalloan_max = 0;
      }
      if (data.institutionalloan > data.institutionalloan_max) {
        data.institutionalloan = data.institutionalloan_max;
      }

      // Institutional Loan Rate
      if ( data.institutionalloanrate === undefined || data.institutionalloanrate === 0) {
        data.institutionalloanrate = global.institutionalloanratedefault;
      }
      if ( data.institutionalloanrate > .2 ) {
        data.institutionalloanrate = .2;
      }
      if ( data.institutionalloanrate < .01 ) {
        data.institutionalloanrate = .01;
      }

      data.privateloan_max = data.firstyrnetcost - data.perkins - data.staffsubsidized - data.staffunsubsidized - data.institutionalloan - data.gradplus;
      if ( data.privateloan_max < 0 ) {
        data.privateloan_max = 0;
      }
      if (data.privateloan > data.privateloan_max) {
        data.privateloan = data.privateloan_max;
      }

      // Private Loan Rate
      if ( data.privateloanrate === undefined || data.privateloanrate === 0 ) {
        data.privateloanrate = global.privateloanratedefault;
      }
      if ( data.privateloanrate > .2 ) {
        data.privateloanrate = .2;
      }
      if ( data.privateloanrate < .01 ) {
        data.privateloanrate = .01;
      }

      // Private Loan Total
      data.privatetotal = data.privateloan + data.institutionalloan;

      // gap
      data.gap = data.firstyrnetcost - data.perkins - data.staffsubsidized - data.staffunsubsidized - data.workstudy - data.savings - data.family - data.state529plan - data.privateloan - data.institutionalloan - data.parentplus - data.homeequity;

      // ===Loan Calculation===
      // Borrowing Total
      data.borrowingtotal = data.privatetotal + data.federaltotal;

      // Out of Pocket Total
      data.totaloutofpocket = data.grantstotal + data.savingstotal;

      // Money for College Total
      data.moneyforcollege = data.totaloutofpocket + data.borrowingtotal;
      
      // remainingcost -- "Left to Pay"
      data.remainingcost = data.firstyrnetcost - data.totaloutofpocket;
      if ( data.remainingcost < 0 ) {
        data.remainingcost = 0;
      }
      
      // loandebt1yr -- "Estimated Total Borrowing"
        data.loandebt1yr = data.perkins + data.staffsubsidized + data.staffunsubsidized + data.gradplus + data.privateloan + data.institutionalloan + data.parentplus + data.homeequity;

      // Borrowing over cost of attendance
      data.overborrowing = 0;
      if ( data.firstyrcostattend < ( data.outofpockettotal + data.borrowingtotal ) ) {
        data.overborrowing = data.borrowingtotal + data.outofpockettotal - data.firstyrcostattend;
      }

      // Estimated Debt Calculation
      // Perkins debt at graduation
      data.perkinsgrad = data.perkins * data.prgmlength;

      // Direct Subsidized Loan with 1% Origination Fee
      data.staffsubsidizedwithfee = data.staffsubsidized * global.dloriginationfee;

      // Subsidized debt at graduation
      data.staffsubsidizedgrad = data.staffsubsidizedwithfee * data.prgmlength;

      // Direct Unsubsidized Loan with 1% Origination Fee
      data.staffunsubsidizedwithfee = data.staffunsubsidized * global.dloriginationfee;

        // Unsubsidized debt at graduation
        data.staffunsubsidizedgrad = (data.staffunsubsidizedwithfee  * data.unsubsidizedrate / 12 * ((data.prgmlength * (data.prgmlength + 1) / 2 * 12 + data.prgmlength * global.deferperiod)) + (data.staffunsubsidizedwithfee  * data.prgmlength));

      // Grad Plus with origination
      data.gradpluswithfee = data.gradplus * global.plusoriginationfee;

      // Grad Plus debt at graduation
      data.gradplusgrad = (data.gradpluswithfee * global.gradplusrate  / 12 * ((data.prgmlength * (data.prgmlength + 1) / 2 * 12 + data.prgmlength * global.deferperiod)) + (data.gradpluswithfee * data.prgmlength));
      
      // Parent Plus Loans with origination fees
      data.parentpluswithfee = data.parentplus * global.plusoriginationfee;

      // Parent Plus Loans at graduation
      data.parentplusgrad = data.parentpluswithfee * data.prgmlength;

        // Private Loan debt at graduation
        data.privateloangrad = (data.privateloan * data.privateloanrate / 12  * ((data.prgmlength * (data.prgmlength + 1) / 2 * 12 + data.prgmlength * global.deferperiod)) + (data.privateloan * data.prgmlength));

        // Institutional Loan debt at graduation
        data.institutionalloangrad =  (data.institutionalloan * data.institutionalloanrate  / 12 * ((data.prgmlength * (data.prgmlength + 1) / 2 * 12 + data.prgmlength * global.deferperiod)) + (data.institutionalloan * data.prgmlength));
      
      // Home Equity Loans at graduation
      data.homeequitygrad = (data.homeequity * .079 / 12 * ((data.prgmlength * (data.prgmlength + 1) / 2 * 12)));

      // Debt after 1 yr
      data.loandebt1yr = data.perkins + data.staffsubsidized + data.staffunsubsidized + data.gradplus + data.privateloan + data.institutionalloan + data.parentplus + data.homeequity;

      // Total debt at graduation
      data.totaldebtgrad = data.perkinsgrad + data.staffsubsidizedgrad + data.staffunsubsidizedgrad + data.gradplusgrad + data.parentplusgrad + data.privateloangrad + data.institutionalloangrad + data.homeequitygrad;

      // repayment term
      if ( data.repaymentterminput == "10 years") { 
        data.repaymentterm = 10;
      } 
      else if ( data.repaymentterminput == "20 years") {
        data.repaymentterm =  20; 
      }
      else {
        data.repaymentterm = 10;
      }
      
      // loanmonthly - "Monthly Payments"
      data.loanmonthly =
      ( data.perkinsgrad * ( global.perkinsrate / 12 ) / ( 1 - Math.pow((1 + global.perkinsrate / 12), ( -data.repaymentterm * 12 ) ) ) )
        + (data.staffsubsidizedgrad 
          * (global.subsidizedrate / 12) / (1 - Math.pow((1 + global.subsidizedrate / 12), (-data.repaymentterm * 12))))
        + (data.staffunsubsidizedgrad 
          * (data.unsubsidizedrate / 12) / (1 - Math.pow((1 + data.unsubsidizedrate / 12), (-data.repaymentterm  * 12))))
        + (data.gradplusgrad * (global.gradplusrate / 12) / (1 - Math.pow((1 + global.gradplusrate /12), (-data.repaymentterm * 12))))
        + (data.privateloangrad * (data.privateloanrate / 12) / (1 - Math.pow((1 + data.privateloanrate /12), (-data.repaymentterm * 12))))
        + (data.institutionalloangrad 
          * (data.institutionalloanrate / 12) / (1 - Math.pow((1 + data.institutionalloanrate /12), (-data.repaymentterm * 12))));
      
      // loanmonthlyparent
      data.loanmonthlyparent = (data.parentplus * (global.parentplusrate / 12) / (Math.pow(1 - (1 + global.parentplusrate / 12), (-data.repaymentterm * 12)))) + (data.homeequity * (global.homeequityloanrate / 12) / (Math.pow(1 - (1 + global.homeequityloanrate / 12), (-data.repaymentterm * 12))));
      
      // loanlifetime
      data.loanlifetime = data.loanmonthly * data.repaymentterm  * 12;

      // salaryneeded
      data.salaryneeded = data.loanmonthly * 12 / 0.14;

      // Expected salary and Annual salary (educ lvl)
      if ( data.program == "aa" ) {
        data.salaryexpected25yrs = global.salaryaa * 52.1775;
      }
      else if ( data.program == "ba" ) {
        data.salaryexpected25yrs =  global.salaryba * 52.1775
      }
      else {
        data.salaryexpected25yrs = global.salarygrad * 52.1775;
      }
      data.salarymonthly = global.salary / 12;

}
module.exports = studentDebtCalculator;