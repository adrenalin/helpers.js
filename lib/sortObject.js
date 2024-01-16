const isObject = require('./isObject')
/**
 * Sort an object by key or an array by its values
 *
 * @function sortObject
 * @example
 *
 *     sortObject({ foo: 'bar', bar: 'foo' }) // will output {"bar": "foo", "foo": "bar"}
 *     sortObject([3, 2, 1]) // will output [1, 2, 3]
 *
 * @param {*} input Any input
 */
function sortObject (input) {
  if (!isObject(input) && !Array.isArray(input)) {
    return input
  }

  if (Array.isArray(input)) {
    return input.slice()
      .sort()
      .map(v => sortObject(v))
  }

  const output = {}
  Object.keys(input).sort()
    .forEach((k) => {
      output[k] = sortObject(input[k])
    })

  return output
}

module.exports = sortObject
