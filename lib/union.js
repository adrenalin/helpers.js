module.exports = function union (...arrays) {
  const u = []
  arrays.forEach((arr) => {
    if (!Array.isArray(arr)) {
      throw new Error('Function union accepts only arrays as arguments')
    }

    arr.forEach((value) => {
      if (!u.includes(value)) {
        u.push(value)
      }
    })
  })

  return u
}
