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

  /**
   * Constructor
   *
   * @param { object } [values]       Instance values
   * @param { object } [schema]       Instance schema
   */
  constructor (values, schema) {
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
    this.validate()
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
    validator.addSchema(schema, schema.$id || schema.id || '/config')
    return this
  }

  /**
   * Normalize schema id
   *
   * @param { string } id             Schema ID
   * @return { string }               Normalized schema id
   */
  normalizeSchemaId (id) {
    return id.replace(/^.*#/, '/#')
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

        if (schema[key].$ref) {
          const ref = schema[key].$ref
          const schemas = this.getValidator().schemas
          for (const k in schemas) {
            const id = this.normalizeSchemaId(k)

            if (id === this.normalizeSchemaId(ref)) {
              setDefaultValues([...path, key], schemas[k] ? schemas[k].properties || {} : {})
              break
            }
          }
        }

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
   * Delete a configuration value
   *
   * @param { mixed } [path]          Array or string
   */
  del (path) {
    this.set(path, undefined)
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
      this.validate(path)
    }

    const target = this.setValuesToPath(path, value, JSON.parse(JSON.stringify(this.values)))
    this.validate(target)
    return this
  }

  /**
   * Validate configuration
   *
   * @param { object } [values]       Values; stored values when omitted
   * @param { object } [schema]       Schema to validate against
   * @return { Config }               Self
   */
  validate (values, schema) {
    if (!this.validator) {
      throw new errors.ConfigError('No validation schema set')
    }

    const v = values || this.values
    const s = schema || this.schema

    const res = this.validator.validate(v, s)

    if (!res.valid) {
      const message = res.errors.map((e) => e.stack).join('; ')
      const err = new errors.ValidationError(`Config validation failed: ${message}`)
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

    if (value === undefined) {
      delete tmp[lastKey]
      return target
    }

    tmp[lastKey] = value
    return target
  }

  /**
   * Get configuration value
   *
   * @param { mixed } paths           Array or string
   * @param { mixed } defaultValue    Default value if the stored is null or undefined
   * @return { mixed }                Stored configuration value or the given default value
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
