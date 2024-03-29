const { InvalidArgument } = require('@vapaaradikaali/errors')

/**
 * Internal helper to get path from the given argument
 *
 * @function getPath
 * @param { string|string[] } path    String or an array of strings
 * @return { string[] }               Path as an array
 */
module.exports = function getPath (path) {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  if (!Array.isArray(path)) {
    path = [path]
  }

  return path
    .filter((key) => {
      return key != null
    })
    .map((key) => {
      if (!['string', 'number'].includes(typeof key)) {
        throw new InvalidArgument(`Key ${JSON.stringify(key)} is not a String`)
      }

      return key
    })
}
