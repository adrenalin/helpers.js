/**
 * Serializer creates a pipe of consequent promises, resolving with the values
 * of each successful promise or rejecting with the last error
 *
 * @param { array } data              Segments for each promise
 * @param { function } fn             Serializer function
 * @return { Promise }                Promise
 */
module.exports = function serializer (tasks, fn) {
  tasks = tasks.slice()
  let i = 0
  const values = []

  return new Promise((resolve, reject) => {
    const serializer = () => {
      if (!tasks.length) {
        return resolve(values)
      }

      const task = tasks.splice(0, 1)[0]

      Promise.resolve(fn(task, i++))
        .then((response) => {
          values.push(response)
          serializer()
        })
        .catch((err) => {
          reject(err)
        })
    }

    serializer()
  })
}
