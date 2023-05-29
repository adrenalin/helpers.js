const { expect } = require('chai')
const { modifyUrl } = require('../')

describe('lib/modifyUrl', () => {
  it('should accept only a string for url', () => {
    expect(() => modifyUrl(0)).to.throw()
    expect(() => modifyUrl([0])).to.throw()
    expect(() => modifyUrl({ foo: 'bar' })).to.throw()
    expect(() => modifyUrl(null)).to.throw()
  })

  it('should return url without query string with an empty object', () => {
    expect(modifyUrl('/foo')).to.equal('/foo')
    expect(modifyUrl('/foo', {})).to.equal('/foo')
  })

  it('should append query string to a URL', () => {
    expect(modifyUrl('/foo', { foo: 'bar' })).to.equal('/foo?foo=bar')
    expect(modifyUrl('/foo?bar=foo', { foo: 'bar' })).to.equal('/foo?bar=foo&foo=bar')
  })

  it('should replace existing query values with new', () => {
    expect(modifyUrl('/foo?foo=foo', { foo: 'bar' })).to.equal('/foo?foo=bar')
  })

  it('should pass the optional options', () => {
    expect(modifyUrl('/foo?foo[]=foo', { foo: ['bar'] })).to.equal('/foo?foo[0]=bar')
    expect(modifyUrl('/foo?foo[]=foo', { foo: ['bar'] }, { arrayKeys: false })).to.equal('/foo?foo[]=bar')
  })
})
