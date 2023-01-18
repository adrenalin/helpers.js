const { expect } = require('chai')
const modifyUrl = require('../lib/modifyUrl')

describe('lib/modifyUrl', () => {
  it('should accept only a string for url', (done) => {
    expect(() => modifyUrl(0)).to.throw()
    expect(() => modifyUrl([0])).to.throw()
    expect(() => modifyUrl({ foo: 'bar' })).to.throw()
    expect(() => modifyUrl(null)).to.throw()

    done()
  })

  it('should return url without query string with an empty object', (done) => {
    expect(modifyUrl('/foo')).to.equal('/foo')
    expect(modifyUrl('/foo', {})).to.equal('/foo')
    done()
  })

  it('should append query string to a URL', (done) => {
    expect(modifyUrl('/foo', { foo: 'bar' })).to.equal('/foo?foo=bar')
    expect(modifyUrl('/foo?bar=foo', { foo: 'bar' })).to.equal('/foo?bar=foo&foo=bar')
    done()
  })

  it('should replace existing query values with new', (done) => {
    expect(modifyUrl('/foo?foo=foo', { foo: 'bar' })).to.equal('/foo?foo=bar')
    done()
  })
})
