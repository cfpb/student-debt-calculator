/**
 * Enforces a range.
 * @param { number } n - A number or string to be checked.
 * @param { number } min - The minimum value to be enforced on n,
 *   if min is 'false', then no minimum is enforced.
 * @param { number } max - The maximum value to be enforced on n,
 *   if min is 'false', then no maximum is enforced.
 * @returns { number } min or max value.
 */
function enforceRange(n, min, max) {
  if (max < min || typeof n !== typeof min) {
    return false;
  }

  if (n > max && max !== false) {
    n = max;
  }

  if (n < min && min !== false) {
    n = min;
  }

  return n;
}

export default enforceRange;
