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

  parts.map((key) => {
    if (tmp[key] == null) {
      return defaultValue
    }

    tmp = tmp[key]
  })

  if (tmp[lastKey] == null) {
    return defaultValue
  }

  return tmp[lastKey]
}
