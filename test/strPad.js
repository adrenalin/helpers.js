const { InvalidArgument } = require('@vapaaradikaali/errors')
const { expect } = require('chai')
const { strPad } = require('../')

describe('lib/strPad', () => {
  it('should pad string to the given length', () => {
    expect(strPad('foo', ' ', 5, true)).to.equal('  foo')
    expect(strPad('foo', ' ', 5, false)).to.equal('foo  ')
  })

  it('should force an empty filling for zero length fill', () => {
    expect(strPad('foo', '', 5, true)).to.equal('  foo')
    expect(strPad('foo', '', 5, false)).to.equal('foo  ')
  })

  it('should trim the output when padding exceeds the length', () => {
    expect(strPad('foo', '1234567', 4, true)).to.equal('7foo')
    expect(strPad('foo', '1234567', 4, false)).to.equal('foo1')
  })

  it('should accept strings, numbers, null and undefined as the first argument', () => {
    expect(strPad(1, '0', 2)).to.eql('01')
    expect(strPad('1', '0', 2)).to.eql('01')
    expect(strPad(null, '0', 2)).to.eql('00')
    expect(() => strPad([], '0', 2)).to.throw(InvalidArgument)
  })

  it('should accept strings, numbers, null and undefined as the second argument', () => {
    expect(strPad('1', '0', 2)).to.eql('01')
    expect(strPad('1', 0, 2)).to.eql('01')
    expect(strPad('1', null, 2)).to.eql(' 1')
    expect(() => strPad('0', [], 2)).to.throw(InvalidArgument)
  })

  it('should accept a positive integer or a similar string as the third argument', () => {
    expect(() => strPad(1, 0, 2)).not.to.throw()
    expect(() => strPad(1, 0, '2')).not.to.throw()

    expect(() => strPad(1, 0, -2)).to.throw(InvalidArgument)
    expect(() => strPad(1, 0, 1.2)).to.throw(InvalidArgument)
  })
})
