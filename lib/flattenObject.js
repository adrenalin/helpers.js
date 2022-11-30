const isObject = require('./isObject')
const getValue = require('./getValue')

/**
 * Flatten an object. This is a serialization method that takes an object and
 * flattens it into a single-level object with deep keys joined with a dot.
 *
 * @function flattenObject
 * @example
 *
 * ```
 * flattenObject({
 *   foo: {
 *     bar: {
 *       value: true
 *     },
 *     array: ['foo', 'bar'],
 *   }
 * })
 * ```
 *
 * will outpout
 *
 * ```
 * {
 *   'foo.bar.value': true
 *   'foo.array': ['foo', 'bar']
 * }
 * ```
 *
 * @param { object } input            Object tree to flatten
 */
module.exports = function flattenObject (input) {
  if (!isObject(input)) {
    return input
  }

  const values = {}

  const traversePath = (path) => {
    const p = path.join('.')
    const v = getValue(input, p)

    if (isObject(v)) {
      for (const k in v) {
        traversePath([...path, k])
      }
      return
    }

    values[p] = v
  }

  for (const k in input) {
    traversePath([k])
  }

  return values
}
