const Config = require('./Config').default
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
}

const config = new ServerConfig()

exports.default = ServerConfig
exports.config = config
