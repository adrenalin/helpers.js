const Moment = require('moment')
const { ArgumentError, InvalidArgument } = require('@vapaaradikaali/errors')
const { expect } = require('chai')
const { Storage } = require('../../')
Moment.suppressDeprecationWarnings = true

class StorageEngine {
  constructor () {
    this.stored = {}
  }

  setItem (key, value) {
    this.stored[key] = value.toString()
  }

  getItem (key) {
    return this.stored[key]
  }

  removeItem (key) {
    delete this.stored[key]
  }

  clear () {
    for (const key in this.stored) {
      delete this.stored[key]
    }
  }
}

describe('lib/Storage', () => {
  it('should accept localStorage emulator as the engine', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    expect(storage.engine).to.be.an.instanceof(StorageEngine)
  })

  it('should accept only a string as the key for set', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    expect(() => storage.set(['foo'], 'bar')).to.throw(ArgumentError)
  })

  it('should set a value', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']

    storage.set(testKey, testValue)
    expect(storage.engine.stored[testKey]).to.eql(JSON.stringify({ value: testValue }))
  })

  it('should get a set key', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']

    storage.set(testKey, testValue)
    expect(storage.get(testKey)).to.eql(testValue)
  })

  it('should return the given default value if value is not set', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

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
    const engine = new StorageEngine()
    const storage = new Storage(engine)

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
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue, -10)
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should delete a storage key', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue)
    storage.del(testKey)
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })

  it('should clear all storage keys', () => {
    const engine = new StorageEngine()
    const storage = new Storage(engine)

    const testKey = 'test-key'
    const testValue = ['foo', 'bar']
    const defaultValue = ['foo-default', 'bar-default']

    storage.set(testKey, testValue)
    storage.clear()
    expect(storage.get(testKey)).to.eql(undefined)
    expect(storage.get(testKey, defaultValue)).to.eql(defaultValue)
  })
})