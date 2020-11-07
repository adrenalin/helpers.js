class ConfigError extends Error {}
class ConfigNotFoundError extends ConfigError {}
class ConfigParseError extends ConfigError {}

exports.ConfigError = ConfigError
exports.ConfigNotFoundError = ConfigNotFoundError
exports.ConfigParseError = ConfigParseError
