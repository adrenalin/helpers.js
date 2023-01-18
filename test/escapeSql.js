const expect = require('expect.js')
const escapeSql = require('../lib/escapeSql')

describe('lib/helpers/escapeSql', () => {
  it('should not escape lowercase', (done) => {
    expect(escapeSql('foo')).to.be('foo')
    done()
  })

  it('should escape uppercase argument', (done) => {
    expect(escapeSql('Foo')).to.be('"Foo"')
    done()
  })

  it('should allow defining quote', (done) => {
    expect(escapeSql('Foo', '\'')).to.be('\'Foo\'')
    done()
  })

  it('should allow only single and double quote', (done) => {
    expect(() => escapeSql('Foo', '*')).to.throwError()
    done()
  })

  it('should force quote with force flag', (done) => {
    expect(escapeSql('foo', '"', true)).to.be('"foo"')
    expect(escapeSql('foo', true)).to.be('"foo"')
    done()
  })

  it('should escape the double quote', (done) => {
    expect(escapeSql('foo"bar', '"')).to.be('"foo""bar"')
    done()
  })

  it('should escape the single quote', (done) => {
    expect(escapeSql("foo'bar", "'")).to.be("'foo''bar'")
    done()
  })

  it('should not escape numbers, true, false and null unless forced', (done) => {
    expect(escapeSql(123)).to.be('123')
    expect(escapeSql(true)).to.be('true')
    expect(escapeSql(false)).to.be('false')
    expect(escapeSql(null)).to.be('null')

    expect(escapeSql(123, "'", true)).to.be("'123'")
    expect(escapeSql(true, "'", true)).to.be("'true'")
    expect(escapeSql(false, "'", true)).to.be("'false'")
    expect(escapeSql(null, "'", true)).to.be("'null'")
    done()
  })

  it('should escape an array', (done) => {
    expect(escapeSql(['a', 'b', 'c'])).to.eql(['a', 'b', 'c'])
    expect(escapeSql(['a', 'b', 'c'], '"', true)).to.eql(['"a"', '"b"', '"c"'])
    done()
  })

  it('should escape object keys', (done) => {
    expect(escapeSql({ foo: 'bar' }, "'", true)).to.eql({ foo: "'bar'" })
    expect(escapeSql({ foo: 'bar' }, true)).to.eql({ foo: '"bar"' })
    done()
  })
})
