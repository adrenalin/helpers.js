const expect = require('expect.js')
const modifyUrl = require('../lib/modifyUrl')

describe('lib/modifyUrl', () => {
  it('should accept only a string for url', (done) => {
    expect(modifyUrl).withArgs(0).to.throwError()
    expect(modifyUrl).withArgs([0]).to.throwError()
    expect(modifyUrl).withArgs({ foo: 'bar' }).to.throwError()
    expect(modifyUrl).withArgs(null).to.throwError()

    done()
  })

  it('should return url without query string with an empty object', (done) => {
    expect(modifyUrl('/foo')).to.be('/foo')
    expect(modifyUrl('/foo', {})).to.be('/foo')
    done()
  })

  it('should append query string to a URL', (done) => {
    expect(modifyUrl('/foo', { foo: 'bar' })).to.be('/foo?foo=bar')
    expect(modifyUrl('/foo?bar=foo', { foo: 'bar' })).to.be('/foo?bar=foo&foo=bar')
    done()
  })

  it('should replace existing query values with new', (done) => {
    expect(modifyUrl('/foo?foo=foo', { foo: 'bar' })).to.be('/foo?foo=bar')
    done()
  })
})
