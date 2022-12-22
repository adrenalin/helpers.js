/**
 * Escape SQL argument
 *
 * @param { string|array|object } arg Argument to escape
 * @param { string } [quote='"']
 * @param { boolean } [force=false]   Flag to force quotes
 */
module.exports = function escapeSql (arg, quote = '"', force = false) {
  if ([null, true, false].includes(arg)) {
    arg = String(arg)

    if (!force) {
      return arg
    }
  }

  if (!['\'', '"'].includes(quote)) {
    throw new Error('Second argument of escapeSql has to be either \' or "')
  }

  if (!force && arg.match(/^[a-z][a-z0-9_]*$/)) {
    return arg
  }

  const regexp = new RegExp(`(${quote})`, 'g')
  const escaped = arg.replace(regexp, `${quote}${quote}`)

  return `${quote}${escaped}${quote}`
}
