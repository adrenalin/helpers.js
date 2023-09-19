/**
 * Typecast string representation to various different types by heuristics or
 * return the original input string if heuristics matching failed.
 *
 * @param { string } value            Input value
 * @return { mixed }                  Typecasted string or string itself if heuristics failed
 */
module.exports = function typecastString (value) {
  if (typeof value !== 'string') {
    return value
  }

  if (['true'].includes(value.toLowerCase())) {
    return true
  }

  if (['false'].includes(value.toLowerCase())) {
    return false
  }

  if (['', 'null'].includes(value.toLowerCase())) {
    return null
  }

  if (value.match(/^0[^.,]/)) {
    return value
  }

  if (!value.match(/^[-+]?[0-9]*([.,][0-9]+)?$/)) {
    return value
  }

  const parsed = parseFloat(value.replace(/,/, '.'))
  return parsed
}
