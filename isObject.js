module.exports = function isObject (value) {
  return value !== undefined && value !== null && value.constructor === Object
}
