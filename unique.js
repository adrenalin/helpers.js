module.exports = function unique (input, byReference = false) {
  if (!Array.isArray(input)) {
    throw new Error('Invalid argument')
  }

  const unique = []
  const packed = []

  input.map((value) => {
    const v = byReference ? value : JSON.stringify(value)

    if (!packed.includes(v)) {
      unique.push(value)
      packed.push(v)
    }
  })

  return unique
}
