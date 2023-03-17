const Dataset = require('./Dataset')
const castToArray = require('./castToArray')

/**
 * Check if the haystack has other values than the needle
 *
 * @function getValue
 * @param { mixed } haystack          Source object
 * @param { mixed } needles           Needles
 * @return { boolean }                True if the haystack has any of the needles
 */
module.exports = function hasOther (haystack, ...needles) {
  const values = new Dataset(Array.isArray(haystack) || haystack instanceof Set ? haystack : castToArray(haystack))

  for (const needle of needles) {
    for (const v of castToArray(needle)) {
      if (!values.includes(v)) {
        return true
      }
    }
  }

  return false
}
