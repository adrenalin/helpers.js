const isObject = require('./isObject')
const defaultQuote = '"'

/**
 * Escape SQL argument
 *
 * @function escapeSql
 * @example
 *
 * escapeSql takes a value (string, number, boolean, null) and escapes it if
 * it should be escaped. Second argument can be either the quote type (' and ")
 * are accepted. Third argument is force flag to force quote. If second argument
 * is a boolean value default quote type will be used and second argument will
 * be used as the force flag.
 *
 *     escapeSql('foo')
 *     // returns foo
 *
 *     escapeSql(123)
 *     // returns 123
 *
 *     escapeSql('foo', true)
 *      // returns "foo"
 *
 *     escapeSql('foo"bar')
 *     // returns "foo""bar"
 *
 * If the first argument is an array or an object it will be recursively
 * escaped.
 *
 *     escapeSql(['foo', 'bar'], '"', true)
 *     // returns ["\"foo\"", "\"bar\""]
 *
 *     escapeSql({ foo: 'bar' }, "'", true)
 *     // returns { foo: "'bar'" }
 *
 * @param { mixed } arg               Argument to escape
 * @param { string } [quote='"']      Quote type, either " or '
 * @param { boolean } [force=false]   Flag to force quotes
 * @return { mixed }                  Escaped string or an object or and array of escaped strings
 */
module.exports = function escapeSql (arg, ...opts) {
  const quote = typeof opts[0] === 'string' ? opts[0] : defaultQuote

  if (!['\'', '"'].includes(quote)) {
    throw new Error('Second argument of escapeSql has to be either \' or "')
  }

  let force = opts[1] != null ? !!opts[1] : false

  if (typeof opts[0] === 'boolean' && opts[1] == null) {
    force = opts[0]
  }

  if (Array.isArray(arg)) {
    return arg.map(a => escapeSql(a, quote, force))
  }

  if (isObject(arg)) {
    const v = {}

    for (const k in arg) {
      v[k] = escapeSql(arg[k], quote, force)
    }

    return v
  }

  if ([null, true, false].includes(arg) || typeof arg === 'number') {
    arg = String(arg)

    if (!force) {
      return arg
    }
  }

  if (!force && arg.match(/^[a-z][a-z0-9_]*$/)) {
    return arg
  }

  const regexp = new RegExp(`(${quote})`, 'g')
  const escaped = arg.replace(regexp, `${quote}${quote}`)

  return `${quote}${escaped}${quote}`
}
