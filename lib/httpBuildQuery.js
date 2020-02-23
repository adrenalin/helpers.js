const isObject = require('./isObject')
/**
 * Build a HTTP query from an object
 *
 * @param { object } query            Query object
 * @param { string } [prefix]         Key prefix
 * @param { array } [parts]           Query parts
 */
module.exports = function httpBuildQuery (query) {
  const convertArray = (arr, prefix, parts = []) => {
    const segments = parts || []

    arr.map((value, i) => {
      const name = `${prefix}[${i}]`

      if (isObject(value)) {
        return buildQuery(value, name, segments)
      }

      if (Array.isArray(value)) {
        return convertArray(value, name, segments)
      }

      if (value == null) {
        value = ''
      }

      segments.push(`${name}=${encodeURIComponent(value)}`)
    })

    return segments
  }

  const buildQuery = (obj, prefix = '', parts = []) => {
    if (!isObject(query)) {
      throw new Error('Only an object query is allowed')
    }

    const segments = parts || []

    Object.keys(obj).map((key) => {
      const value = obj[key]
      const name = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key)

      if (value == null) {
        return
      }

      if (isObject(value)) {
        return buildQuery(value, name, segments)
      }

      if (Array.isArray(value)) {
        return convertArray(value, name, segments)
      }

      segments.push(`${name}=${encodeURIComponent(value)}`)
    })

    return segments.join('&')
  }

  return buildQuery(query)
}
