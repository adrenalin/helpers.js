const path = require('path')
const { expect } = require('chai')
const Config = require('../../lib/Config')
const ServerConfig = require('../../lib/ServerConfig')
const { Server } = require('http')

describe('lib/ServerConfig', () => {
  const argv = process.argv

  afterEach(() => {
    process.argv = argv
  })

  it('should be a subclass of Config', () => {
    const config = new ServerConfig()
    expect(config).to.be.an.instanceof(Config)
  })

  it('should return full configuration when no arguments given to get', () => {
    const config = new ServerConfig()
    expect(config.get()).to.eql(config.values)
  })

  it('should return environment variable if one has been defined', () => {
    const testValue = 'test-value'
    process.env.CONFIG_TEST = testValue

    const config = new ServerConfig()
    expect(config.get('config.test')).to.equal(testValue)
  })

  it('should return test value', () => {
    const values = {
      test: 'serverTestValue'
    }

    const config = new ServerConfig()
    config.set(values)
    expect(config.get('test')).to.eql(values.test)
  })

  it('should return prefixed environment variables', () => {
    const testValue = 'prefixed-test-value'
    process.env.PREFIXED_CONFIG_TEST = testValue

    const config = new ServerConfig()
    config.setEnvPrefix('prefixed')
    expect(config.get('config.test')).to.equal(testValue)
  })

  it('should return command line arguments', () => {
    process.argv = [
      '--config-args=bar',
      '--config-array=1',
      '--config-array=2',
      '--config-true',
      '--no-config-false'
    ]

    const config = new ServerConfig()
    expect(config.get('config.args')).to.eql('bar')
    expect(config.get('config.array')).to.eql([1, 2])
    expect(config.get('config.true')).to.eql(true)
    expect(config.get('config.false')).to.eql(false)
  })

  it('should set the schema id by "id" when "$id" omitted', () => {
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
  })

  it('should set the schema id by dirname when "$id" omitted', () => {
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
  })
})
