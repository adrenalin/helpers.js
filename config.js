const merge = require('./merge')
const isObject = require('./isObject')
const getValue = require('./getValue')
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
      return JSON.parse(JSON.stringify(this.values))
    }

    if (typeof path === 'string') {
      path = path.split('.')
    }

    if (!Array.isArray(path)) {
      path = [path]
    }

    if (typeof process !== 'undefined') {
      const envPath = path.join('_').toUpperCase()

      if (process.env[envPath] != null) {
        return typecastString(process.env[envPath])
      }
    }

    return JSON.parse(JSON.stringify(getValue(this.values, path.join('.'), defaultValue)))
  }
}

exports.default = Config
exports.config = new Config()
