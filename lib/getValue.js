/**
 * Get value by path, each node separated by a dot (.). If an array of paths is
 * given, the first available value is returned. If no value is found the
 * default value is returned.
 *
 * @param { object } source           Source object
 * @param { mixed } path              Path as a string or an array of strings for first-match
 * @param { mixed } defaultValue      Default value if nothing is found from the path(s)
 * @return { mixed }                  Value stored in the path or the given default value
 */
module.exports = function getValue (source, path, defaultValue = null) {
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i++) {
      const value = getValue(source, path[i])
      if (value != null) {
        return value
      }
    }

    return defaultValue
  }

  const parts = path.split('.')
  const lastKey = parts.pop()

  let tmp = source

  for (let i = 0; i < parts.length; i++) {
    const key = parts[i]
    if (tmp[key] == null) {
      return defaultValue
    }

    tmp = tmp[key]
  }

  if (tmp[lastKey] == null) {
    return defaultValue
  }

  return tmp[lastKey]
}
