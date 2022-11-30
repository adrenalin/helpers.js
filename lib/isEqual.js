const isObject = require('./isObject')

/**
 * Compare two or more items to check if they are equal
 *
 * @function isEqual
 * @param { mixed } value             First item
 * @param { mixed } ...args           Items to compare
 */
module.exports = function isEqual (value, ...args) {
  if (!args.length) {
    throw new Error('isEqual requires two or more arguments')
  }

  if (value instanceof Date) {
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Date) {
        if (value.toISOString() !== args[i].toISOString()) {
          return false
        }
        continue
      }

      if (typeof args[i] === 'string') {
        if (value.toISOString() !== args[i]) {
          return false
        }

        continue
      }

      if (typeof args[i] === 'number') {
        if (value.getTime() !== args[i]) {
          return false
        }

        continue
      }

      return false
    }

    return true
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < args.length; i++) {
      if (!Array.isArray(args[i])) {
        return false
      }

      if (value.length !== args[i].length) {
        return false
      }

      if (!value.length) {
        continue
      }

      for (let j = 0; j < value.length; j++) {
        if (!isEqual(value[j], args[i][j])) {
          return false
        }
      }
    }

    return true
  }

  if (isObject(value)) {
    const keys = Object.keys(value).sort()
    const values = keys.map(key => value[key])

    for (let i = 0; i < args.length; i++) {
      if (!isObject(args[i])) {
        return false
      }

      // Compare keys
      const k = Object.keys(args[i]).sort()
      if (!isEqual(keys, k)) {
        return false
      }

      // Compare values
      const v = k.map(key => args[i][key])
      if (!isEqual(values, v)) {
        return false
      }
    }

    return true
  }

  for (let i = 0; i < args.length; i++) {
    if (value !== args[i]) {
      return false
    }
  }

  return true
}
