# Student Debt Calculator

[![Build Status](https://travis-ci.org/cfpb/student-debt-calculator.svg?branch=master)](https://travis-ci.org/cfpb/student-debt-calculator)

> A JavaScript package which calculates student debt at graduation based on a wide array of possible inputs.

This calculator does not simply calculate debt based on loans - given inputs of costs, grants, scholarships, personal savings, and loans, it can calculate how much of the annual cost of attendance is left to pay, total debt at graduation, and monthly payment at graduation, based on combined loans and given loan rates.

**Currently in Beta**

## Dependencies

The package runs on [node.js](http://nodejs.org/). It can be included in front-end projects as an npm package - see 'Installation' below.

## Installation

1. Install node.js
2. Run `yarn add student-debt-calc`

## Usage

The intent of the package is to allow developers to perform calculations of student debt based on a standard
set of costs, grants, scholarships, loans, and a set of constants.

This package can be required and used as a function. It takes in an Object, refered to in this documentation
as the "financials Object" or as `financials`. It returns an Object as well, formatted nearly identically to
Object it was passed, with values based on a set of calculations.

The Object taken in as a parameter and the Object returned are essentially the same Object, with a variety
of calculations and corrections applied, and with properties updated with new values.

For instance, here is a sample of a "financials" Object that can be passed to the calculator:

```
const financials = {
  tuitionFees: 10000,
  roomBoard: 2000,
  books: 1000,
  transportation: 500,
  otherExpenses: 250,
  scholarships: 0,
  pell: 0,
  savings: 0,
  family: 0,
  perkins: 0,
  staffSubsidized: 0,
  staffUnsubsidized: 0,
  institutionalLoan: 0,
  privateLoan: 13750,
  undergrad: true
}
```

### The financials object

The object passed to `studentDebtCalculator` is used to set up the calculations. Each property has a default value, so properties whose value does not need to be changed from the default can be omitted. Below, we list all the properties used in the calculations. They are separated by category for ease of reading.

#### Costs of Attendance

These values are all added together to get the cost of attendance. They are taken as separate values to match with the [Financial Aid Shopping Sheet](http://www2.ed.gov/policy/highered/guid/aid-offer/index.html).

| Property                    | Type   | Description                        | Default value |
| --------------------------- | ------ | ---------------------------------- | ------------- |
| `financials.tuitionFees`    | number | The value of tuition and fees      | 0             |
| `financials.roomBoard`      | number | The cost of room and board         | 0             |
| `financials.books`          | number | The cost of books                  | 0             |
| `financials.otherExpenses`  | number | The cost of miscellaneous expenses | 0             |
| `financials.transportation` | number | The costs of transporation         | 0             |

#### Grants and Scholarships

These values are deducted from cost of attendance.

| Property                               | Type   | Description                                | Default value |
| -------------------------------------- | ------ | ------------------------------------------ | ------------- |
| `financials.scholarships`              | number | Total value of scholarships                | 0             |
| `financials.pell`                      | number | Total value of Pell grants                 | 0             |
| `financials.militaryTuitionAssistance` | number | Total value of Military Tuition Assistance | 0             |
| `financials.GIBill`                    | number | Total value of GI Bill                     | 0             |

#### Contributions

| Property                | Type   | Description                                                                                                                                                                           | Default value |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `financials.workstudy`  | number | Value of work-study                                                                                                                                                                   | 0             |
| `financials.savings`    | number | Total personal savings to be spent to reduce annual cost of attendance                                                                                                                | 0             |
| `financials.family`     | number | Total family contributions to be spent to reduce annual cost of attendance                                                                                                            | 0             |
| `financials.parentPlus` | number | Federal Parent PLUS loan amount (the interest for this loan is not added to student loan totals, but is calculated as a monthly payment in outputs as `financials.loanMonthlyParent`) | 0             |

#### Federal Loans

| Property                        | Type   | Description                                | Default value |
| ------------------------------- | ------ | ------------------------------------------ | ------------- |
| `financials.perkins`            | number | Amount of federal Perkins loan             | 0             |
| `financials.directSubsidized`   | number | Amount of federal Direct subsidized loan   | 0             |
| `financials.directUnsubsidized` | number | Amount of federal Direct unsubsidized loan | 0             |
| `financials.gradPlus`           | number | Amount of GradPlus loan                    | 0             |

#### Private Loans

| Property                       | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default value      |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `financials.institutionalLoan` | number | Amount of loan from institution                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 0                  |
| `financials.privateLoan`       | number | Amount of private loan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 0                  |
| `financials.privateLoanMulti`  | Array  | Used for multiple private loans. This array should contain objects, with each object having two properties - `amount` for the amount of the loan, `rate` for the loan's rate expressed as a decimal, `fees` for the loan's fees expressed as a decimal (based on percent of amount), and `deferPeriod` for the number of months the loan is deferred. Example: `[ { 'amount': 3000, 'rate': 0.061, 'fees': .01, deferPeriod': 6 }, { 'amount': 3600, 'rate': 0.059, 'fees': .0125, 'deferPeriod': 6 } ]` **Important note:** If `privateLoanMulti` is not empty, then the values of `privateLoanMulti` are used and the value of `privateLoan` is ignored! | `[]` (empty array) |

#### Loan rates

| Property                               | Type   | Description                                              | Default value |
| -------------------------------------- | ------ | -------------------------------------------------------- | ------------- |
| `financials.institutionalLoanRate`     | number | Loan rate for institutional loan, expressed as a decimal | 0.079         |
| `financials.privateLoanRate`           | number | Loan rate for private loan, expressed as a decimal       | 0.079         |
| `financials.perkinsRate`               | number | Loan rate for federal Perkins loans                      | 0.05          |
| `financials.subsidizedRate`            | number | Loan rate for Direct subsidized loans                    | 0.0466        |
| `financials.unsubsidizedRateUndergrad` | number | Loan rate for Direct unsubsidized undergratuate loans    | 0.0466        |
| `financials.unsubsidizedRateGrad`      | number | Loan rate for Direct unsubsidized gratuate loans         | 0.0621        |
| `financials.DLOriginationFee`          | number | Origination fee for Direct loans                         | 1.01073       |
| `financials.gradPlusRate`              | number | Loan rate for GradPLUS loan                              | 0.0721        |
| `financials.parentPlusRate`            | number | Loan rate for ParentPLUS loan                            | 0.0721        |
| `financials.plusOriginationFee`        | number | Origination fee for Plus loans                           | 1.04292       |

#### Maximums and Caps

These properties give the calculator caps and maximums on certain values.

| Property                     | Type   | Description                        | Default value |
| ---------------------------- | ------ | ---------------------------------- | ------------- |
| `financials.perkinsUnderCap` | number | Cap on undergratuate Perkins loans | 5500          |
| `financials.perkinsGradCap`  | number | Cap on graduate Perkins loans      | 8000          |

### Outputs

These properties are added to the returned Object and would generally be
considered the "outputs" for the package.

| Property                       | Type   | Description                                                                                |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------ |
| `financials.firstYearNetCost`  | number | The cost of attendance minus grants and scholarships                                       |
| `financials.moneyForCollege`   | number | The total of grants, scholarships, and loans                                               |
| `financials.remainingCost`     | number | The costs of attendance minus all grants, scholarships, and loans                          |
| `financials.moneyForCollege`   | number | The total of grants, scholarships, and loans                                               |
| `financials.loanMonthly`       | number | The monthly loan payment based on the loans specified and `financials.repaymentTerm`       |
| `financials.loanLifetime`      | number | The lifetime cost of the loans based on the loans specified and `financials.repaymentTerm` |
| `financials.loanMonthlyParent` | number | The monthly loan payment of the federal Parent PLUS loan.                                  |

#### tenYear and twentyFiveYear properties

To make it easy to compare the difference between 10 and 25 year loan repayment terms,
the Object returned by the package has two additional properties - `financials.tenYear`
and `financials.twentyFiveYear`. These properties are Objects themselves with their own
`loanLifetime` and associated values:

| Property                                 | Type   | Description                                                  |
| ---------------------------------------- | ------ | ------------------------------------------------------------ |
| `financials.tenYear.loanMonthly`         | number | The monthly loan payment with a 10 year repayment term       |
| `financials.tenYear.loanLifetime`        | number | The lifetime cost of the loans with a 10 year repayment term |
| `financials.twentyFiveYear.loanMonthly`  | number | The monthly loan payment with a 25 year repayment term       |
| `financials.twentyFiveYear.loanLifetime` | number | The lifetime cost of the loan with a 25 year repayment term  |

### Calculations, Caps, and Errors

When applied to the "financials" Object, the package first establishes some
constants and determines which values should be used for a variety of numbers

- for instance, based on whether the program is undergraduate or graduate,
  what the limits of some federal loans are.

The package then establishes scholarships and grants, checking against caps,
and calculates the `firstYearNetCost` property based on those values (applying
the grants and scholarships against the cost of attendance).

Then, the package applies loans to the remaining cost, ensuring these values
are below the limits for federal loans.

After grants, scholarships, and loans are applied, the package determines the
total money for college (`moneyForCollege` property) and the amount left to
pay (`remainingCost` property).

Finally, the package calculates the debt at graduation (properties such as
`perkinsDebt` or `privateLoanDebt`), the cost of the loans over the repayment
term (`loanLifetime` property) and the monthly payment of the loans
('loanMonthly' property)

Along the way, the package also records and corrects "errors" - for instance,
when the inputs exceed federal limits or the cost of attendance (in which case
the values for these inputs are changed to equal the limit). These errors can
be found in the `errors` property, which is an Object itself. The following
table illustrates the "error codes" which are used as keys in the `errors`
Object:

| `errors` Object key            | Error                                               |
| ------------------------------ | --------------------------------------------------- |
| `errors.pellOverCosts`         | Pell grant exceeds cost of attendance               |
| `errors.pellOverCap`           | Pell grant exceeds federal limit                    |
| `errors.perkinsOverCosts`      | Perkins loan exceeds cost of attendance             |
| `errors.perkinsOverCap`        | Perkins loan exceeds federal limit                  |
| `errors.mtaOverCap`            | Military Tuition Assistance exceeds federal limit   |
| `errors.subsidizedOverCosts`   | Direct subsidized loan exceeds cost of attendance   |
| `errors.subsidizedOverCap`     | Direct subsidized loan exceeds federal limit        |
| `errors.unsubsidizedOverCosts` | Direct unsubsidized loan exceeds cost of attendance |
| `errors.unsubsidizedOverCap`   | Direct unsubsidized loan exceeds federal limit      |

## How to test the software

Run tests with:

```
yarn test
```

## Getting help

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## License

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/
