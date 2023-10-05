const { InvalidArgument } = require('@vapaaradikaali/errors')
const castToArray = require('./castToArray')
const getValue = require('./getValue')

/**
 * Get an array or a set mapped by the given attribute
 *
 * @function getObjectPaths
 * @param { object } source           Source object
 * @return { string[] }               Path as an array
 */
module.exports = function getMappedItems (source, attribute) {
  if (!Array.isArray(source) && !(source instanceof Set)) {
    throw new InvalidArgument('First argument of getMappedItems has to be an array or a Set')
  }

  const paths = castToArray(attribute)

  paths.forEach((p) => {
    if (typeof p !== 'string') {
      throw new InvalidArgument('Second argument of getMappedItems has to be a string or an array of strings')
    }
  })

  if (!paths.length) {
    throw new InvalidArgument('Second argument of getMappedItems has to be a string or an array of strings')
  }

  const mapped = {}

  source.forEach((item, i) => {
    const id = getValue(item, paths)

    if (mapped[id] != null) {
      throw new InvalidArgument(`Item ${i} has a duplicate id ${id}`)
    }

    mapped[id] = item
  })

  return mapped
}
