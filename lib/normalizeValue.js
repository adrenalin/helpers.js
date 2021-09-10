/**
 * Normalize a value between minimum and maximum
 *
 * @param { string } queryString      Query string
 * @param { boolean } typecast        Typecast values
 */
module.exports = function normalizeValue (value, min, max) {
  if (Array.isArray(value)) {
    return value.map(v => normalizeValue(v, min, max))
  }

  if (isNaN(value)) {
    throw new Error('First argument has to be numeric')
  }

  if (min == null) {
    min = value
  }

  if (max == null) {
    max = value
  }

  if (isNaN(min)) {
    throw new Error('Second argument has to be numeric')
  }

  if (isNaN(max)) {
    throw new Error('Third argument has to be numeric')
  }

  return Math.min(Math.max(value, min), max)
}
