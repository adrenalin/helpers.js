const merge = require('./merge')
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
    if (typeof path === 'string') {
      path = path.split('.')
    }

    if (!Array.isArray(path)) {
      path = [path]
    }

    return path.slice()
      .filter((key) => {
        return key != null
      })
      .map((key) => {
        if (!['string', 'number'].includes(typeof key)) {
          throw new Error(`Key ${JSON.stringify(key)} is not a String`)
        }

        return key
      })
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

    const target = {}
    let tmp = target
    const lastKey = path.pop()

    path.map((key) => {
      tmp = tmp[key] = tmp[key] || {}
    })

    tmp[lastKey] = value

    // tmp[lastKey] = value
    this.values = merge(target, tmp)
    return this
  }

  /**
   * Get configuration value
   *
   * @param { mixed } path            Array or string
   * @param { mixed } defaultValue    Default value if the stored is null or undefined
   */
  get (path, defaultValue = null) {
    path = this.constructor.getPath(path)

    if (!path.length) {
      return JSON.parse(JSON.stringify(this.values))
    }

    return JSON.parse(JSON.stringify(getValue(this.values, path.join('.'), defaultValue)))
  }
}
