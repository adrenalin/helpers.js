const { expect } = require('chai')
const { castToArray } = require('../')

describe('lib/castToArray', () => {
  it('should keep an array as it is', () => {
    const input = ['foo', 'bar']
    expect(castToArray(input)).to.equal(input)
  })

  it('should cast scalar values as array values', () => {
    expect(castToArray(1)).to.eql([1])
    expect(castToArray('foo')).to.eql(['foo'])
  })

  it('should cast boolean values as array values', () => {
    expect(castToArray(true)).to.eql([true])
    expect(castToArray(false)).to.eql([false])
  })

  it('should cast objects as array values', () => {
    const input = { foo: 'bar' }
    expect(castToArray(input)).to.eql([input])
  })

  it('should cast null and undefined as empty arrays', () => {
    expect(castToArray(null)).to.eql([])
    expect(castToArray(undefined)).to.eql([])
  })

  it('should handle multiple arguments as one array', () => {
    const args = [true, false, 'foo', 1, null, undefined]
    expect(castToArray(...args)).to.eql(args)
  })

  it('should cast a set as array', () => {
    expect(castToArray(new Set([1, 2, 3]))).to.eql([1, 2, 3])
  })
})
