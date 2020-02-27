/**
 * Get random string of the given length
 *
 * @param { number } length           Length of the random string
 */
module.exports = function getRandomString (length = 8, chars) {
  if (typeof length !== 'number') {
    throw new Error('First argument has to be a number')
  }

  if (length < 1) {
    throw new Error('First argument has to be one or more')
  }

  chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const selected = []

  while (selected.length < length) {
    const seed = Math.floor(Math.random() * chars.length)
    selected.push(chars[seed])
  }

  return selected.join('')
}
