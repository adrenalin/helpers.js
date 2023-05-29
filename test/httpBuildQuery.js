const { expect } = require('chai')
const { httpBuildQuery } = require('../')

describe('lib/httpBuildQuery', () => {
  it('should accept only objects', () => {
    expect(() => httpBuildQuery(1)).to.throw()
    expect(() => httpBuildQuery('1')).to.throw()
    expect(() => httpBuildQuery([])).to.throw()
    expect(() => httpBuildQuery(null)).to.throw()
    expect(() => httpBuildQuery(true)).to.throw()

    expect(() => httpBuildQuery({})).not.to.throw()
  })

  it('should convert a basic object to a query string', () => {
    expect(httpBuildQuery({ foo: 'bar', bar: 'foo', foobar: 1 })).to.equal('foo=bar&bar=foo&foobar=1')
  })

  it('should convert a deep object to a query string', () => {
    expect(httpBuildQuery({ foo: { bar: 'foo', foobar: 1 } })).to.equal('foo[bar]=foo&foo[foobar]=1')
  })

  it('should skip null values', () => {
    expect(httpBuildQuery({ foo: null })).to.equal('')
    expect(httpBuildQuery({ foo: undefined })).to.equal('')
  })

  it('should convert boolean values', () => {
    expect(httpBuildQuery({ foo: true })).to.equal('foo=true')
    expect(httpBuildQuery({ foo: false })).to.equal('foo=false')
  })

  it('should convert array values', () => {
    expect(httpBuildQuery({ foo: [1, 2, 4, 6] })).to.equal('foo[0]=1&foo[1]=2&foo[2]=4&foo[3]=6')
  })

  it('should convert array values recursively', () => {
    expect(httpBuildQuery({ foo: [[1], [2], [4], [6]] })).to.equal('foo[0][0]=1&foo[1][0]=2&foo[2][0]=4&foo[3][0]=6')
    expect(httpBuildQuery({ foo: [{ foo: 'bar', bar: null }] })).to.equal('foo[0][foo]=bar')
  })

  it('should keep null values in the array', () => {
    expect(httpBuildQuery({ foo: [1, null, 4, 6] })).to.equal('foo[0]=1&foo[1]=&foo[2]=4&foo[3]=6')
  })

  it('should not set array keys when requested not to', () => {
    expect(httpBuildQuery({ foo: [1, null, 4, 6] }, { arrayKeys: false })).to.equal('foo[]=1&foo[]=&foo[]=4&foo[]=6')
  })
})
