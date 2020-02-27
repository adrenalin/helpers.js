const isObject = require('./isObject')
const modifyUrl = require('./modifyUrl')
/**
 * Build URL from the given parameters
 *
 * @param { mixed } protocol          Protocol or full configuration
 * @param { string } host             Host name
 * @param { number } port             Port
 * @param { string } username         Username
 * @param { string } password         Password
 * @param { string } location         Location
 * @param { object } query            Query parameters
 * @return { string }                 Constructed URL
 */
module.exports = function buildUrl (protocol, host, port, username, password, location, query) {
  if (isObject(protocol)) {
    return buildUrl(
      protocol.protocol,
      protocol.host,
      protocol.port,
      protocol.username,
      protocol.password,
      protocol.location,
      protocol.query || {}
    )
  }

  const params = {
    protocol: protocol,
    host: host,
    port: port,
    username: username,
    password: password,
    location: location,
    query: query || {}
  }

  if (typeof params.location === 'string') {
    const regs = params.location.match(/^(.+?):\/\/((.*):?(.*)@)?(.+?)(:([0-9]+))?(\/.*|$)/) || []

    const keys = [
      'protocol',
      '',
      'username',
      'password',
      'host',
      '',
      'port',
      'location'
    ]

    keys.map((key, i) => {
      const n = i + 1
      if (!key || !regs[n]) {
        return
      }

      // Allow setting to null/parsed anything but location, which uses always regex match
      const paramValue = params[key] !== undefined ? params[key] : regs[n]
      params[key] = key !== 'location' ? paramValue : regs[n]
    })
  }

  if (typeof params.host !== 'string' || !params.host) {
    throw new Error('Argument for host required')
  }

  const specialPorts = {
    80: 'http',
    443: 'https'
  }

  // Convert special protocols on the go
  if (specialPorts[params.port]) {
    params.protocol = specialPorts[params.port]
    params.port = null
  }

  if (typeof params.protocol !== 'string' || !params.protocol) {
    throw new Error('Argument for protocol required')
  }

  const parts = [
    params.protocol,
    '://'
  ]

  if (params.username) {
    parts.push(encodeURIComponent(params.username))

    if (params.password) {
      parts.push(':')
      parts.push(encodeURIComponent(params.password))
    }

    parts.push('@')
  }

  parts.push(params.host)

  if (params.port) {
    parts.push(':')
    parts.push(params.port)
  }

  if (params.location) {
    parts.push('/')
    parts.push(params.location.replace(/^\//, ''))
  }

  return modifyUrl(parts.join(''), query)
}
