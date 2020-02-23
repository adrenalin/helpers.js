const typecastString = require('./typecastString')
const castObjectAsArray = require('./castObjectAsArray')

/**
 * Parse a HTTP query string into an object
 *
 * @param { string } queryString      Query string
 * @param { boolean } typecast        Typecast values
 */
module.exports = function parseQueryString (queryString, typecast = false) {
  const values = {}
  queryString = queryString.replace(/^\?/, '')

  const segments = queryString.split('&')

  segments.map((segment) => {
    if (!segment) {
      return
    }

    const [keyRaw, valueRaw] = segment.split('=')
    const key = decodeURIComponent(keyRaw)
    let value = valueRaw == null ? true : decodeURIComponent(valueRaw)

    if (typecast) {
      value = typecastString(value)
    }

    const parts = key.split('[')
    let tmp = values

    let last = parts.pop().replace(/\]/, '') || 0

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].replace(/\]/, '') || Object.keys(tmp).length
      tmp = tmp[part] = tmp[part] || {}
    }

    // Do not overwrite the previous value for zero length query string indexes
    if (tmp[last] != null) {
      last = Object.keys(tmp).length
    }

    tmp[last] = value
  })

  // Cast indexed objects as an array when applicable
  for (const key in values) {
    try {
      values[key] = castObjectAsArray(values[key], true)
    } catch (err) {
    }
  }

  return values
}
