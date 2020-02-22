const isObject = require('./isObject')

/**
 * Merge arrays or objects. Does not alter the input values.
 *
 * @param { mixed } [...args]         N objects or arrays
 * @return { mixed }                  Merged object or array
 */
module.exports = function merge (...args) {
  const objects = args.slice()

  if (objects.length < 2) {
    throw new Error('Function merge requires at least two arguments')
  }

  const usedTypes = {
    objects: 0,
    arrays: 0
  }
  for (let i = 0; i < objects.length; i++) {
    if (isObject(objects[i])) {
      usedTypes.objects++
      continue
    }

    if (Array.isArray(objects[i])) {
      usedTypes.arrays++
      continue
    }

    throw new Error('Function merge accepts only objects or arrays')
  }

  if (usedTypes.objects && usedTypes.arrays) {
    throw new Error('Function merge accepts only objects or arrays, not both')
  }

  const target = JSON.parse(JSON.stringify(objects.shift()))

  objects.forEach((source) => {
    if (usedTypes.arrays) {
      source.map((value) => {
        if (!target.includes(value)) {
          target.push(value)
        }
      })
      return
    }

    for (const key in source) {
      const value = source[key]
      if (isObject(value)) {
        target[key] = isObject(target[key]) ? merge(target[key], value) : value
        continue
      }

      target[key] = value
    }
  })

  return target
}
