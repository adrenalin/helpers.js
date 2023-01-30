const { InvalidArgument } = require('@vapaaradikaali/errors')
/**
 * Round to precision
 *
 * @function roundTo
 * @example
 *
 * Default precision is 0 and rounding method "round"
 *
 *     roundTo(1.23) // Will yield 1
 *     roundTo(1.5) // Will yield 2
 *
 * Positive precision allows more decimals, negative rounds to tens
 *
 *     roundTo(1.23, 1) // Will yield 1.2
 *     roundTo(12.3, -1) // Will yield 10
 *
 * "ceil" will round up and "floor" will round down
 *
 *     roundTo(1.23, 0, 'ceil') // Will yield 2
 *     roundTo(1.8, 0, 'floor') // Will yield 1
 *
 *
 * @param { number } value            Value to round
 * @param { number } [precision=0]    Precision
 * @param { string } [method="round"] Rounding method, one of "round", "floor" or "ceil"
 */
module.exports = function roundTo (value, precision, method) {
  const allowedMethods = ['round', 'floor', 'ceil']

  const v = Number(value)
  const p = allowedMethods.includes(precision) ? 0 : Number(precision || 0)
  method = allowedMethods.includes(precision) ? precision : method || allowedMethods[0]

  if (isNaN(v)) {
    throw new InvalidArgument(`Value ${value} is not a number`)
  }

  if (!Number.isInteger(p)) {
    throw new InvalidArgument(`Precision ${p} is not a number`)
  }

  if (!allowedMethods.includes(method)) {
    throw new InvalidArgument(`Invalid rounding method "${method}", expected "round", "floor" or "ceil"`)
  }

  const pow = Math.pow(10, p)
  return Math[method](v * pow) / pow
}
