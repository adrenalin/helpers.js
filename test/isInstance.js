const expect = require('expect.js')
const isInstance = require('../lib/isInstance')

describe('lib/isInstance', () => {
  class ExtendedObject extends Object {

  }

  class TestClass {}
  class TestSubClass extends TestClass {}

  it('should match string correctly', (done) => {
    expect(isInstance('foo', String)).to.be(true)
    expect(isInstance('foo', 'string')).to.be(true)

    expect(isInstance(null, String)).not.to.be(true)
    expect(isInstance(null, String)).not.to.be(true)

    expect(isInstance(1, String)).not.to.be(true)
    expect(isInstance(1, String)).not.to.be(true)

    expect(isInstance([], String)).not.to.be(true)
    expect(isInstance([], String)).not.to.be(true)

    expect(isInstance({}, String)).not.to.be(true)
    expect(isInstance({}, String)).not.to.be(true)

    expect(isInstance(Date, String)).not.to.be(true)
    expect(isInstance(Date, String)).not.to.be(true)

    done()
  })

  it('should match number correctly', (done) => {
    expect(isInstance(1, Number)).to.be(true)
    expect(isInstance(1, 'number')).to.be(true)

    expect(isInstance(null, Number)).not.to.be(true)
    expect(isInstance(null, Number)).not.to.be(true)

    expect(isInstance('1', Number)).not.to.be(true)
    expect(isInstance('1', Number)).not.to.be(true)

    expect(isInstance([], Number)).not.to.be(true)
    expect(isInstance([], Number)).not.to.be(true)

    expect(isInstance({}, Number)).not.to.be(true)
    expect(isInstance({}, Number)).not.to.be(true)

    expect(isInstance(Date, Number)).not.to.be(true)
    expect(isInstance(Date, Number)).not.to.be(true)

    done()
  })

  it('should match array correctly', (done) => {
    expect(isInstance([], Array)).to.be(true)
    expect(isInstance([], 'array')).to.be(true)

    expect(isInstance(null, Array)).not.to.be(true)
    expect(isInstance(null, 'array')).not.to.be(true)

    expect(isInstance('1', Array)).not.to.be(true)
    expect(isInstance('1', 'array')).not.to.be(true)

    expect(isInstance(1, Array)).not.to.be(true)
    expect(isInstance(1, 'array')).not.to.be(true)

    expect(isInstance({}, Array)).not.to.be(true)
    expect(isInstance({}, 'array')).not.to.be(true)

    expect(isInstance(Date, Array)).not.to.be(true)
    expect(isInstance(Date, 'array')).not.to.be(true)

    done()
  })

  it('should match object correctly', (done) => {
    expect(isInstance({}, Object)).to.be(true)
    expect(isInstance({}, 'object')).to.be(true)

    expect(isInstance(new ExtendedObject(), Object)).not.to.be(true)
    expect(isInstance(new ExtendedObject(), 'object')).not.to.be(true)

    expect(isInstance(new TestClass(), Object)).not.to.be(true)
    expect(isInstance(new TestClass(), 'object')).not.to.be(true)

    expect(isInstance(null, Object)).not.to.be(true)
    expect(isInstance(null, 'object')).not.to.be(true)

    expect(isInstance('1', Object)).not.to.be(true)
    expect(isInstance('1', 'object')).not.to.be(true)

    expect(isInstance(1, Object)).not.to.be(true)
    expect(isInstance(1, 'object')).not.to.be(true)

    expect(isInstance([], Object)).not.to.be(true)
    expect(isInstance([], 'object')).not.to.be(true)

    expect(isInstance(Date, Object)).not.to.be(true)
    expect(isInstance(Date, 'object')).not.to.be(true)

    done()
  })

  it('should match Date correctly', (done) => {
    expect(isInstance(new Date(), Date)).to.be(true)
    expect(isInstance(new Date(), 'date')).to.be(true)

    expect(isInstance(null, Date)).not.to.be(true)
    expect(isInstance(null, 'date')).not.to.be(true)

    expect(isInstance('1', Date)).not.to.be(true)
    expect(isInstance('1', 'date')).not.to.be(true)

    expect(isInstance(1, Date)).not.to.be(true)
    expect(isInstance(1, 'date')).not.to.be(true)

    expect(isInstance([], Date)).not.to.be(true)
    expect(isInstance([], 'date')).not.to.be(true)

    expect(isInstance({}, Date)).not.to.be(true)
    expect(isInstance({}, 'date')).not.to.be(true)
    done()
  })

  it('should match to an array of types', (done) => {
    expect(isInstance('foo', [String, Number])).to.be(true)
    expect(isInstance('foo', ['string', 'number'])).to.be(true)

    expect(isInstance('foo', ['number', 'array'])).not.to.be(true)
    expect(isInstance('foo', [Number, Array])).not.to.be(true)

    done()
  })

  it('should match custom classes', (done) => {
    expect(isInstance(new TestClass(), TestClass)).to.be(true)
    expect(isInstance(new TestSubClass(), TestClass)).to.be(true)
    done()
  })

  it('should match loosely', (done) => {
    expect(isInstance(null, Object, true)).to.be(true)
    expect(isInstance(null, 'object', true)).to.be(true)

    // expect(isInstance(new ExtendedObject(), Object), true).to.be(true)
    // expect(isInstance(new ExtendedObject(), 'object'), true).to.be(true)

    expect(isInstance(new Date(), Object, true)).to.be(true)
    expect(isInstance(new Date(), 'object', true)).to.be(true)

    expect(isInstance([], Object, true)).not.to.be(true)
    expect(isInstance([], 'object', true)).not.to.be(true)

    expect(isInstance('string', Object, true)).not.to.be(true)
    expect(isInstance('string', 'object', true)).not.to.be(true)

    done()
  })
})
