const isObject = require('./isObject')
/**
 * Copy source object and remove all the internal references
 *
 * @param { object } source           A string or an array
 * @return { object }                 A copy of the given object
 */
module.exports = function copyObject (source) {
  if (source instanceof Date) {
    return new Date(source.getTime())
  }

  if (Array.isArray(source)) {
    const target = source.slice()
    target.map((value, i) => {
      if (isObject(value) || Array.isArray(value)) {
        target[i] = copyObject(value)
      }
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
