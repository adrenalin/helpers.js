const isObject = require('./isObject')
/**
 * Build a HTTP query from an object
 *
 * @param { object } query            Query object
 * @param { string } [prefix]         Key prefix
 * @param { array } [parts]           Query parts
 */
module.exports = function httpBuildQuery (query) {
  const convertArray = (arr, prefix, parts) => {
    arr.map((value, i) => {
      const name = `${prefix}[${i}]`

      if (isObject(value)) {
        return buildQuery(value, name, parts)
      }

      if (Array.isArray(value)) {
        return convertArray(value, name, parts)
      }

      if (value == null) {
        value = ''
      }

      parts.push(`${name}=${encodeURIComponent(value)}`)
    })

    return parts
  }

  const buildQuery = (obj, prefix, parts) => {
    if (!isObject(query)) {
      throw new Error('Only an object query is allowed')
    }

    Object.keys(obj).map((key) => {
      const value = obj[key]
      const name = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key)

      if (value == null) {
        return
      }

      if (isObject(value)) {
        return buildQuery(value, name, parts)
      }

      if (Array.isArray(value)) {
        return convertArray(value, name, parts)
      }

      parts.push(`${name}=${encodeURIComponent(value)}`)
    })

    return parts.join('&')
  }

  return buildQuery(query, '', [])
}
