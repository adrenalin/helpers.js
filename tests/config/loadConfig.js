const path = require('path')
const expect = require('expect.js')
const ServerConfig = require('../../lib/ServerConfig')

describe('config:loadConfig', () => {
  it('should be able to load a configuration file as YAML', (done) => {
    const values = ServerConfig.loadYaml(path.join(__dirname, 'files', 'config.yml'))

    expect(values).to.have.property('yaml')
    expect(values.yaml).to.have.property('values')
    expect(values.yaml.values).to.have.property('foo')
    expect(values.yaml.values).to.have.property('bar')

    expect(values.yaml.values.foo).to.be(1)
    expect(values.yaml.values.bar).to.be(2)

    done()
  })

  it('should be fail to load a JSON configuration file as YAML', (done) => {
    expect(ServerConfig.loadYaml).withArgs(path.join(__dirname, 'files', 'config.json')).to.throwError()
    done()
  })

  it('should be able to load a configuration file as JSON', (done) => {
    const values = ServerConfig.loadJSON(path.join(__dirname, 'files', 'config.json'))

    expect(values).to.have.property('json')
    expect(values.json).to.have.property('values')
    expect(values.json.values).to.have.property('foo')
    expect(values.json.values).to.have.property('bar')

    expect(values.json.values.foo).to.be(1)
    expect(values.json.values.bar).to.be(2)

    done()
  })

  it('should be fail to load a YAML configuration file as JSON', (done) => {
    expect(ServerConfig.loadJSON).withArgs(path.join(__dirname, 'files', 'config.yml')).to.throwError()
    done()
  })

  it('should be able to load a configuration file as JS', (done) => {
    const values = ServerConfig.loadJS(path.join(__dirname, 'files', 'config.js'))

    expect(values).to.have.property('js')
    expect(values.js).to.have.property('values')
    expect(values.js.values).to.have.property('foo')
    expect(values.js.values).to.have.property('bar')

    expect(values.js.values.foo).to.be(1)
    expect(values.js.values.bar).to.be(2)

    done()
  })

  it('should be fail to load a YAML configuration file as JS', (done) => {
    expect(ServerConfig.loadJS).withArgs(path.join(__dirname, 'files', 'config.yml')).to.throwError()
    done()
  })

  it('should use heuristics to load configuration from YAML', (done) => {
    const config = new ServerConfig()
    config.loadFile(path.join(__dirname, 'files', 'config.yml'))

    expect(config.get('yaml.values.foo')).to.be(1)
    expect(config.get('yaml.values.bar')).to.be(2)
    done()
  })

  it('should use heuristics to load configuration from JSON', (done) => {
    const config = new ServerConfig()
    const rval = config.loadFile(path.join(__dirname, 'files', 'config.json'))

    expect(rval).to.be(config)
    expect(config.get('json.values.foo')).to.be(1)
    expect(config.get('json.values.bar')).to.be(2)
    done()
  })

  it('should use heuristics to load configuration from JS', (done) => {
    const config = new ServerConfig()
    config.loadFile(path.join(__dirname, 'files', 'config.js'))

    expect(config.get('js.values.foo')).to.be(1)
    expect(config.get('js.values.bar')).to.be(2)
    done()
  })

  it('should throw an error when not using graceful loader', (done) => {
    const config = new ServerConfig()

    try {
      config.loadFile('foobar.json')
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should not throw an error when using graceful loader', (done) => {
    const config = new ServerConfig()

    config.loadFile('foobar.json', true)
    done()
  })

  it('should use heuristics to determine the loader when no extension provided', (done) => {
    const config = new ServerConfig()

    config.loadFile(path.join(__dirname, 'files', 'defaults'))

    expect(config.get('defaults.values.foo')).to.be(1)
    expect(config.get('defaults.values.bar')).to.be(2)
    done()
  })

  it('should throw an error when heuristics fails', (done) => {
    const config = new ServerConfig()

    try {
      config.loadFile(path.join(__dirname, 'files', 'undefined'))
      done(new Error('Should have thrown an error'))
    } catch (err) {
      done()
    }
  })

  it('should not throw an error when heuristics fails and graceful flag is on', (done) => {
    const config = new ServerConfig()

    try {
      config.loadFile(path.join(__dirname, 'files', 'undefined'), true)
      done()
    } catch (err) {
      done(err)
    }
  })
})
