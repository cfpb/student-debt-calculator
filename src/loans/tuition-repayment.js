const tuitionRepayCalc = {
  /**
   * Calculates and returns the subsidized portion of the tuition
   * repayment plan
   * @param {object} data - Financial data object
   * @returns {number} The total of the subsidized portion
   */
  getSubsidizedPortion: function (data) {
    var subsidizedTerm = data.programLength * 12,
      subsidized = 0;

    if (subsidizedTerm > data.tuitionRepayTerm) {
      subsidized = data.tuitionRepay;
    } else {
      subsidized = (data.tuitionRepay * subsidizedTerm) / data.tuitionRepayTerm;
    }

    return subsidized;
  },

  /**
   * Calculates and returns the unsubsidized portion of the tuition
   * repayment plan
   * @param {object} data - Financial data object
   * @returns {number} The total of the unsubsidized portion
   */
  getUnsubsidizedPortion: function (data) {
    var subsidizedTerm = data.programLength * 12,
      unsubTerm = 0,
      unsubsidized = 0;
    if (subsidizedTerm < data.tuitionRepayTerm) {
      unsubTerm = data.tuitionRepayTerm - subsidizedTerm;
    }
    unsubsidized = (data.tuitionRepay * unsubTerm) / data.tuitionRepayTerm;

    return unsubsidized;
  },

  /**
   * Calculates and returns the monthly payment of the tuition
   * repayment plan
   * @param {object} data - Financial data object
   * @returns {number} The monthly payment
   */
  calculateMonthlyPayment: function (data) {
    var monthly,
      subsidizedTerm = data.programLength * 12,
      unsubTerm = data.tuitionRepayTerm - subsidizedTerm,
      subsidized = this.getSubsidizedPortion(data),
      unsubsidized = this.getUnsubsidizedPortion(data);

    if (unsubsidized === 0) {
      monthly = subsidized / data.tuitionRepayTerm;
    } else if (data.tuitionRepayRate === 0) {
      monthly = unsubsidized / unsubTerm;
    } else {
      monthly =
        (((unsubsidized * (data.tuitionRepayRate / 12)) /
          (1 - Math.pow(1 + data.tuitionRepayRate / 12, -1 * unsubTerm))) *
          unsubTerm +
          subsidized) /
        data.tuitionRepayTerm;
    }

    // If something went wrong, return 0
    if (isNaN(monthly)) {
      monthly = 0;
    }

    return monthly;
  },

  calculateDebtAtGrad: function (data) {
    var debt = 0,
      subsidizedTerm = data.programLength * 12,
      unsubTerm = data.tuitionRepayTerm - subsidizedTerm,
      // subsidized = this.getSubsidizedPortion( data ),
      unsubsidized = this.getUnsubsidizedPortion(data);

    // Add unsubsidized debt if applicable
    if (unsubsidized !== 0) {
      debt += this.calculateMonthlyPayment(data) * unsubTerm;
    }

    return debt;
  },
};

export default tuitionRepayCalc;
