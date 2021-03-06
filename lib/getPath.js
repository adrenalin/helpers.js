/**
 * Internal helper to get path from the given argument
 *
 * @param { mixed } path            Array or string
 * @return { array }                Path as an array
 */
module.exports = function getPath (path) {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  if (!Array.isArray(path)) {
    path = [path]
  }

  return path.slice()
    .filter((key) => {
      return key != null
    })
    .map((key) => {
      if (!['string', 'number'].includes(typeof key)) {
        throw new Error(`Key ${JSON.stringify(key)} is not a String`)
      }

      return key
    })
}
