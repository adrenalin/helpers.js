const castToArray = require('./castToArray')
const isObject = require('./isObject')

/**
 * Sum object numbers
 *
 * @param  {...any} args              Arguments
 * @param { boolean } [ignoreErrors]  Optional ignore errors flag
 * @returns { object }                Object sum
 */
module.exports = function objectSum (...args) {
  let ignoreErrors = false
  const result = {}
  const objects = []

  const set = args.slice()
  const last = args[args.length - 1]

  if (typeof last === 'boolean') {
    ignoreErrors = last
    set.pop()
  }

  set.forEach((arg) => {
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
        if (ignoreErrors) {
          res[k] = v
          continue
        }

        throw new TypeError(`${v} is not a number`)
      }

      if (isNaN(res[k])) {
        if (ignoreErrors) {
          continue
        }

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
