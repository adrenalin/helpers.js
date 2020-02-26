/**
 * String padding
 *
 * @param { string } input          String to pad
 * @param { string } fill           Fill-in string
 * @param { number } length         String length
 * @param { boolean } [left]        Pad to left on true, right on false
 * @return { string }               Localized string
 */
module.exports = function strPad (input, fill, length, left = true) {
  if (!fill) {
    fill = ' '
  }

  if (length <= 0) {
    return input
  }

  while (input.length < length) {
    if (left) {
      input = `${fill}${input}`
    } else {
      input += fill
    }
  }

  if (left) {
    return input.substr(input.length - length)
  }

  return input.substr(0, length)
}
