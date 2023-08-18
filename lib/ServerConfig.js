const fs = require('fs')
const castToArray = require('./castToArray')
const errors = require('./errors')
const Config = require('./Config')
const YAML = require('yaml')
const typecastString = require('./typecastString')
const argparse = require('./argparse')
const getObjectPaths = require('./getObjectPaths')
const setValue = require('./setValue')

module.exports = class ServerConfig extends Config {
  /**
   * Get environment path
   *
   * @method ServerConfig.getEnvPath
   * @param { string[] } path         Config key path
   * @return { string }
   */
  static getEnvPath (path) {
    return path.join('_').toUpperCase()
  }

  /**
   * Get environment path
   *
   * @method ServerConfig#getEnvPath
   * @param { string[] } path         Config key path
   * @return { string }
   */
  getEnvPath (path) {
    if (this.prefix) {
      path.unshift(this.prefix)
    }

    return this.constructor.getEnvPath(path)
  }

  /**
   * Get argument path
   *
   * @method ServerConfig.argEnvPath
   * @param { string[] } path         Config key path
   * @return { string }
   */
  static getArgPath (path) {
    return path.join('-').toLowerCase()
  }

  /**
   * Get argument path
   *
   * @method ServerConfig#argEnvPath
   * @param { string[] } path         Config key path
   * @return { string }
   */
  getArgPath (path) {
    if (this.prefix) {
      path.unshift(this.prefix)
    }

    return this.constructor.getArgPath(path)
  }

  constructor (...args) {
    super(...args)
    this.args = argparse(process.argv)
  }

  /**
   * Get configuration value
   *
   * @param { mixed } paths           Array or string
   * @param { mixed } defaultValue    Default value if the stored is null or undefined
   */
  get (paths, defaultValue = null) {
    paths = castToArray(paths)

    if (!paths.length) {
      return super.get()
    }

    // Get first the
    for (let i = 0; i < paths.length; i++) {
      const value = this.getEnvValue(this.constructor.getPath(paths[i]))

      if (value != null) {
        return value
      }
    }

    const values = super.get(paths, defaultValue)
    const valuePaths = getObjectPaths(values)

    mainloop: // eslint-disable-line
    for (const part of valuePaths) {
      for (const path of paths) {
        const p = [path, part]
        const value = this.getEnvValue(this.constructor.getPath(p))

        if (value != null) {
          setValue(values, part, value)
          continue mainloop
        }
      }
    }

    return values
  }

  /**
   * Get environment value
   *
   * @param {*} path
   * @returns
   */
  getEnvValue (path) {
    const argPath = this.getArgPath(path)

    if (this.args[argPath] != null) {
      return this.args[argPath]
    }

    const envPath = this.constructor.getEnvPath(path)

    if (process.env[envPath] != null) {
      return typecastString(process.env[envPath])
    }
  }

  /**
   * Set environment prefix
   *
   * @param { string } prefix         Prefix
   */
  setEnvPrefix (prefix) {
    this.prefix = prefix
  }

  /**
   * Load File
   *
   * @param { string } filename       Filename to load
   * @return { string }               File contents
   */
  static loadFile (filename) {
    try {
      return fs.readFileSync(filename, 'utf-8')
    } catch (err) {
      throw new errors.ConfigNotFoundError(`File "${filename}" not found`)
    }
  }

  /**
   * Load configuration as YAML
   *
   * @param { string } filename       YAML filename
   * @return { object }               Loaded configuration
   */
  static loadYaml (filename) {
    try {
      const content = this.loadFile(filename)
      return YAML.parse(content)
    } catch (err) {
      if (err instanceof errors.ConfigError) {
        throw err
      }

      throw new errors.ConfigParseError(`Failed to parse "${filename}" as YAML`)
    }
  }

  /**
   * Load configuration as JSON
   *
   * @param { string } filename       YAML filename
   * @return { object }               Loaded configuration
   */
  static loadJSON (filename) {
    try {
      const content = this.loadFile(filename)
      return JSON.parse(content)
    } catch (err) {
      if (err instanceof errors.ConfigError) {
        throw err
      }

      throw new errors.ConfigParseError(`Failed to parse "${filename}" as JSON`)
    }
  }

  /**
   * Load configuration as JS module
   *
   * @param { string } filename       JS filename
   * @return { object }               Loaded configuration
   */
  static loadJS (filename) {
    return require(filename)
  }

  /**
   * Load configuration
   * @param { string } filename       Filename
   * @param { boolean } graceful      When true will not throw errors
   * @return { ServerConfig }         This instance
   */
  loadFile (filename, graceful = false) {
    try {
      const ext = filename.split('.').pop()

      const loaders = {
        yml: 'loadYaml',
        yaml: 'loadYaml',
        json: 'loadJSON',
        js: 'loadJS'
      }

      const loader = loaders[ext]

      // If no loader could be deduced try heuristics and check all the available
      // paths for the first match
      if (!loader) {
        let match = false

        for (const suffix in loaders) {
          const heuristicPath = `${filename}.${suffix}`

          // No file found from here, skip
          if (!fs.existsSync(heuristicPath)) {
            continue
          }

          // File found, load it
          this.loadFile(heuristicPath, graceful)
          match = true
          break
        }

        // If no match was found, throw an error
        if (!match) {
          throw new errors.ConfigNotFoundError('Could not find a matching file with heuristics')
        }
      }

      // If loader could be deduced use it to load
      if (loader) {
        this.set(this.constructor[loader](filename))
      }

      return this
    } catch (err) {
      // Rethrow the error if graceful flag is down
      if (err instanceof errors.ConfigNotFoundError && graceful) {
        return this
      }

      throw err
    }
  }

  /**
   * Add a JSON schema to config validator. Use this to add any referenced
   * schemas and Config.setSchema for the main schema.
   *
   * @param { object } schema         JSON schema
   * @return { Config }               Self
   */
  addSchema (schema) {
    schema.$id = schema.$id || schema.id || `${__dirname}#/config`
    return super.addSchema(schema)
  }
}
