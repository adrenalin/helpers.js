const { expect } = require('chai')
const { Config } = require('../../')

describe('lib/Config:client', () => {
  it('should have errors properties', () => {
    expect(Config).to.have.property('errors')

    const config = new Config()
    expect(config.errors).to.equal(Config.errors)
  })

  it('should have methods "set" and "get"', () => {
    const config = new Config()
    expect(config).to.have.property('set')
    expect(config).to.have.property('get')
  })

  it('should store a set value to a shallow path', () => {
    const testPath = 'set-value-shallow-path'
    const testValue = 'set-value-shallow-path-value'

    const config = new Config()
    expect(config.values[testPath]).not.to.equal(testValue)
    config.set(testPath, testValue)
    expect(config.values[testPath]).to.equal(testValue)
  })

  it('should store a get value to a shallow path', () => {
    const testPath = 'get-value-shallow-path'
    const testValue = 'get-value-shallow-path-value'

    const config = new Config()
    expect(config.get(testPath)).not.to.equal(testValue)
    config.set(testPath, testValue)
    expect(config.get(testPath)).to.equal(testValue)
  })

  it('should store a set value to a deep path with an array key', () => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.values[testPath[0]][testPath[1]]).to.equal(testValue)
  })

  it('should store a set value to a deep path with a string key', () => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath.join('.'), testValue)

    expect(config.values[testPath[0]][testPath[1]]).to.equal(testValue)
  })

  it('should get a deep value with a string key', () => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const testValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.get(testPath.join('.'))).to.equal(testValue)
  })

  it('should get the default when key does not exist', () => {
    const testPath = [
      'deep-path-set-as-array',
      'path'
    ]

    const defaultValue = 'deep-path-set.path.to.value'

    const config = new Config()
    expect(config.get(testPath.join('.'))).to.eql(null)
    expect(config.get(testPath.join('.'), defaultValue)).to.equal(defaultValue)
  })

  it('should get the first match with an array of paths', () => {
    const values = {
      array: ['array'],
      null: null,
      undefined: undefined // eslint-disable-line object-shorthand
    }

    const paths = [
      'undefined',
      'null',
      'array'
    ]

    const config = new Config()
    config.set(values)
    expect(config.get(paths)).to.eql(values.array)
  })

  it('should return a copy of the storage object', () => {
    const testPath = 'copy-of-the-storage-object'
    const testValue = {
      storage: {
        key: 'value'
      }
    }

    const config = new Config()
    expect(config.values).not.to.have.property(testPath[0])
    config.set(testPath, testValue)

    expect(config.get(testPath)).not.to.equal(config.values[testPath])
    expect(config.get(testPath)).to.eql(config.values[testPath])
    expect(config.get(testPath)).to.eql(testValue)
  })

  it('should set to root when path is an object and value is not set', () => {
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
  })

  it('should return full configuration when no argument was given', () => {
    const values = {
      foo: {
        bar: 'value'
      },
      foo2: 'bar2'
    }

    const config = new Config()
    config.set(values)
    expect(config.get()).to.eql(values)
  })

  it('should keep the previously set values after setting to a different path', () => {
    const path1 = 'foo.bar'
    const value1 = 'foo-bar'
    const path2 = 'foo.foo'
    const value2 = 'foo-foo'

    const config = new Config()
    config.set(path1, value1)
    expect(config.get(path1)).to.equal(value1)

    config.set(path2, value2)
    expect(config.get(path1)).to.equal(value1)
    expect(config.get(path2)).to.equal(value2)
  })

  it('should throw an error when using an object as a path', () => {
    const config = new Config()
    expect(() => config.get({ foo: 'bar' })).to.throw()
  })

  it('should return self when setting a value', () => {
    const config = new Config()
    expect(config.set()).to.equal(config)
  })

  it('should accept values from the constructor', () => {
    const values = {
      foo: 'bar'
    }

    const config = new Config(values)
    expect(config.values).to.eql(values)
  })

  it('should have a method to delete config keys', () => {
    const testKey = 'delete'
    const testValue = 'not-deleted'

    const config = new Config()
    config.set(testKey, testValue)
    expect(config.get(testKey)).to.eql(testValue)

    config.del(testKey)
    expect(config.get(testKey)).to.eql(null)
    expect(config.values).not.to.have.property(testKey)
  })

  it('should merge objects', () => {
    const config = new Config()
    config.set({ obj: { deep: { key1: 'foo' } } })
    config.set({ obj: { deep: { key2: 'bar' } } })

    expect(config.get('obj.deep')).to.eql({ key1: 'foo', key2: 'bar' })
  })
})
