const getFixedNumber = (number, digits) =>
  Math.round(number * 10 ** digits) / 10 ** digits;

export { getFixedNumber };