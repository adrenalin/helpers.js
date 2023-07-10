const { expect } = require('chai')
const { trim } = require('../')

describe('lib/trim', () => {
  it('should trim heading space', () => {
    expect(trim(' \t\n\rfoo')).to.equal('foo')
  })

  it('should trim trailing space', () => {
    expect(trim('bar \t\n\r')).to.equal('bar')
  })

  it('should trim space from both ends', () => {
    expect(trim(' \t\n\rbar \t\n\r')).to.equal('bar')
  })

  it('should not trim internal spaces', () => {
    expect(trim('bar \t\n\rfoo')).to.equal('bar \t\n\rfoo')
  })

  it('should accept only one argument', () => {
    expect(() => trim('foo', 'bar')).to.throw()
  })

  it('should accept only a string argument', () => {
    expect(() => trim(['foo', 'bar'])).to.throw()
    expect(() => trim({ foo: 'bar' })).to.throw()
    expect(() => trim(1)).to.throw()
  })
})
