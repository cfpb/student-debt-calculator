All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

## 1.0.0
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
