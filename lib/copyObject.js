const isObject = require('./isObject')
/**
 * Create a deep copy of an object or an array
 *
 * @function copyObject
 * @param { mixed } source            Source object/primitive to copy
 * @return { mixed }                  Copy of the given value
 */
module.exports = function copyObject (source) {
  if (source instanceof Date) {
    return new Date(source.getTime())
  }

  if (Array.isArray(source)) {
    const target = []
    source.forEach((value) => {
      target.push(copyObject(value))
    })
    return target
  }

  if (isObject(source)) {
    const target = {}

    for (const key in source) {
      target[key] = copyObject(source[key])
    }

    return target
  }

  return source
}
