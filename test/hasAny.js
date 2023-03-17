const { expect } = require('chai')
const { hasAny, Dataset } = require('../')

describe('lib/hasAny', () => {
  it('should match string to strings', () => {
    expect(hasAny('foo', 'foo', 'bar')).to.eql(true)
    expect(hasAny('foo', ['foo', 'bar'])).to.eql(true)
    expect(hasAny(['foo'], new Set(['foo', 'bar']))).to.eql(true)
    expect(hasAny(new Set(['foo']), new Dataset(['foo', 'bar']))).to.eql(true)
    expect(hasAny(new Dataset(['foo']), new Dataset(['foo', 'bar']))).to.eql(true)

    expect(hasAny('foo', 'bar')).to.eql(false)
    expect(hasAny('foo', ['bar'])).to.eql(false)
    expect(hasAny(['foo'], new Set(['bar']))).to.eql(false)
    expect(hasAny(['foo'], new Dataset(['bar']))).to.eql(false)
    expect(hasAny(new Set(['foo']), new Dataset(['bar']))).to.eql(false)
    expect(hasAny(new Dataset(['foo']), new Dataset(['bar']))).to.eql(false)
  })
})
