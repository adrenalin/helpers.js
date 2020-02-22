/**
 * Trim a string by removing its leading and trailing whitespace
 *
 * @param { string } input            Input string
 * @return { string }                 Trimmed string
 */
module.exports = function trim (input) {
  if (arguments.length !== 1) {
    throw new Error('Invalid arguments')
  }

  if (typeof input !== 'string') {
    throw new Error(`Invalid argument of type ${typeof input}`)
  }

  return input.replace(/(^\s+|\s+$)/g, '')
}
