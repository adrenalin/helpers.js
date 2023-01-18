const expect = require('expect.js')
const isEqual = require('../lib/isEqual')

describe('lib/isEqual', () => {
  it('should require at least two arguments', (done) => {
    expect(isEqual).withArgs(1).to.throwError()
    done()
  })

  it('should match numbers', (done) => {
    expect(isEqual(1, 1)).to.be(true)
    expect(isEqual(1.0, 1)).to.be(true)
    expect(isEqual(1, 2)).to.be(false)
    expect(isEqual(1, 1, 1)).to.be(true)
    expect(isEqual(1, 1, 2)).to.be(false)
    done()
  })

  it('should match strings', (done) => {
    expect(isEqual('a', 'a')).to.be(true)
    expect(isEqual('a', 'b')).to.be(false)
    expect(isEqual('a', 'aa')).to.be(false)
    expect(isEqual('a', 'a', 'a')).to.be(true)
    expect(isEqual('a', 'a', 'b')).to.be(false)
    done()
  })

  it('should match booleans', (done) => {
    expect(isEqual(true, true)).to.be(true)
    expect(isEqual(true, false)).to.be(false)
    expect(isEqual(true, null)).to.be(false)
    expect(isEqual(true, true, true)).to.be(true)
    expect(isEqual(true, true, false)).to.be(false)
    done()
  })

  it('should match arrays', (done) => {
    expect(isEqual([], [])).to.be(true)
    expect(isEqual([1], 1)).to.be(false)
    expect(isEqual([1], [1])).to.be(true)
    expect(isEqual([1, 1], [1])).to.be(false)
    expect(isEqual([1], [1, 1])).to.be(false)
    expect(isEqual([1], [2])).to.be(false)
    expect(isEqual([1], [1], [1])).to.be(true)
    expect(isEqual([1], [1], [2])).to.be(false)
    expect(isEqual([1, 2], [1, 2])).to.be(true)
    expect(isEqual([[1, 2]], [[1, 2]])).to.be(true)
    expect(isEqual([[1, 1]], [[1, 2]])).to.be(false)

    done()
  })

  it('should match objects', (done) => {
    expect(isEqual({ foo: 'bar', bar: 'foo' }, { foo: 'bar', bar: 'foo' })).to.be(true)
    expect(isEqual({ foo: 'bar', bar: 'foo' }, { bar: 'foo', foo: 'bar' })).to.be(true)
    expect(isEqual({ foo: 'bar' }, { bar: 'foo' })).to.be(false)
    expect(isEqual({ foo: 'bar' }, { foo: 'foo' })).to.be(false)
    expect(isEqual({ foo: 'bar' }, 'foo')).to.be(false)
    done()
  })

  it('should match dates', (done) => {
    const now = new Date()
    const ts = now.getTime()
    const iso = now.toISOString()

    const then = new Date(now + 1000)

    // Date-Date comparison
    expect(isEqual(new Date(ts), new Date(ts))).to.be(true)
    expect(isEqual(new Date(ts), new Date(ts + 1))).to.be(false)

    // Date-ISO 8601 string comparison
    expect(isEqual(new Date(ts), iso)).to.be(true)
    expect(isEqual(new Date(ts), then.toISOString())).to.be(false)

    // Date-timestamp comparison
    expect(isEqual(new Date(ts), ts)).to.be(true)
    expect(isEqual(new Date(ts), then.getTime())).to.be(false)

    // Date-other type comparison
    expect(isEqual(new Date(ts), null)).to.be(false)

    done()
  })
})
