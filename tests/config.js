const expect = require('expect.js')
const ConfigFile = require('../config')

const Config = ConfigFile.default

describe('config', () => {
  it('should exist the default for config', (done) => {
    expect(ConfigFile).to.have.property('default')
    done()
  })

  it('should have an initialized config', (done) => {
    expect(ConfigFile).to.have.property('config')
    expect(ConfigFile.config).to.be.a(Config)
    done()
  })

  it('should have a singleton config instance', (done) => {
    const Config2 = require('../config')
    expect(Config2.config).to.be(ConfigFile.config)
    done()
  })

  it('should have methods "set" and "get"', (done) => {
    const config = new Config()
    expect(config).to.have.property('set')
    expect(config).to.have.property('get')
    done()
  })

  it('should store a set value to a shallow path', (done) => {
    const testPath = 'set-value-shallow-path'
    const testValue = 'set-value-shallow-path-value'

    const config = new Config()
    expect(config.values[testPath]).not.to.be(testValue)
    config.set(testPath, testValue)
    expect(config.values[testPath]).to.be(testValue)
    done()
  })

  it('should store a get value to a shallow path', (done) => {
    const testPath = 'get-value-shallow-path'
    const testValue = 'get-value-shallow-path-value'

    const config = new Config()
    expect(config.get(testPath)).not.to.be(testValue)
    config.set(testPath, testValue)
    expect(config.get(testPath)).to.be(testValue)
    done()
  })

  it('should store a set value to a deep path with an array key', (done) => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.values[testPath[0]][testPath[1]]).to.be(testValue)
    done()
  })

  it('should store a set value to a deep path with a string key', (done) => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath.join('.'), testValue)

    expect(config.values[testPath[0]][testPath[1]]).to.be(testValue)
    done()
  })

  it('should get a deep value with an array key', (done) => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.get(testPath)).to.be(testValue)
    done()
  })

  it('should get a deep value with a string key', (done) => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.get(testPath.join('.'))).to.be(testValue)
    done()
  })

  it('should get the default when key does not exist', (done) => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const defaultValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.get(testPath.join('.'))).to.eql(null)
    expect(config.get(testPath.join('.'), defaultValue)).to.be(defaultValue)
    done()
  })

  it('should throw an error when using invalid key', (done) => {
    const testPath = [
      ['deep-path-set-as-array'],
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.set).withArgs(testPath, testValue).to.throwException()
    done()
  })

  it('should return a copy of the storage object', (done) => {
    const testPath = 'copy-of-the-storage-object'
    const testValue = {
      storage: {
        key: 'value'
      }
    }

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.get(testPath)).not.to.be(config.values[testPath])
    expect(config.get(testPath)).to.eql(config.values[testPath])
    expect(config.get(testPath)).to.eql(testValue)
    done()
  })

  it('should set to root when path is an object and value is not set', (done) => {
    const testValue = {
      storage: {
        key: 'value'
      }
    }

    const config = new Config()
    expect(config.get('storage')).to.eql(null)

    config.set(testValue)
    expect(config.get('storage')).to.eql(testValue.storage)
    done()
  })

  it('should return full configuration if path is not defined', (done) => {
    const testValue = {
      storage: {
        key: 'value'
      }
    }

    const config = new Config()
    expect(config.get('storage')).to.eql(null)

    config.set(testValue)
    expect(config.get()).to.eql(testValue)
    done()
  })

  // it('should return full configuration when there are no arguments', (done) => {
  //   const testPath = 'copy-of-the-storage-object'
  //   const testValue = {
  //     storage: {
  //       key: 'value'
  //     }
  //   }
  //
  //   const config = new Config()
  //   expect(config.values).not.to.have.property(testPath[0])
  //   config.set(testPath, testValue)
  //
  //   expect(config.get(testPath)).not.to.be(config.values[testPath])
  //   expect(config.get(testPath)).to.eql(config.values[testPath])
  //   expect(config.get(testPath)).to.eql(testValue)
  //   done()
  // })
})
