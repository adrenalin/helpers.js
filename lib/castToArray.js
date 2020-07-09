/**
 * Cast values
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

  return Array.isArray(input) ? input : [input]
}
