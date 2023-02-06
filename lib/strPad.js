const { InvalidArgument } = require('@vapaaradikaali/errors')

/**
 * String padding
 *
 * @param { number|string } input   String to pad
 * @param { number|string } fill    Fill-in string
 * @param { number|string } length  String length
 * @param { boolean } [left]        Pad to left on true, right on false
 * @return { string }               Localized string
 */
module.exports = function strPad (input, fill, length, left = true) {
  if (input == null) {
    input = ''
  }

  if (typeof input === 'number') {
    input = String(input)
  }

  if (typeof input !== 'string') {
    throw new InvalidArgument('strPad expects the first argument to be a string or a number')
  }

  if (fill == null) {
    fill = ''
  }

  if (typeof fill === 'number') {
    fill = String(fill)
  }

  if (typeof fill !== 'string') {
    throw new InvalidArgument('strPad expects the second argument to be a string or a number')
  }

  length = Number(length)

  if (isNaN(length) || !Number.isInteger(length) || length < 1) {
    throw new InvalidArgument('strPad expects the third argument to be a positive integer')
  }

  if (!fill) {
    fill = ' '
  }

  while (input.length < length) {
    input = left ? `${fill}${input}` : `${input}${fill}`
  }

  return left ? input.substr(input.length - length) : input.substr(0, length)
}
