/**
 * Get unique class names from a string or an array input
 *
 * @param { mixed } input             A string or an array
 * @param { mixed } [...args]         0...n other class names
 * @return { string }                 Unique class names
 */
module.exports = function getClassName (input) {
  // Support using spread arguments
  if (arguments.length > 1) {
    const args = []

    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }

    return getClassName(args)
  }

  // Recursively parse and flatten arrays
  if (Array.isArray(input)) {
    input = input.map(value => getClassName(value)).join(' ')
  }

  if (typeof input !== 'string') {
    throw new Error('Input has to be an array or a string for getClassName')
  }

  const classNames = []
  input.split(' ').map((value) => {
    if (!value) {
      return
    }

    // Class has to start with an alphabet, underscore or score and be at least
    // two characters long
    if (!value.match(/[a-zA-Z_\-][a-zA-Z0-9_\-]+$/)) { // eslint-disable-line no-useless-escape
      throw new Error(`Invalid class name "${value}"`)
    }

    // Remove duplicates
    if (classNames.includes(value)) {
      return
    }

    classNames.push(value)
  })

  return classNames.join(' ')
}
