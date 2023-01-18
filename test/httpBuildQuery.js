const { expect } = require('chai')
const httpBuildQuery = require('../lib/httpBuildQuery')

describe('lib/httpBuildQuery', () => {
  it('should accept only objects', (done) => {
    expect(() => httpBuildQuery(1)).to.throw()
    expect(() => httpBuildQuery('1')).to.throw()
    expect(() => httpBuildQuery([])).to.throw()
    expect(() => httpBuildQuery(null)).to.throw()
    expect(() => httpBuildQuery(true)).to.throw()

    expect(() => httpBuildQuery({})).not.to.throw()
    done()
  })

  it('should convert a basic object to a query string', (done) => {
    expect(httpBuildQuery({ foo: 'bar', bar: 'foo', foobar: 1 })).to.equal('foo=bar&bar=foo&foobar=1')
    done()
  })

  it('should convert a deep object to a query string', (done) => {
    expect(httpBuildQuery({ foo: { bar: 'foo', foobar: 1 } })).to.equal('foo[bar]=foo&foo[foobar]=1')
    done()
  })

  it('should skip null values', (done) => {
    expect(httpBuildQuery({ foo: null })).to.equal('')
    expect(httpBuildQuery({ foo: undefined })).to.equal('')
    done()
  })

  it('should convert boolean values', (done) => {
    expect(httpBuildQuery({ foo: true })).to.equal('foo=true')
    expect(httpBuildQuery({ foo: false })).to.equal('foo=false')
    done()
  })

  it('should convert array values', (done) => {
    expect(httpBuildQuery({ foo: [1, 2, 4, 6] })).to.equal('foo[0]=1&foo[1]=2&foo[2]=4&foo[3]=6')
    done()
  })

  it('should convert array values recursively', (done) => {
    expect(httpBuildQuery({ foo: [[1], [2], [4], [6]] })).to.equal('foo[0][0]=1&foo[1][0]=2&foo[2][0]=4&foo[3][0]=6')
    expect(httpBuildQuery({ foo: [{ foo: 'bar', bar: null }] })).to.equal('foo[0][foo]=bar')
    done()
  })

  it('should keep null values in the array', (done) => {
    expect(httpBuildQuery({ foo: [1, null, 4, 6] })).to.equal('foo[0]=1&foo[1]=&foo[2]=4&foo[3]=6')
    done()
  })
})
