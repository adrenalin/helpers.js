/**
 * Cast values
 *
 * @function castToArray
 * @example
 *
 * `castToArray(null)` returns an empty array `[]`
 * `castToArray('foo')` returns `['foo']`
 * `castToArray(['foo'])` returns `['foo']`
 * `castToArray({ foo: 'bar '})` returns `[{ foo: 'bar' }]`
 *
 * @param { mixed } input             Mixed input
 * @return { mixed }                  Merged object or array
 */
module.exports = function castToArray (...args) {
  if (args.length > 1) {
    return args
  }

  const input = args[0]

  if (input == null) {
    return []
  }

  if (input instanceof Set) {
    return Array.from(input)
  }

  return Array.isArray(input) ? input : [input]
}
