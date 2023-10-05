const Moment = require('moment')
const { ArgumentError, InvalidArgument } = require('@vapaaradikaali/errors')
const { expect } = require('chai')
const { Storage } = require('../../')

Moment.suppressDeprecationWarnings = true

describe('lib/Storage', () => {
  it('should create a memory based storage by default', () => {
    const storage = new Storage()
    expect(storage.engine).to.be.an.instanceof(Storage.StorageEngine)
  })

  it('should accept a custom storage engine', () => {
    class CustomStorageEngine extends Storage.StorageEngine {}

    const engine = new CustomStorageEngine()
    const storage = new Storage(engine)
    expect(storage.engine).to.be.an.instanceof(CustomStorageEngine)
  })

  it('should allow setting the engine', () => {
    class CustomStorageEngine extends Storage.StorageEngine {}

    const engine = new CustomStorageEngine()
    const storage = new Storage()
    storage.setEngine(engine)
    expect(storage.engine).to.be.an.instanceof(CustomStorageEngine)
  })

  it('should accept only a string as the key for set', () => {
    const storage = new Storage()

    expect(() => storage.set(['foo'], 'bar')).to.throw(ArgumentError)
  })

  it('should set a value', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']

    storage.set(testKey, testValue)
    expect(storage.engine.stored[testKey]).to.eql(JSON.stringify({ value: testValue }))
  })

  it('should get a set key', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']

    storage.set(testKey, testValue)
    expect(storage.get(testKey)).to.eql(testValue)
  })

  it('should return the given default value if value is not set', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const defaultValue = ['foo-default', 'bar-default']

    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should get expiration timestamps', () => {
    const now = new Moment()
    const h1 = new Moment(now).add(1, 'hour').toISOString()

    expect(new Moment(Storage.getExpiresAt(10)).diff(now, 'seconds')).to.eql(10)
    expect(new Moment(Storage.getExpiresAt('PT20S')).diff(now, 'seconds')).to.eql(20)
    expect(new Moment(Storage.getExpiresAt(h1)).diff(now, 'seconds')).to.eql(3600)

    expect(() => Storage.getExpiresAt('foo')).to.throw(InvalidArgument)
  })

  it('should set expiration time to the stored value', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']

    const now = new Moment()
    storage.set(testKey, testValue, 10)
    expect(storage.get(testKey)).to.eql(testValue)

    const stored = JSON.parse(storage.engine.stored[testKey])

    expect(stored).to.have.property('expiresAt')

    const m = new Moment(stored.expiresAt)
    expect(m.diff(now, 'seconds')).to.eql(10)
  })

  it('should return the default value if stored value has expired', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue, -10)
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should delete a storage key', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue)
    storage.del(testKey)
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should clear all storage keys', () => {
    const storage = new Storage()

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue)
    storage.clear()
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should allow setting prefix', () => {
    const stored = {}

    class CustomStorageEngine extends Storage.StorageEngine {
      constructor () {
        // Singleton stored
        super()
        this.stored = stored
      }
    }

    const s1 = new Storage(new CustomStorageEngine(), 'foo')
    const s2 = new Storage(new CustomStorageEngine(), 'foo')

    const testKey = 'test-storage-engine-prefix-key'
    const testValue = 'test-storage-engine-prefix-value'

    s1.set(testKey, testValue)

    expect(s2.get(testKey)).to.eql(testValue)
    expect(stored[`foo:${testKey}`]).to.eql(JSON.stringify({ value: testValue }))
  })
})
