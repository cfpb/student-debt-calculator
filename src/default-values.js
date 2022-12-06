/**
 * default value object
 * this houses all of the default values that could be supplied
 */
const defaultValues = {
  // Costs of attendance
  tuitionFees: 0,
  roomBoard: 0,
  books: 0,
  otherExpenses: 0,
  transportation: 0,
  // Scholarships, grants, and personal contributions
  scholarships: 0,
  GIBill: 0,
  militaryTuitionAssistance: 0,
  pell: 0,
  savings: 0,
  family: 0,
  // federal loans
  perkins: 0,
  directSubsidized: 0,
  directUnsubsidized: 0,
  parentPlus: 0,
  gradPlus: 0,
  // private loans
  privateLoan: 0,
  privateLoanMulti: [],
  institutionalLoan: 0,
  state529plan: 0,
  workstudy: 0,
  homeEquity: 0,
  // tuition repayment plans
  tuitionRepay: 0,
  tuitionRepayRate: 0,
  tuitionRepayTerm: 1,
  // Loan rate defaults
  institutionalLoanRate: 0.079,
  privateLoanRate: 0.079,
  // Pell grant settings
  pellMax: 0,
  pellCap: 5730,
  // Military Tuition Assistance settings
  militaryAssistanceCap: 4500,
  // Perkins loan settings
  perkinsUnderCap: 5500,
  perkinsGradCap: 8000,
  perkinsRate: 0.05,
  // Direct loans settings
  directSubsidizedMax: 0,
  directUnsubsidizedIndepMax: 0,
  directUnsubsidizedDepMax: 0,
  directUnsubsidizedGradMax: 0,
  directUnsubsidizedWithFee: 0,
  // Length of program, in years
  programLength: 4,
  // Program is undergrad
  undergrad: true,
  // placeholders
  yearInCollege: 1,
  //
  repaymentTerm: 10,
  // ???
  yrben: 0,
  // Federal Student Loan Borrowing Caps
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
  // Student Loan Interest Rates
  subsidizedRate: 0.0376,
  unsubsidizedRate: 0.0376,
  unsubsidizedRateUndergrad: 0.0376,
  unsubsidizedRateGrad: 0.0531,
  DLOriginationFee: 1.01073,
  gradPlusRate: 0.0631,
  parentPlusrate: 0.0631,
  plusOriginationFee: 1.04292,
  homeEquityLoanRate: 0.079,
  deferPeriod: 6,
  loanMonthly: 0,
  errors: {},
};

export default defaultValues;
