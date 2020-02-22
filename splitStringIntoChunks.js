/**
 * Split string into chunks of the given size and merge them with the given
 * separator string. Default chunk grouping order is from right to left.
 *
 * @param { string } input          Input string
 * @param { number } length         Chunk length
 * @param { string } separator      Separator between the chunks
 * @param { boolean } [left]        Start chunks from left to right instead of right to left
 * @return { string }               String split into chunks with the given separator
 */
module.exports = function splitStringIntoChunks (input, length, separator = ' ', left = false) {
  if (typeof input !== 'string') {
    throw new Error('splitStringIntoChunks expects first argument to be a string')
  }

  if (typeof length !== 'number' || length !== Math.floor(length)) {
    throw new Error('splitStringIntoChunks expects second argument to be an integer')
  }

  const output = []
  const chars = left ? input.split('').reverse().join('') : input
  separator = String(separator)

  for (let i = 0; i < chars.length; i++) {
    if (i && i % length === 0) {
      output.push(separator)
    }

    output.push(chars.substr(chars.length - i - 1, 1))
  }

  if (left) {
    return output.join('')
  }

  return output.reverse().join('')
}
