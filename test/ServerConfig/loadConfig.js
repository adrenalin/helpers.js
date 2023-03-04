const path = require('path')
const { expect } = require('chai')
const errors = require('../../lib/errors')
const ServerConfig = require('../../lib/ServerConfig')

describe('lib/ServerConfig:loadConfig', () => {
  it('should be able to load a configuration file as YAML', () => {
    const values = ServerConfig.loadYaml(path.join(__dirname, 'files', 'config.yml'))

    expect(values).to.have.property('yaml')
    expect(values.yaml).to.have.property('values')
    expect(values.yaml.values).to.have.property('foo')
    expect(values.yaml.values).to.have.property('bar')

    expect(values.yaml.values.foo).to.equal(1)
    expect(values.yaml.values.bar).to.equal(2)
  })

  it('should be able to load a configuration file as JSON', () => {
    const values = ServerConfig.loadJSON(path.join(__dirname, 'files', 'config.json'))

    expect(values).to.have.property('json')
    expect(values.json).to.have.property('values')
    expect(values.json.values).to.have.property('foo')
    expect(values.json.values).to.have.property('bar')

    expect(values.json.values.foo).to.equal(1)
    expect(values.json.values.bar).to.equal(2)
  })

  it('should be fail to load a YAML configuration file as JSON', () => {
    expect(() => ServerConfig.loadJSON(path.join(__dirname, 'files', 'config.yml'))).to.throw()
  })

  it('should be able to load a configuration file as JS', () => {
    const values = ServerConfig.loadJS(path.join(__dirname, 'files', 'config.js'))

    expect(values).to.have.property('js')
    expect(values.js).to.have.property('values')
    expect(values.js.values).to.have.property('foo')
    expect(values.js.values).to.have.property('bar')

    expect(values.js.values.foo).to.equal(1)
    expect(values.js.values.bar).to.equal(2)
  })

  it('should be fail to load a YAML configuration file as JS', () => {
    expect(() => ServerConfig.loadJS(path.join(__dirname, 'files', 'config.yml'))).to.throw()
  })

  it('should use heuristics to load configuration from YAML', () => {
    const config = new ServerConfig()
    config.loadFile(path.join(__dirname, 'files', 'config.yml'))

    expect(config.get('yaml.values.foo')).to.equal(1)
    expect(config.get('yaml.values.bar')).to.equal(2)
  })

  it('should use heuristics to load configuration from JSON', () => {
    const config = new ServerConfig()
    const rval = config.loadFile(path.join(__dirname, 'files', 'config.json'))

    expect(rval).to.equal(config)
    expect(config.get('json.values.foo')).to.equal(1)
    expect(config.get('json.values.bar')).to.equal(2)
  })

  it('should use heuristics to load configuration from JS', () => {
    const config = new ServerConfig()
    config.loadFile(path.join(__dirname, 'files', 'config.js'))

    expect(config.get('js.values.foo')).to.equal(1)
    expect(config.get('js.values.bar')).to.equal(2)
  })

  it('should throw an error when not using graceful loader', () => {
    try {
      const config = new ServerConfig()
      config.loadFile('foobar.json')
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(errors.ConfigNotFoundError)
    }
  })

  it('should not throw an error when using graceful loader for JSON', () => {
    const config = new ServerConfig()

    config.loadFile('foobar.json', true)
  })

  it('should not throw an error when using graceful loader for YAML', () => {
    const config = new ServerConfig()

    config.loadFile('foobar.yaml', true)
  })

  it('should use heuristics to determine the loader when no extension provided', () => {
    const config = new ServerConfig()

    config.loadFile(path.join(__dirname, 'files', 'defaults'))

    expect(config.get('defaults.values.foo')).to.equal(1)
    expect(config.get('defaults.values.bar')).to.equal(2)
  })

  it('should throw an error when heuristics fails', () => {
    try {
      const config = new ServerConfig()
      config.loadFile(path.join(__dirname, 'files', 'undefined'))
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(errors.ConfigNotFoundError)
    }
  })

  it('should not throw an error when heuristics fails and graceful flag is on', () => {
    const config = new ServerConfig()
    config.loadFile(path.join(__dirname, 'files', 'undefined'), true)
  })

  it('should throw an error when parsing JSON content fails even with graceful flag', () => {
    try {
      const config = new ServerConfig()
      config.loadFile(path.join(__dirname, 'files', 'broken.json'), true)
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(errors.ConfigParseError)
    }
  })

  it('should throw an error when parsing YAML content fails even with graceful flag', () => {
    try {
      const config = new ServerConfig()
      config.loadFile(path.join(__dirname, 'files', 'broken.yaml'), true)
      throw new Error('Should have thrown an error')
    } catch (err) {
      expect(err).to.be.an.instanceof(errors.ConfigParseError)
    }
  })
})
