const fs = require('fs')
const Config = require('./Config').default
const YAML = require('yaml')
const typecastString = require('./typecastString')

class ServerConfig extends Config {
  /**
   * Get configuration value
   *
   * @param { mixed } path            Array or string
   * @param { mixed } defaultValue    Default value if the stored is null or undefined
   */
  get (path, defaultValue = null) {
    path = this.constructor.getPath(path)

    if (!path.length) {
      return super.get()
    }

    const envPath = path.join('_').toUpperCase()

    if (process.env[envPath] != null) {
      return typecastString(process.env[envPath])
    }

    return super.get(path, defaultValue)
  }

  /**
   * Load File
   *
   * @param { string } filename       Filename to load
   * @return { string }               File contents
   */
  static loadFile (filename) {
    return fs.readFileSync(filename, 'utf-8')
  }

  /**
   * Load configuration as YAML
   *
   * @param { string } filename       YAML filename
   * @return { object }               Loaded configuration
   */
  static loadYaml (filename) {
    return YAML.parse(this.loadFile(filename))
  }

  /**
   * Load configuration as JSON
   *
   * @param { string } filename       YAML filename
   * @return { object }               Loaded configuration
   */
  static loadJSON (filename) {
    return JSON.parse(this.loadFile(filename))
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
          throw new Error('Could not find a matching file with heuristics')
        }
      }

      // If loader could be deduced use it to load
      if (loader) {
        this.set(this.constructor[loader](filename))
      }
    } catch (err) {
      // Rethrow the error if graceful flag is down
      if (!graceful) {
        throw err
      }
    }

    return config
  }
}

const config = new ServerConfig()

exports.default = ServerConfig
exports.config = config
