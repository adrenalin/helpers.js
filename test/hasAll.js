const { expect } = require('chai')
const { hasAll, Dataset } = require('../')

describe('lib/hasAll', () => {
  it('should match string to strings', () => {
    expect(hasAll('foo', 'foo', 'bar')).to.eql(false)
    expect(hasAll('foo', ['foo', 'bar'])).to.eql(false)
    expect(hasAll(['foo'], new Set(['foo', 'bar']))).to.eql(false)
    expect(hasAll(new Set(['foo']), new Dataset(['foo', 'bar']))).to.eql(false)
    expect(hasAll(new Dataset(['foo']), new Dataset(['foo', 'bar']))).to.eql(false)

    expect(hasAll('foo', 'foo')).to.eql(true)
    expect(hasAll('foo', ['foo'])).to.eql(true)
    expect(hasAll(['foo', 'bar'], new Set(['foo', 'bar']))).to.eql(true)
    expect(hasAll(['foo', 'bar'], new Dataset(['bar']))).to.eql(true)
    expect(hasAll(new Set(['foo', 'bar']), new Dataset(['bar']))).to.eql(true)
    expect(hasAll(new Dataset(['foo', 'bar']), new Dataset(['bar']))).to.eql(true)
  })
})
