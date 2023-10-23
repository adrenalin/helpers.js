const castToArray = require('./castToArray')
const isObject = require('./isObject')

module.exports = function objectSum (...args) {
  const result = {}

  const objects = []

  args.forEach((arg) => {
    castToArray(arg).forEach(p => objects.push(p))
  })

  function traverseObject (obj, res = {}, path = []) {
    for (const k in obj) {
      const v = obj[k]

      if (isObject(v)) {
        res[k] = res[k] || {}
        traverseObject(v, res[k], [...path, k])
        continue
      }

      if (!res[k]) {
        res[k] = 0
      }

      if (isNaN(v)) {
        throw new TypeError(`${v} is not a number`)
      }

      if (isNaN(res[k])) {
        throw new TypeError('Trying to sum scalar with non-scalar')
      }

      res[k] += v
    }
  }

  for (const obj of castToArray(objects)) {
    traverseObject(obj, result)
  }

  return result
}
