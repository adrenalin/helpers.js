const isObject = require('./isObject')

/**
 * Intersection
 *
 * @param { mixed } ...inputs         Input objects or arrays
 * @return { mixed }                  Intersection
 */
module.exports = function intersection (...inputs) {
  if (inputs.length < 2) {
    throw new Error('Cannot get an intersection of less than two inputs')
  }

  for (let i = 0; i < inputs.length; i++) {
    if (!Array.isArray(inputs[i])) {
      throw new Error(`Input ${i} is not an array`)
    }
  }

  return inputs[0]
    .filter((value) => {
      for (let i = 1; i < inputs.length; i++) {
        if (!inputs[i].includes(value)) {
          return false
        }
      }

      return true
    })
}
