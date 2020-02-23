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

  if (recurse) {
    // Create a copy of the object when recursing to prevent modifying the original
    obj = JSON.parse(JSON.stringify(obj))
  }

  // Storage the values
  const values = []

  // First pass: check keys
  const keys = Object.keys(obj)

  if (!keys.length) {
    return values
  }

  // Recurse children first
  if (recurse) {
    for (const key in obj) {
      try {
        obj[key] = castObjectAsArray(obj[key], recurse)
      } catch (err) {
      }
    }
  }

  const first = Number(keys[0])

  if (![0, 1].includes(first)) {
    if (recurse > 0) {
      return obj
    }

    throw new Error(`First index is not 0 or 1, but "${keys[0]}"`)
  }

  for (let i = 0; i < keys.length; i++) {
    const key = Number(keys[i])
    let value = obj[key]

    if (isNaN(key)) {
      if (recurse) {
        return obj
      }

      throw new Error(`"${keys[i]}" is not numeric`)
    }

    if (key !== first + i) {
      if (recurse) {
        return obj
      }

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
