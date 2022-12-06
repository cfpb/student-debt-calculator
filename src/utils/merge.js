/**
 * Merges financial object with the default values.
 * @param { object }  defaults - Our default values.
 * @param { financials } financials - Our user defined values.
 * @returns { object } Merged defaults and user defined object.
 */
function merge(defaults, financials) {
  return Object.assign(defaults, financials);
}

export default merge;
