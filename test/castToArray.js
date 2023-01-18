const { expect } = require('chai')
const castToArray = require('../lib/castToArray')

describe('lib/castToArray', () => {
  it('should keep an array as it is', (done) => {
    const input = ['foo', 'bar']
    expect(castToArray(input)).to.equal(input)
    done()
  })

  it('should cast scalar values as array values', (done) => {
    expect(castToArray(1)).to.eql([1])
    expect(castToArray('foo')).to.eql(['foo'])
    done()
  })

  it('should cast boolean values as array values', (done) => {
    expect(castToArray(true)).to.eql([true])
    expect(castToArray(false)).to.eql([false])
    done()
  })

  it('should cast objects as array values', (done) => {
    const input = { foo: 'bar' }
    expect(castToArray(input)).to.eql([input])
    done()
  })

  it('should cast null and undefined as empty arrays', (done) => {
    expect(castToArray(null)).to.eql([])
    expect(castToArray(undefined)).to.eql([])
    done()
  })

  it('should handle multiple arguments as one array', (done) => {
    const args = [true, false, 'foo', 1, null, undefined]
    expect(castToArray(...args)).to.eql(args)
    done()
  })
})
