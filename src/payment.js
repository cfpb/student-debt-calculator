import tuitionRepayCalc from './loans/tuition-repayment.js';

function calculateMonthlyTotal(data, term) {
  // loanMonthly - "Monthly Payments"
  let loanMonthly =
    calculateMonthly(data.perkinsDebt, data.perkinsRate, term) +
    calculateMonthly(data.directSubsidizedDebt, data.subsidizedRate, term) +
    calculateMonthly(data.directUnsubsidizedDebt, data.unsubsidizedRate, term) +
    calculateMonthly(data.gradPlusDebt, data.gradPlusRate, term) +
    calculateMonthly(
      data.institutionalLoanDebt,
      data.institutionalLoanRate,
      term
    );

  // Private Loan handler
  if (data.privateLoanMulti.length !== 0) {
    for (let x = 0; x < data.privateLoanMulti.length; x++) {
      const privLoan = data.privateLoanMulti[x];
      loanMonthly += calculateMonthly(privLoan.totalDebt, privLoan.rate, term);
    }
  } else {
    loanMonthly += calculateMonthly(
      data.privateLoanDebt,
      data.privateLoanRate,
      term
    );
  }
  return loanMonthly;
}

function calculateMonthly(debt, rate, term) {
  let monthly = 0;

  if (rate === 0) {
    monthly = debt / (term * 12);
  } else {
    monthly =
      (debt * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -1 * term * 12));
  }

  return monthly;
}

function calculateLifetime(loanMonthly, repaymentTerm) {
  // loanLifetime
  const loanLifetime = loanMonthly * repaymentTerm * 12;
  return loanLifetime;
}

function calculateParentMonthly(data, repaymentTerm) {
  // loanMonthlyParent
  const loanMonthlyParent =
    (data.parentPlus * (data.parentPlusRate / 12)) /
      Math.pow(1 - (1 + data.parentPlusRate / 12), -repaymentTerm * 12) +
    (data.homeEquity * (data.homeEquityLoanRate / 12)) /
      Math.pow(1 - (1 + data.homeEquityLoanRate / 12), -repaymentTerm * 12);
  return loanMonthlyParent;
}

/**
 * calculate payments
 * @param { object } data - the data object
 * @returns { object } the data object with monthly and total payments
 */
function payment(data) {
  // Calculate based on data.repaymentTerm field (legacy support)
  data.loanMonthly = calculateMonthlyTotal(data, data.repaymentTerm);
  data.loanLifetime = calculateLifetime(data.loanMonthly, data.repaymentTerm);
  data.loanMonthlyParent = calculateParentMonthly(data, data.repaymentTerm);

  // Calculate 10 year values
  data.tenYear = {};
  data.tenYear.loanMonthly = calculateMonthlyTotal(data, 10);
  data.tenYear.loanLifetime = calculateLifetime(data.tenYear.loanMonthly, 10);
  data.tenYear.loanMonthlyParent = calculateParentMonthly(data, 10);

  // Calculate 25 year values
  data.twentyFiveYear = {};
  data.twentyFiveYear.loanMonthly = calculateMonthlyTotal(data, 25);
  data.twentyFiveYear.loanLifetime = calculateLifetime(
    data.twentyFiveYear.loanMonthly,
    25
  );
  data.twentyFiveYear.loanMonthlyParent = calculateParentMonthly(data, 25);

  data.tuitionRepayMonthly = tuitionRepayCalc.calculateMonthlyPayment(data);

  return data;
}

export { payment };
