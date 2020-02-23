const isObject = require('./isObject')

/**
 * Cast an indexed object as array
 *
 * @param { object } source           Source object
 * @param { boolean } recurse         Recurse to child objects
 * @return { array }                  Array conversion of the object
 */
module.exports = function castObjectAsArray (obj, recurse = false) {
  if (!isObject(obj)) {
    throw new Error('Argument given to castObjectAsArray is not an object')
  }

  // Storage the values
  const values = []

  // First pass: check keys
  const keys = Object.keys(obj)

  if (!keys.length) {
    return values
  }

  const first = Number(keys[0])

  if (![0, 1].includes(first)) {
    throw new Error(`First index is not 0 or 1, but "${keys[0]}"`)
  }

  for (let i = 0; i < keys.length; i++) {
    const key = Number(keys[i])
    let value = obj[key]

    if (isNaN(key)) {
      throw new Error(`"${keys[i]}" is not numeric`)
    }

    if (key !== first + i) {
      throw new Error(`"${keys[i]}" does not increment with 1 the previous value`)
    }

    if (recurse && isObject(value)) {
      try {
        value = castObjectAsArray(value, recurse)
      } catch (err) {

      }
    }

    values.push(value)
  }

  return values
}
