const { expect } = require('chai')
const getClassName = require('../lib/getClassName')

describe('lib/getClassName', () => {
  it('should trim a class name from a string', (done) => {
    expect(getClassName(' foo ')).to.equal('foo')
    done()
  })

  it('should keep only unique class names', (done) => {
    expect(getClassName(' bar foo foo ')).to.equal('bar foo')
    done()
  })

  it('should join an array', (done) => {
    expect(getClassName(['bar', 'foo'])).to.equal('bar foo')
    done()
  })

  it('should join a deep array', (done) => {
    expect(getClassName([['bar'], ['foo']])).to.equal('bar foo')
    done()
  })

  it('should reject invalid class names', (done) => {
    expect(() => getClassName('1 foo bar')).to.throw()
    expect(() => getClassName('f foo bar')).to.throw()
    done()
  })

  it('should accept multiple arguments', (done) => {
    expect(getClassName('bar', 'foo')).to.equal('bar foo')
    done()
  })

  it('should throw an error for object as the argument', (done) => {
    expect(() => getClassName({ foo: 'bar' })).to.throw()
    done()
  })

  it('should silently drop falseish values', (done) => {
    expect(getClassName('bar', null, undefined, '', 'foo')).to.equal('bar foo')
    done()
  })
})
