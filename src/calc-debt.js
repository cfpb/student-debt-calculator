/**
 * @param { number } amount - the amount of debt borrowed
 * @param { number } rate - the rate at which the debt was borrowed
 * @param { number } programLength - the length of the program
 * @param { number } deferPeriod - the length of time payment is deferred
 * @returns { number } the total amount of debt
 */
function calcDebt(amount, rate, programLength, deferPeriod) {
  var total =
    ((amount * rate) / 12) *
      (((programLength * (programLength + 1)) / 2) * 12 +
        programLength * deferPeriod) +
    amount * programLength;

  return total;
}

export default calcDebt;
