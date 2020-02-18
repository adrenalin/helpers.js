module.exports = function getValue (source, path, defaultValue = null) {
  if (typeof path === 'string') {
    path = path.split('.')
  }

  if (!Array.isArray(path)) {
    path = [path]
  }

  path = path.slice()
  const lastKey = path.pop()

  let tmp = source

  path.map((key) => {
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
