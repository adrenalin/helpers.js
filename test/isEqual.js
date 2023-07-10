const { expect } = require('chai')
const { isEqual } = require('../')

describe('lib/isEqual', () => {
  it('should require at least two arguments', () => {
    expect(() => isEqual(1)).to.throw()
  })

  it('should match numbers', () => {
    expect(isEqual(1, 1)).to.equal(true)
    expect(isEqual(1.0, 1)).to.equal(true)
    expect(isEqual(1, 2)).to.equal(false)
    expect(isEqual(1, 1, 1)).to.equal(true)
    expect(isEqual(1, 1, 2)).to.equal(false)
  })

  it('should match strings', () => {
    expect(isEqual('a', 'a')).to.equal(true)
    expect(isEqual('a', 'b')).to.equal(false)
    expect(isEqual('a', 'aa')).to.equal(false)
    expect(isEqual('a', 'a', 'a')).to.equal(true)
    expect(isEqual('a', 'a', 'b')).to.equal(false)
  })

  it('should match booleans', () => {
    expect(isEqual(true, true)).to.equal(true)
    expect(isEqual(true, false)).to.equal(false)
    expect(isEqual(true, null)).to.equal(false)
    expect(isEqual(true, true, true)).to.equal(true)
    expect(isEqual(true, true, false)).to.equal(false)
  })

  it('should match arrays', () => {
    expect(isEqual([], [])).to.equal(true)
    expect(isEqual([1], 1)).to.equal(false)
    expect(isEqual([1], [1])).to.equal(true)
    expect(isEqual([1, 1], [1])).to.equal(false)
    expect(isEqual([1], [1, 1])).to.equal(false)
    expect(isEqual([1], [2])).to.equal(false)
    expect(isEqual([1], [1], [1])).to.equal(true)
    expect(isEqual([1], [1], [2])).to.equal(false)
    expect(isEqual([1, 2], [1, 2])).to.equal(true)
    expect(isEqual([[1, 2]], [[1, 2]])).to.equal(true)
    expect(isEqual([[1, 1]], [[1, 2]])).to.equal(false)
  })

  it('should match objects', () => {
    expect(isEqual({ foo: 'bar', bar: 'foo' }, { foo: 'bar', bar: 'foo' })).to.equal(true)
    expect(isEqual({ foo: 'bar', bar: 'foo' }, { bar: 'foo', foo: 'bar' })).to.equal(true)
    expect(isEqual({ foo: 'bar' }, { bar: 'foo' })).to.equal(false)
    expect(isEqual({ foo: 'bar' }, { foo: 'foo' })).to.equal(false)
    expect(isEqual({ foo: 'bar' }, 'foo')).to.equal(false)
  })

  it('should match dates', () => {
    const now = new Date()
    const ts = now.getTime()
    const iso = now.toISOString()

    const then = new Date(now + 1000)

    // Date-Date comparison
    expect(isEqual(new Date(ts), new Date(ts))).to.equal(true)
    expect(isEqual(new Date(ts), new Date(ts + 1))).to.equal(false)

    // Date-ISO 8601 string comparison
    expect(isEqual(new Date(ts), iso)).to.equal(true)
    expect(isEqual(new Date(ts), then.toISOString())).to.equal(false)

    // Date-timestamp comparison
    expect(isEqual(new Date(ts), ts)).to.equal(true)
    expect(isEqual(new Date(ts), then.getTime())).to.equal(false)

    // Date-other type comparison
    expect(isEqual(new Date(ts), null)).to.equal(false)
  })
})
