const { expect } = require('chai')
const { hasOther, Dataset } = require('../')

describe('lib/hasOther', () => {
  it('should match string to strings', () => {
    expect(hasOther('foo', 'foo', 'bar')).to.eql(true)
    expect(hasOther('foo', ['foo', 'bar'])).to.eql(true)
    expect(hasOther(['foo'], new Set(['foo', 'bar']))).to.eql(true)
    expect(hasOther(new Set(['foo']), new Dataset(['foo', 'bar']))).to.eql(true)
    expect(hasOther(new Dataset(['foo']), new Dataset(['foo', 'bar']))).to.eql(true)

    expect(hasOther('foo', 'foo')).to.eql(false)
    expect(hasOther('foo', ['foo'])).to.eql(false)
    expect(hasOther(['foo', 'bar'], new Set(['foo', 'bar']))).to.eql(false)
    expect(hasOther(new Set(['foo', 'bar']), new Dataset(['bar']))).to.eql(false)
    expect(hasOther(new Dataset(['foo', 'bar']), new Dataset(['bar']))).to.eql(false)
  })
})
