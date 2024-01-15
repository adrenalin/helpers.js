/**
 * @module Errors
 */

/**
 * Config error
 *
 * @class ConfigError
 */
class ConfigError extends Error {}

/**
 * Config not found error
 *
 * @class ConfigNotFoundError
 * @extends ConfigError
 */
class ConfigNotFoundError extends ConfigError {}

/**
 * Config parse error
 *
 * @class ConfigParseError
 * @extends ConfigError
 */
class ConfigParseError extends ConfigError {}

exports.ConfigError = ConfigError
exports.ConfigNotFoundError = ConfigNotFoundError
exports.ConfigParseError = ConfigParseError
