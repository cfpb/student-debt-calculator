All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

## 2.4.0
- Added the tenYear and twentyYear properties to the returned object
- Added error handling for various loan and grant limits

## 2.2.2 2016-02-19
- Further fix to private loan monthly payments and lifetime oan value

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
