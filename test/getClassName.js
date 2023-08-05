const { expect } = require('chai')
const { getClassName } = require('../')

describe('lib/getClassName', () => {
  it('should trim a class name from a string', () => {
    expect(getClassName(' foo ')).to.equal('foo')
  })

  it('should keep only unique class names', () => {
    expect(getClassName(' bar foo foo ')).to.equal('bar foo')
  })

  it('should join an array', () => {
    expect(getClassName(['bar', 'foo'])).to.equal('bar foo')
  })

  it('should join a deep array', () => {
    expect(getClassName([['bar'], ['foo']])).to.equal('bar foo')
  })

  it('should reject invalid class names', () => {
    expect(() => getClassName('1 foo bar')).to.throw()
    expect(() => getClassName('f foo bar')).to.throw()
  })

  it('should accept multiple arguments', () => {
    expect(getClassName('bar', 'foo')).to.equal('bar foo')
  })

  it('should throw an error for object as the argument', () => {
    expect(() => getClassName({ foo: 'bar' })).to.throw()
  })

  it('should silently drop falseish values', () => {
    expect(getClassName('bar', null, undefined, '', 'foo')).to.equal('bar foo')
  })
})
