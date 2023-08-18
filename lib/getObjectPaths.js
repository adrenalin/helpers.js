const isObject = require('./isObject')

/**
 * Get object paths
 *
 * @function getObjectPaths
 * @param { object } source           Source object
 * @return { string[] }               Path as an array
 */
module.exports = function getObjectPaths (source) {
  const paths = []

  function traverseObject (src, parent = []) {
    try {
      for (const key in src) {
        const p = [...parent, key]
        const value = src[key]

        paths.push(p.join('.'))

        if (isObject(value)) {
          traverseObject(value, p)
          continue
        }

        if (Array.isArray(value)) {
          traverseObject(value, p)
        }
      }
    } catch (err) {
      // Do nothing
    }

    return paths
  }

  return traverseObject(source)
}
