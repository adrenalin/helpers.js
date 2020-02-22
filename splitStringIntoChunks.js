/**
 * Split string into chunks of the given size and merge them with the given
 * separator string. Default chunk grouping order is from right to left.
 *
 * @param { string } str            Input string
 * @param { number } length         Chunk length
 * @param { string } separator      Separator between the chunks
 * @param { boolean } [left]        Start chunks from left to right instead of right to left
 * @return { string }               String split into chunks with the given separator
 */
module.exports = function splitStringIntoChunks (str, length, separator, left = false) {
  const rval = []
  const input = left ? String(str).split('').reverse().join('') : String(str)

  for (let i = 0; i < input.length; i++) {
    if (i && i % length === 0) {
      rval.push(separator)
    }

    rval.push(input.substr(input.length - i - 1, 1))
  }

  if (left) {
    return rval.join('')
  }

  return rval.reverse().join('')
}
