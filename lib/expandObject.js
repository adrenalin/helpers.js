const isObject = require('./isObject')
const setValue = require('./setValue')

/**
 * Expand a flattened object. This method unpacks values flattened with
 * flattenObject
 *
 * @function expandObject
 * @example
 * Example:
 *
 * ```
 * expandObject({
 * {
 *   'foo.bar.value': true
 *   'foo.array': ['foo', 'bar']
 * }
 * })
 * ```
 *
 * will output
 *
 * ```
 * {
 *   foo: {
 *     bar: {
 *       value: true
 *     },
 *     array: ['foo', 'bar'],
 *   }
 * }
 * ```
 *
 * @param { object } input            Object to expand
 */
module.exports = function expandObject (input) {
  if (!isObject(input)) {
    return input
  }

  const value = {}
  for (const key in input) {
    setValue(value, key, input[key])
  }

  return value
}
