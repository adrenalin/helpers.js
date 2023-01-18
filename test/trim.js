const { expect } = require('chai')
const trim = require('../lib/trim')

describe('lib/trim', () => {
  it('should trim heading space', (done) => {
    expect(trim(' \t\n\rfoo')).to.equal('foo')
    done()
  })

  it('should trim trailing space', (done) => {
    expect(trim('bar \t\n\r')).to.equal('bar')
    done()
  })

  it('should trim space from both ends', (done) => {
    expect(trim(' \t\n\rbar \t\n\r')).to.equal('bar')
    done()
  })

  it('should not trim internal spaces', (done) => {
    expect(trim('bar \t\n\rfoo')).to.equal('bar \t\n\rfoo')
    done()
  })

  it('should accept only one argument', (done) => {
    expect(() => trim('foo', 'bar')).to.throw()
    done()
  })

  it('should accept only a string argument', (done) => {
    expect(() => trim(['foo', 'bar'])).to.throw()
    expect(() => trim({ foo: 'bar' })).to.throw()
    expect(() => trim(1)).to.throw()
    done()
  })
})
