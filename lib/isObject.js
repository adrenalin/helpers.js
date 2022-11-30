/**
 * Check if the input value is a plain object
 *
 * @function isObject
 * @param { mixed } value             Any input type
 * @return { boolean }                True if the input is an object, false if not
 */
module.exports = function isObject (value) {
  return value !== undefined && value !== null && value.constructor === Object
}
