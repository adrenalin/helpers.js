const { expect } = require('chai')
const escapeSql = require('../lib/escapeSql')

describe('lib/helpers/escapeSql', () => {
  it('should not escape lowercase', (done) => {
    expect(escapeSql('foo')).to.equal('foo')
    done()
  })

  it('should escape uppercase argument', (done) => {
    expect(escapeSql('Foo')).to.equal('"Foo"')
    done()
  })

  it('should allow defining quote', (done) => {
    expect(escapeSql('Foo', '\'')).to.equal('\'Foo\'')
    done()
  })

  it('should allow only single and double quote', (done) => {
    expect(() => escapeSql('Foo', '*')).to.throw()
    done()
  })

  it('should force quote with force flag', (done) => {
    expect(escapeSql('foo', '"', true)).to.equal('"foo"')
    expect(escapeSql('foo', true)).to.equal('"foo"')
    done()
  })

  it('should escape the double quote', (done) => {
    expect(escapeSql('foo"bar', '"')).to.equal('"foo""bar"')
    done()
  })

  it('should escape the single quote', (done) => {
    expect(escapeSql("foo'bar", "'")).to.equal("'foo''bar'")
    done()
  })

  it('should not escape numbers, true, false and null unless forced', (done) => {
    expect(escapeSql(123)).to.equal('123')
    expect(escapeSql(true)).to.equal('true')
    expect(escapeSql(false)).to.equal('false')
    expect(escapeSql(null)).to.equal('null')

    expect(escapeSql(123, "'", true)).to.equal("'123'")
    expect(escapeSql(true, "'", true)).to.equal("'true'")
    expect(escapeSql(false, "'", true)).to.equal("'false'")
    expect(escapeSql(null, "'", true)).to.equal("'null'")
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
