const expect = require('expect.js')
const getClassName = require('../lib/getClassName')

describe('getClassName', () => {
  it('should trim a class name from a string', (done) => {
    expect(getClassName(' foo ')).to.be('foo')
    done()
  })

  it('should keep only unique class names', (done) => {
    expect(getClassName(' bar foo foo ')).to.be('bar foo')
    done()
  })

  it('should join an array', (done) => {
    expect(getClassName(['bar', 'foo'])).to.be('bar foo')
    done()
  })

  it('should join a deep array', (done) => {
    expect(getClassName([['bar'], ['foo']])).to.be('bar foo')
    done()
  })

  it('should reject invalid class names', (done) => {
    expect(getClassName).withArgs('1 foo bar').to.throwError()
    expect(getClassName).withArgs('f foo bar').to.throwError()
    done()
  })

  it('should accept multiple arguments', (done) => {
    expect(getClassName('bar', 'foo')).to.be('bar foo')
    done()
  })

  it('should throw an error for object as the argument', (done) => {
    expect(getClassName).withArgs({ foo: 'bar' }).to.throwError()
    done()
  })
})
