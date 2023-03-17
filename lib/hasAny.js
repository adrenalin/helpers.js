const castToArray = require('./castToArray')

/**
 * Check if the haystack has any of the needles
 *
 * @function getValue
 * @param { mixed } haystack          Source object
 * @param { mixed } needles           Needles
 * @return { boolean }                True if the haystack has any of the needles
 */
module.exports = function hasAny (haystack, ...needles) {
  const values = castToArray(haystack)

  for (const needle of needles) {
    for (const v of castToArray(needle)) {
      if (values.includes(v)) {
        return true
      }
    }
  }

  return false
}
