const isObject = require('./isObject')
/**
 * Build a HTTP query from an object
 *
 * @function httpBuildQuery
 * @param { object } query            Query object
 * @param { object } options          Build options
 * @return { string }
 */
module.exports = function httpBuildQuery (query, options) {
  const opts = {
    arrayKeys: true,
    ...(options || {})
  }

  const convertArray = (arr, prefix, parts) => {
    arr.forEach((value, i) => {
      const name = opts.arrayKeys ? `${prefix}[${i}]` : `${prefix}[]`

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

    Object.keys(obj).forEach((key) => {
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
