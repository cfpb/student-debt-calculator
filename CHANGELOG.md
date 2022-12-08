All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

## 3.0.2 2022-12-08

- Fix typo in module import name.

## 3.0.1 2022-12-06

- Convert project to ESM modules.
- Publish in CFPB scope.
- Use jest for testing.
- Add Prettier and linting command.

## 2.6.5 2019-03-25

- Remove unused istanbul dependency

## 2.6.4 2018-08-17

- Update dependencies
- Fix linting issues

## 2.6.3 2017-05-10

- Fix bug in tuition repayment plan calculations with a 0% interest rate

## 2.6.2 2016-12-13

- Stop ignoring `.snyk` file for the sake of Travis

## 2.6.1 2016-12-12

- Upgrade npm shrinkwrap endpoints to HTTPS

## 2.6.0 2016-08-08

- Refactored 'costOfAttendance' and 'yearOneCosts'

## 2.5.13 2016-08-08

- Refactored and simplified Grad PLUS loan limit calculations

## 2.5.12 2016-08-08

- Fix for Grad PLUS loan limits

## 2.5.11 2016-08-08

- Fix for Perkins loan caps

## 2.5.10 2016-08-04

- Fix for 6 month programLength debt totals

## 2.5.9 2016-08-04

- Adds error reporting for grad PLUS loans

## 2.5.8 2016-08-04

- Fix for overborrowing

## 2.5.7 2016-07-26

- Small fix in tests

## 2.5.5 2016-06-20

- Fix for interest rate of 0 for most loans

## 2.5.4 2016-06-20

- Removed tuition payment plans from privateInstitutionalTotal

## 2.5.3 2016-06-20

- Tuition payment plan removed from year one debt

## 2.5.2 2016-06-20

- Exposes specific tuition payment plan outputs

## 2.5.1 2016-06-20

- Removed tuition payment plans from privateInstitutionalTotal

## 2.5.0 2016-06-20

- Added tuition repayment plans
- Removed Parent Plus loans from debt calculations (count as contribution only)

## 2.4.0 2016-05-18

- Added the tenYear and twentyFiveYear properties to the returned object

## 2.3.1 2016-05-17

- Updated federal interest rates
- Added error handling for various loan and grant limits
- Changed federal loan calculations to remove fees from loan total

## 2.2.2 2016-02-19

- Further fix to private loan monthly payments and lifetime loan value

## 2.2.1 2016-02-18

- Fix for private loan total debt bug

## 2.2.0 2016-02-18

- Institutional loans no longer accrue debt during program

## 2.1.1 2016-02-16

- Fix for monthly loan payment and lifetime loan value,

## 2.1.0 2016-02-09

- Added support for fees on multiple Private Loans (no legacy support for single private loan)

## 2.0.0 2016-02-01

- changes to PLUS loan variable names

## 1.0.6 2016-01-28

- remainingCost can now be negative
- gap calculation fixed

## 1.0.5 2016-01-21

- Fix for calculations

## 1.0.3 2016-01-21

- Fix for calculations

## 1.0.2 2016-01-20

- Change to remainingCost calculation

## 1.0.1 2016-01-20

- Fixed incorrect calculations of totals
- Removed old reference to totalgrantsandsavings (now grantsSavingsTotal)

## 1.0.0 2016-01-20

- Changes to many variable names (reason for version change)
- Added GIBill and militaryTuitionAssist as parameters, included them in grantsTotal
- Fix for private loan total
- added test for multiple private loan totals
- References to Stafford loan (staff) updated to Direct loan

## 0.1.2 2016-01-13

- fixed bug with totals of multiple private loans

## 0.1.1 2016-01-13

- added deferPeriod to privateLoanMulti (each private loan can have an individual deferral period)

## 0.1.0 2016-01-08

- added handling for multiple private loans array (data.privateLoanMulti)
- added test for multiple private loans
- removed maximums for institutional and private loans based on "left to pay"

## 0.5.0 2015-12-01

### Added

- add ESLint
- add Travis integration

### Removed

- extraneous open source files (checklist, unused grunt file, screenshot)

### Fixed

- Began refactor by fixing ESLint errors and most warnings

## 2015-12-01

### Added

- Documentation in README
- begin move of functions to ./lib
- add initial tests

## 0.4.0 2015-10-26

### Added

- @mistergone's initial student-debt-calc code as-is from CFPB's paying-for-college tool
