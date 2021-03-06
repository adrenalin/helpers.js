const expect = require('expect.js')
const Config = require('../../lib/Config')

describe('lib/Config:client', () => {
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

  it('should get the first match with an array of paths', (done) => {
    const values = {
      array: ['array'],
      null: null,
      undefined: undefined
    }

    const paths = [
      'undefined',
      'null',
      'array'
    ]

    const config = new Config()
    config.set(values)
    expect(config.get(paths)).to.eql(values.array)
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
    const testValue1 = {
      storage: {
        key1: 'value1'
      }
    }

    const testValue2 = {
      storage: {
        key2: 'value2'
      }
    }

    const config = new Config()
    expect(config.get('storage')).to.eql(null)

    config.set(testValue1)
    config.set(testValue2)

    expect(config.get('storage.key1')).to.eql(testValue1.storage.key1)
    expect(config.get('storage.key2')).to.eql(testValue2.storage.key2)
    done()
  })

  it('should return full configuration when no argument was given', (done) => {
    const values = {
      foo: {
        bar: 'value'
      },
      foo2: 'bar2'
    }

    const config = new Config()
    config.set(values)
    expect(config.get()).to.eql(values)
    done()
  })

  it('should keep the previously set values after setting to a different path', (done) => {
    const path1 = 'foo.bar'
    const value1 = 'foo-bar'
    const path2 = 'foo.foo'
    const value2 = 'foo-foo'

    const config = new Config()
    config.set(path1, value1)
    expect(config.get(path1)).to.be(value1)

    config.set(path2, value2)
    expect(config.get(path1)).to.be(value1)
    expect(config.get(path2)).to.be(value2)

    done()
  })

  it('should throw an error when using an object as a path', (done) => {
    const config = new Config()
    expect(config.get).withArgs({ foo: 'bar' }).to.throwException()
    done()
  })

  it('should return self when setting a value', (done) => {
    const config = new Config()
    expect(config.set()).to.be(config)
    done()
  })
})
