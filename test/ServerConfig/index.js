const path = require('path')
const { expect } = require('chai')
const Config = require('../../lib/Config')
const ServerConfig = require('../../lib/ServerConfig')

describe('lib/ServerConfig', () => {
  it('should be a subclass of Config', (done) => {
    const config = new ServerConfig()
    expect(config).to.be.an.instanceof(Config)
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
    expect(config.get('config.test')).to.equal(testValue)
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

  it('should return prefixed environment variables', (done) => {
    const testValue = 'prefixed-test-value'
    process.env.PREFIXED_CONFIG_TEST = testValue

    const config = new ServerConfig()
    config.setEnvPrefix('prefixed')
    expect(config.get('config.test')).to.equal(testValue)
    done()
  })

  it('should set the schema id by "id" when "$id" omitted', (done) => {
    const config = new ServerConfig()
    config.setSchema({
      id: '#/no-dollar-sign',
      properties: {
        testKey: {
          type: 'string'
        }
      }
    })

    expect(Object.keys(config.getValidator().schemas)).to.contain('#/no-dollar-sign')
    done()
  })

  it('should set the schema id by dirname when "$id" omitted', (done) => {
    const libDir = path.join(__dirname, '..', '..', 'lib')
    const config = new ServerConfig()
    config.setSchema({
      properties: {
        testKey: {
          type: 'string'
        }
      }
    })

    expect(Object.keys(config.getValidator().schemas)).to.contain(`${libDir}#/config`)
    done()
  })
})
