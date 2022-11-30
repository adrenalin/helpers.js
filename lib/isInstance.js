const isObject = require('./isObject')
/**
 * Check if the given object is instance of the given types
 *
 * @function isInstance
 * @param { mixed } source            Source object to check
 * @param { mixed } targets           Target instances
 * @param { boolean } loose           Loose check
 * @return { boolean }                True if is instance, false if not
 */
module.exports = function isInstance (source, targets, loose) {
  const instances = Array.isArray(targets) ? targets : [targets]

  const primitives = [
    String,
    Number,
    Array,
    Object
  ]

  for (let i = 0; i < instances.length; i++) {
    const target = instances[i]

    if (loose) {
      try {
        if (target === Object && Array.isArray(source)) {
          continue
        }

        if (source instanceof target) {
          return true
        }
      } catch (err) {}
    }

    // Typeof check for primitive types
    if (primitives.includes(target)) {
      const primitive = primitives[primitives.indexOf(target)]

      if (primitive === Object && Array.isArray(source)) {
        continue
      }

      // Special case for Object
      if (primitive === Object && !loose) {
        if (isObject(source)) {
          return true
        }

        continue
      }

      if ([primitive.name, primitive.name.toLowerCase()].includes(typeof source)) {
        return true
      }
    }

    switch (target) {
      case 'array':
        if (Array.isArray(source)) {
          return true
        }
        break

      case 'object':
        if (Array.isArray(source)) {
          break
        }

        if (isObject(source) && !loose) {
          return true
        }

        if (loose && ['object'].includes(typeof source)) {
          return true
        }

        break

      case 'date':
        try {
          if (source instanceof Date) {
            return true
          }
        } catch (err) {}
        break

      default:
        try {
          if (source instanceof target) {
            return true
          }
        } catch (err) {}

        if (typeof source === target) { // eslint-disable-line valid-typeof
          return true
        }
    }
  }

  return false
}
