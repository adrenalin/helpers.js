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

  it('should use environment variables of child nodes when fetching the parent', () => {
    const testValue = 'test-value-1'
    const testValueOverride = 'test-value-1-override-env'

    const values = {
      test: {
        value1: testValue,
        value2: 'test-value-2'
      }
    }

    process.env.TEST_VALUE1 = testValueOverride
    process.env.TEST_VALUE3 = testValueOverride

    const config = new ServerConfig()
    config.set(values)
    expect(config.get('test')).to.eql({
      value1: testValueOverride,
      value2: values.test.value2
    })
  })

  it('should use argument variables of child nodes when fetching the parent', () => {
    const testValue = 'test-value-1'
    const testValueOverride = 'test-value-1-override-args'

    const values = {
      test: {
        value1: testValue,
        value2: 'test-value-2'
      }
    }

    process.argv = [
      `--test-value1=${testValueOverride}`
    ]

    const config = new ServerConfig()
    config.set(values)
    expect(config.get('test')).to.eql({
      value1: testValueOverride,
      value2: values.test.value2
    })
  })

  it('should return environment variables and arguments when they are defined in the schema', () => {
    const argValue = 'arg-value'
    const envValue = 'env-value'
    const defaultValue = 'default-value'

    process.argv = [
      `--testkey-argvalue=${argValue}`
    ]

    process.env.TESTKEY_ENVVALUE = envValue

    const config = new ServerConfig()
    config.setSchema({
      $id: '#/config',
      type: 'object',
      properties: {
        testKey: {
          type: 'object',
          properties: {
            argValue: {
              type: 'string'
            },
            envValue: {
              type: 'string'
            },
            noValue: {
              type: 'string'
            },
            defaultValue: {
              type: 'string',
              default: defaultValue
            }
          }
        }
      }
    })

    expect(config.get()).to.eql({
      testKey: {
        argValue,
        envValue,
        defaultValue
      }
    })
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
