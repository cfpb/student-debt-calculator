function ratesInState(data) {
  // tf in-state rate prepopulate (schoolData.tfinsprep)
  if (data.control === 'public' && data.program === 'grad') {
    data.TFInState = data.tuitiongradins;
  } else {
    data.TFInState = data.tuitionUndergradInState;
  }
  return data.TFInState;
}

function ratesUnsubsidized(data) {
  // Set unsubsidized rate
  // (there is a difference between grad and undergrad direct loan rates)
  if (data.undergrad === true) {
    data.unsubsidizedRate = data.unsubsidizedRateUndergrad;
  } else {
    data.unsubsidizedRate = data.unsubsidizedRateGrad;
  }
  return data.unsubsidizedRate;
}

export { ratesInState, ratesUnsubsidized };
