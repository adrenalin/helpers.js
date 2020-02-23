const expect = require('expect.js')
const httpBuildQuery = require('../lib/httpBuildQuery')

describe('httpBuildQuery', () => {
  it('should accept only objects', (done) => {
    expect(httpBuildQuery).withArgs(1).to.throwException()
    expect(httpBuildQuery).withArgs('1').to.throwException()
    expect(httpBuildQuery).withArgs([]).to.throwException()
    expect(httpBuildQuery).withArgs(null).to.throwException()
    expect(httpBuildQuery).withArgs(true).to.throwException()

    expect(httpBuildQuery).withArgs({}).not.to.throwException()
    done()
  })

  it('should convert a basic object to a query string', (done) => {
    expect(httpBuildQuery({ foo: 'bar', bar: 'foo', foobar: 1 })).to.be('foo=bar&bar=foo&foobar=1')
    done()
  })

  it('should convert a deep object to a query string', (done) => {
    expect(httpBuildQuery({ foo: { bar: 'foo', foobar: 1 } })).to.be('foo[bar]=foo&foo[foobar]=1')
    done()
  })

  it('should skip null values', (done) => {
    expect(httpBuildQuery({ foo: null })).to.be('')
    expect(httpBuildQuery({ foo: undefined })).to.be('')
    done()
  })

  it('should convert boolean values', (done) => {
    expect(httpBuildQuery({ foo: true })).to.be('foo=true')
    expect(httpBuildQuery({ foo: false })).to.be('foo=false')
    done()
  })

  it('should convert array values', (done) => {
    expect(httpBuildQuery({ foo: [1, 2, 4, 6] })).to.be('foo[0]=1&foo[1]=2&foo[2]=4&foo[3]=6')
    done()
  })

  it('should convert array values recursively', (done) => {
    expect(httpBuildQuery({ foo: [[1], [2], [4], [6]] })).to.be('foo[0][0]=1&foo[1][0]=2&foo[2][0]=4&foo[3][0]=6')
    expect(httpBuildQuery({ foo: [{ foo: 'bar', bar: null }] })).to.be('foo[0][foo]=bar')
    done()
  })

  it('should keep null values in the array', (done) => {
    expect(httpBuildQuery({ foo: [1, null, 4, 6] })).to.be('foo[0]=1&foo[1]=&foo[2]=4&foo[3]=6')
    done()
  })
})
