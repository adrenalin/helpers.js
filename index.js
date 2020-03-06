exports.buildUrl = require('./lib/buildUrl')
exports.castObjectAsArray = require('./lib/castObjectAsArray')
exports.getClassName = require('./lib/getClassName')
exports.getRandomString = require('./lib/getRandomString')
exports.getValue = require('./lib/getValue')
exports.httpBuildQuery = require('./lib/httpBuildQuery')
exports.intersection = require('./lib/intersection')
exports.isInstance = require('./lib/isInstance')
exports.isObject = require('./lib/isObject')
exports.merge = require('./lib/merge')
exports.modifyUrl = require('./lib/modifyUrl')
exports.parseQueryString = require('./lib/parseQueryString')
exports.removeFromArray = require('./lib/removeFromArray')
exports.serializer = require('./lib/serializer')
exports.splitStringIntoChunks = require('./lib/splitStringIntoChunks')
exports.strPad = require('./lib/strPad')
exports.trim = require('./lib/trim')
exports.typecastString = require('./lib/typecastString')
exports.unique = require('./lib/unique')

const isClient = typeof window === 'undefined'

exports.config = require(isClient ? './lib/ServerConfig' : './lib/Config').config
exports.Config = require(isClient ? './lib/ServerConfig' : './lib/Config').default

exports.Localization = require('./lib/Localization')
