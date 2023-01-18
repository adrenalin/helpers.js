const { expect } = require('chai')
const parseQueryString = require('../lib/parseQueryString')

describe('lib/parseQueryString', () => {
  it('should return an empty object', (done) => {
    expect(parseQueryString('')).to.eql({})
    expect(parseQueryString('?')).to.eql({})
    done()
  })

  it('should return key-value pairs', (done) => {
    expect(parseQueryString('foo=bar')).to.eql({ foo: 'bar' })
    expect(parseQueryString('?foo=bar')).to.eql({ foo: 'bar' })

    expect(parseQueryString('key1=value1&key2=value2')).to.eql({ key1: 'value1', key2: 'value2' })
    done()
  })

  it('should typecast values', (done) => {
    expect(parseQueryString('foo=null', true)).to.eql({ foo: null })
    expect(parseQueryString('foo=true', true)).to.eql({ foo: true })
    expect(parseQueryString('foo=false', true)).to.eql({ foo: false })
    done()
  })

  it('should treat valueless keys as booleans marking true', (done) => {
    expect(parseQueryString('foo&bar=')).to.eql({ foo: true, bar: '' })
    expect(parseQueryString('foo&bar=', true)).to.eql({ foo: true, bar: null })
    done()
  })

  it('should be able to handle deep objects', (done) => {
    expect(parseQueryString('foo[foo]=foo&foo[bar]=bar')).to.eql({ foo: { foo: 'foo', bar: 'bar' } })
    done()
  })

  it('should be able to cast sequential values as an array', (done) => {
    expect(parseQueryString('foo[0]=foo&foo[1]=bar')).to.eql({ foo: ['foo', 'bar'] })
    done()
  })

  it('should be able to cast sequential values without indexes as an array', (done) => {
    expect(parseQueryString('foo[]=foo')).to.eql({ foo: ['foo'] })
    expect(parseQueryString('foo[]=foo&foo[]=bar')).to.eql({ foo: ['foo', 'bar'] })
    expect(parseQueryString('foo[]=foo&foo[]=bar&foo[]=foobar')).to.eql({ foo: ['foo', 'bar', 'foobar'] })
    done()
  })
})
