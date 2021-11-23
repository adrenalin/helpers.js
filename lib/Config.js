const castToArray = require('./castToArray')
const merge = require('./merge')
const getPath = require('./getPath')
const isObject = require('./isObject')
const getValue = require('./getValue')

module.exports = class Config {
  constructor () {
    this.values = {}
  }

  /**
   * Internal helper to get path from the given argument
   *
   * @param { mixed } path            Array or string
   * @return { array }                Path as an array
   */
  static getPath (path) {
    return getPath(path)
  }

  /**
   * Set configuration value
   *
   * @param { mixed } [path]          Array or string
   * @param { mixed } value           Any value that can be serialized as JSON
   * @return { Config }               Self
   */
  set (path, value) {
    // Special case to set the full configuration
    if (isObject(path) && value == null) {
      this.values = merge(this.values, path)
      return this
    }

    path = this.constructor.getPath(path)

    const target = this.values
    let tmp = target
    const lastKey = path.pop()

    path.forEach((key) => {
      tmp = tmp[key] = tmp[key] || {}
    })

    tmp[lastKey] = value

    return this
  }

  /**
   * Get configuration value
   *
   * @param { mixed } paths           Array or string
   * @param { mixed } defaultValue    Default value if the stored is null or undefined
   */
  get (paths, defaultValue = null) {
    paths = castToArray(paths)

    // Special case when no paths were given
    if (!paths.length) {
      return JSON.parse(JSON.stringify(this.values))
    }

    for (let i = 0; i < paths.length; i++) {
      const path = this.constructor.getPath(paths[i])
      const value = JSON.parse(JSON.stringify(getValue(this.values, path.join('.'))))

      if (value != null) {
        return value
      }
    }

    return defaultValue
  }

  /**
   * JSON serializer
   *
   * @return { object }               JSON serializeable object
   */
  toJSON () {
    return this.values
  }
}
