/**
 * Filter an array and return only unique values, optionally filtering by
 * reference
 *
 * @param { array } input             Input array
 * @param { boolean } byReference     Check by reference instead of equalish
 * @return { array }                  Array with only unique values
 */
module.exports = function unique (input, byReference = false) {
  if (!Array.isArray(input)) {
    throw new Error('Invalid argument')
  }

  const unique = []
  const packed = []

  input.forEach((value) => {
    const v = byReference ? value : JSON.stringify(value)

    if (!packed.includes(v)) {
      unique.push(value)
      packed.push(v)
    }
  })

  return unique
}
