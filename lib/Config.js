const { Validator } = require('jsonschema')
const castToArray = require('./castToArray')
const merge = require('./merge')
const getPath = require('./getPath')
const isObject = require('./isObject')
const getValue = require('./getValue')

const errors = {}

errors.ConfigError = class ConfigError extends Error {}
errors.ValidationError = class ValidationError extends errors.ConfigError {}

module.exports = class Config {
  static get errors () {
    return errors
  }

  get errors () {
    return errors
  }

  constructor (values = {}, schema = null) {
    this.values = {}

    if (schema) {
      this.setSchema(schema)
    }

    if (values) {
      this.set(values)
    }
  }

  /**
   * Set JSON schema validation for the configuration. This sets the main schema
   * for the configuration instead of adding a schema by its id, which can be
   * used to add optional referenced schemas.
   *
   * @param { object } schema         JSON schema
   * @return { Config }               Self
   */
  setSchema (schema) {
    if (!isObject(schema)) {
      throw new Error('Schema definition has to be an object')
    }

    this.schema = schema
    this.addSchema(schema)
    this.setDefaultValues()
    this.validateConfig()
    return this
  }

  /**
   * Add a JSON schema to config validator. Use this to add any referenced
   * schemas and Config.setSchema for the main schema.
   *
   * @param { object } schema         JSON schema
   * @return { Config }               Self
   */
  addSchema (schema) {
    const validator = this.getValidator()
    validator.addSchema(this.schema, this.schema.id || '/config')
    return this
  }

  /**
   * Set default values
   *
   * @return { Config }               Self
   */
  setDefaultValues () {
    /**
     * Internal helper to recursively traverse the schema and set values
     *
     * @param { array } path          Config path
     * @param { object } schema       Schema definitions
     */
    const setDefaultValues = (path = [], schema = this.schema.properties) => {
      for (const key in schema) {
        const defaultValue = schema[key].default
        const props = getValue(schema, `${key}.properties`)

        if (isObject(props)) {
          // Recurse objects
          setDefaultValues([...path, key], props)
          continue
        }

        if (defaultValue != null) {
          this.set([...path, key].join('.'), defaultValue)
        }
      }
    }

    setDefaultValues()
    return this
  }

  /**
   * Get a singleton instance of validator
   *
   * @return { jsonschema.Validator } Validator instance
   */
  getValidator () {
    this.validator = this.validator || new Validator()
    return this.validator
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
    this.validateBeforeSet(path, value)
    this.setValuesToPath(path, value, this.values)

    return this
  }

  /**
   * Validate the value before setting it
   *
   * @param { mixed } [path]          Array or string
   * @param { mixed } value           Any value that can be serialized as JSON
   * @return { Config }               Self
   */
  validateBeforeSet (path, value) {
    if (!this.validator) {
      return
    }

    // Special case when passing a full configuration object
    if (isObject(path) && value == null) {
      this.validateConfig(path)
    }

    const target = this.setValuesToPath(path, value, JSON.parse(JSON.stringify(this.values)))
    this.validateConfig(target)
    return this
  }

  /**
   * Validate configuration
   *
   * @param { object } [config]       Configuration object; set configuration is used when omitted
   * @return { Config }               Self
   */
  validateConfig (config, schema) {
    if (!this.validator) {
      throw new errors.ConfigError('No validation schema set')
    }

    config = config || this.values
    schema = schema || this.schema

    const res = this.validator.validate(config, schema)

    if (!res.valid) {
      const err = new errors.ValidationError('Config validation failed')
      err.errors = res.errors
      throw err
    }

    return this
  }

  /**
   * Set value to path for the given target object
   *
   * @param { mixed } [path]          Array or string
   * @param { mixed } value           Any value that can be serialized as JSON
   * @param { object } target         Target object
   * @return { object }               Target object
   */
  setValuesToPath (path, value, target) {
    // Special case to set the full configuration
    if (isObject(path) && value == null) {
      this.values = merge(this.values, path)
      return this
    }

    path = this.constructor.getPath(path)

    let tmp = target
    const lastKey = path.pop()

    path.forEach((key) => {
      tmp = tmp[key] = tmp[key] || {}
    })

    tmp[lastKey] = value
    return target
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
