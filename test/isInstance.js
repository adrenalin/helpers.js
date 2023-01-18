const { expect } = require('chai')
const isInstance = require('../lib/isInstance')

describe('lib/isInstance', () => {
  class ExtendedObject extends Object {

  }

  class TestClass {}
  class TestSubClass extends TestClass {}

  it('should match string correctly', (done) => {
    expect(isInstance('foo', String)).to.equal(true)
    expect(isInstance('foo', 'string')).to.equal(true)

    expect(isInstance(null, String)).not.to.equal(true)
    expect(isInstance(null, String)).not.to.equal(true)

    expect(isInstance(1, String)).not.to.equal(true)
    expect(isInstance(1, String)).not.to.equal(true)

    expect(isInstance([], String)).not.to.equal(true)
    expect(isInstance([], String)).not.to.equal(true)

    expect(isInstance({}, String)).not.to.equal(true)
    expect(isInstance({}, String)).not.to.equal(true)

    expect(isInstance(Date, String)).not.to.equal(true)
    expect(isInstance(Date, String)).not.to.equal(true)

    done()
  })

  it('should match number correctly', (done) => {
    expect(isInstance(1, Number)).to.equal(true)
    expect(isInstance(1, 'number')).to.equal(true)

    expect(isInstance(null, Number)).not.to.equal(true)
    expect(isInstance(null, Number)).not.to.equal(true)

    expect(isInstance('1', Number)).not.to.equal(true)
    expect(isInstance('1', Number)).not.to.equal(true)

    expect(isInstance([], Number)).not.to.equal(true)
    expect(isInstance([], Number)).not.to.equal(true)

    expect(isInstance({}, Number)).not.to.equal(true)
    expect(isInstance({}, Number)).not.to.equal(true)

    expect(isInstance(Date, Number)).not.to.equal(true)
    expect(isInstance(Date, Number)).not.to.equal(true)

    done()
  })

  it('should match array correctly', (done) => {
    expect(isInstance([], Array)).to.equal(true)
    expect(isInstance([], 'array')).to.equal(true)

    expect(isInstance(null, Array)).not.to.equal(true)
    expect(isInstance(null, 'array')).not.to.equal(true)

    expect(isInstance('1', Array)).not.to.equal(true)
    expect(isInstance('1', 'array')).not.to.equal(true)

    expect(isInstance(1, Array)).not.to.equal(true)
    expect(isInstance(1, 'array')).not.to.equal(true)

    expect(isInstance({}, Array)).not.to.equal(true)
    expect(isInstance({}, 'array')).not.to.equal(true)

    expect(isInstance(Date, Array)).not.to.equal(true)
    expect(isInstance(Date, 'array')).not.to.equal(true)

    done()
  })

  it('should match object correctly', (done) => {
    expect(isInstance({}, Object)).to.equal(true)
    expect(isInstance({}, 'object')).to.equal(true)

    expect(isInstance(new ExtendedObject(), Object)).not.to.equal(true)
    expect(isInstance(new ExtendedObject(), 'object')).not.to.equal(true)

    expect(isInstance(new TestClass(), Object)).not.to.equal(true)
    expect(isInstance(new TestClass(), 'object')).not.to.equal(true)

    expect(isInstance(null, Object)).not.to.equal(true)
    expect(isInstance(null, 'object')).not.to.equal(true)

    expect(isInstance('1', Object)).not.to.equal(true)
    expect(isInstance('1', 'object')).not.to.equal(true)

    expect(isInstance(1, Object)).not.to.equal(true)
    expect(isInstance(1, 'object')).not.to.equal(true)

    expect(isInstance([], Object)).not.to.equal(true)
    expect(isInstance([], 'object')).not.to.equal(true)

    expect(isInstance(Date, Object)).not.to.equal(true)
    expect(isInstance(Date, 'object')).not.to.equal(true)

    done()
  })

  it('should match Date correctly', (done) => {
    expect(isInstance(new Date(), Date)).to.equal(true)
    expect(isInstance(new Date(), 'date')).to.equal(true)

    expect(isInstance(null, Date)).not.to.equal(true)
    expect(isInstance(null, 'date')).not.to.equal(true)

    expect(isInstance('1', Date)).not.to.equal(true)
    expect(isInstance('1', 'date')).not.to.equal(true)

    expect(isInstance(1, Date)).not.to.equal(true)
    expect(isInstance(1, 'date')).not.to.equal(true)

    expect(isInstance([], Date)).not.to.equal(true)
    expect(isInstance([], 'date')).not.to.equal(true)

    expect(isInstance({}, Date)).not.to.equal(true)
    expect(isInstance({}, 'date')).not.to.equal(true)
    done()
  })

  it('should match to an array of types', (done) => {
    expect(isInstance('foo', [String, Number])).to.equal(true)
    expect(isInstance('foo', ['string', 'number'])).to.equal(true)

    expect(isInstance('foo', ['number', 'array'])).not.to.equal(true)
    expect(isInstance('foo', [Number, Array])).not.to.equal(true)

    done()
  })

  it('should match custom classes', (done) => {
    expect(isInstance(new TestClass(), TestClass)).to.equal(true)
    expect(isInstance(new TestSubClass(), TestClass)).to.equal(true)
    done()
  })

  it('should match loosely', (done) => {
    expect(isInstance(null, Object, true)).to.equal(true)
    expect(isInstance(null, 'object', true)).to.equal(true)

    // expect(isInstance(new ExtendedObject(), Object), true).to.equal(true)
    // expect(isInstance(new ExtendedObject(), 'object'), true).to.equal(true)

    expect(isInstance(new Date(), Object, true)).to.equal(true)
    expect(isInstance(new Date(), 'object', true)).to.equal(true)

    expect(isInstance([], Object, true)).not.to.equal(true)
    expect(isInstance([], 'object', true)).not.to.equal(true)

    expect(isInstance('string', Object, true)).not.to.equal(true)
    expect(isInstance('string', 'object', true)).not.to.equal(true)

    done()
  })
})
