const castToArray = require('./castToArray')
const typecastString = require('./typecastString')
/**
 * Build URL from the given parameters
 *
 * @function buildUrl
 * @example
 *
 * `buildUrl('postgresql', 'localhost', null, 'postgres', 'databaseName', { keepAlive: false })` returns `postgresql://postgres@localhost/databaseName?keepAlive=false`
 *
 * @param { string|string[] } [args]  Arguments
 */
module.exports = function buildUrl (args) {
  const arg = castToArray(args || process.argv)
  const values = {}

  arg.forEach((a, i) => {
    if (!a.match(/^--/)) {
      return
    }

    const [key, value] = a.replace(/^--/, '').split('=')

    if (value != null) {
      if (values[key]) {
        values[key] = castToArray(values[key])
        values[key].push(value)
        return
      }

      values[key] = typecastString(value)
      return
    }

    // Booleans
    values[key.replace(/no-/, '')] = !key.match(/^no-/)
  })

  return values
}