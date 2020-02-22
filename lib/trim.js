module.exports = function trim (input) {
  if (arguments.length !== 1) {
    throw new Error('Invalid arguments')
  }

  if (typeof input !== 'string') {
    throw new Error(`Invalid argument of type ${typeof input}`)
  }

  return input.replace(/(^\s+|\s+$)/g, '')
}
