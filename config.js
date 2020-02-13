const merge = require('./merge')
const isObject = require('./isObject')
const typecastString = require('./typecastString')

class Config {
  constructor () {
    this.values = {}
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

    if (typeof path === 'string') {
      path = path.split('.')
    }

    if (!Array.isArray(path)) {
      path = [path]
    }

    path = path.slice()

    const target = {}
    let tmp = target
    const lastKey = path.pop()

    path.map((key) => {
      if (!['string'].includes(typeof key)) {
        throw new Error(`Key ${JSON.stringify(key)} is not a String`)
      }

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
    if (!path) {
      return this.values
    }

    if (typeof path === 'string') {
      path = path.split('.')
    }

    if (!Array.isArray(path)) {
      path = [path]
    }

    path = path.slice()
    const originalPath = path.slice()

    const lastKey = path.pop()

    let tmp = this.values

    if (typeof process !== 'undefined') {
      const envPath = originalPath.join('_').toUpperCase()

      if (process.env[envPath] != null) {
        return typecastString(process.env[envPath])
      }
    }

    path.map((key) => {
      if (tmp[key] == null) {
        return defaultValue
      }

      tmp = tmp[key]
    })

    if (tmp[lastKey] == null) {
      return defaultValue
    }

    return JSON.parse(JSON.stringify(tmp[lastKey]))
  }
}

exports.default = Config
exports.config = new Config()
