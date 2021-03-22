const expect = require('expect.js')
const Config = require('../../lib/Config')
const ServerConfig = require('../../lib/ServerConfig')

describe('lib/ServerConfig', () => {
  it('should be a subclass of Config', (done) => {
    const config = new ServerConfig()
    expect(config).to.be.a(Config)
    done()
  })

  it('should return full configuration when no arguments given to get', (done) => {
    const config = new ServerConfig()
    expect(config.get()).to.eql(config.values)
    done()
  })

  it('should return environment variable if one has been defined', (done) => {
    const testValue = 'test-value'
    process.env.CONFIG_TEST = testValue

    const config = new ServerConfig()
    expect(config.get('config.test')).to.be(testValue)
    done()
  })

  it('should return test value', (done) => {
    const values = {
      test: 'serverTestValue'
    }

    const config = new ServerConfig()
    config.set(values)
    expect(config.get('test')).to.eql(values.test)
    done()
  })
})
