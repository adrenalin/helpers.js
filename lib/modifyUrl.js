const httpBuildQuery = require('./httpBuildQuery')
const parseQueryString = require('./parseQueryString')
const merge = require('./merge')

/**
 * Modify the given URL with new query strings by adding or replacing query
 * values with the given.
 *
 * @param { string } url              URL to modify
 * @param { object } query            New query values
 * @param { object } options          Options for httpBuildQuery
 * @return { string }                 Modified URL
 */
module.exports = function modifyUrl (url, query, options) {
  if (typeof url !== 'string') {
    throw new Error('First argument has to be a string')
  }

  const [rootUrl, qs] = url.split('?')
  const oldValues = qs ? parseQueryString(qs) : {}

  const parts = [
    rootUrl
  ]

  query = query || {}

  // Merge old and new query values
  const values = merge(oldValues, query)

  const queryString = httpBuildQuery(values, options)

  if (queryString) {
    parts.push(queryString)
  }

  return parts.join('?')
}
