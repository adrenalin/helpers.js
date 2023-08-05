const { expect } = require('chai')
const { escapeSql } = require('../')

describe('lib/helpers/escapeSql', () => {
  it('should not escape lowercase', () => {
    expect(escapeSql('foo')).to.equal('foo')
  })

  it('should escape uppercase argument', () => {
    expect(escapeSql('Foo')).to.equal('"Foo"')
  })

  it('should allow defining quote', () => {
    expect(escapeSql('Foo', '\'')).to.equal('\'Foo\'')
  })

  it('should allow only single and double quote', () => {
    expect(() => escapeSql('Foo', '*')).to.throw()
  })

  it('should force quote with force flag', () => {
    expect(escapeSql('foo', '"', true)).to.equal('"foo"')
    expect(escapeSql('foo', true)).to.equal('"foo"')
  })

  it('should escape the double quote', () => {
    expect(escapeSql('foo"bar', '"')).to.equal('"foo""bar"')
  })

  it('should escape the single quote', () => {
    expect(escapeSql("foo'bar", "'")).to.equal("'foo''bar'")
  })

  it('should not escape numbers, true, false and null unless forced', () => {
    expect(escapeSql(123)).to.equal('123')
    expect(escapeSql(true)).to.equal('true')
    expect(escapeSql(false)).to.equal('false')
    expect(escapeSql(null)).to.equal('null')

    expect(escapeSql(123, "'", true)).to.equal("'123'")
    expect(escapeSql(true, "'", true)).to.equal("'true'")
    expect(escapeSql(false, "'", true)).to.equal("'false'")
    expect(escapeSql(null, "'", true)).to.equal("'null'")
  })

  it('should escape an array', () => {
    expect(escapeSql(['a', 'b', 'c'])).to.eql(['a', 'b', 'c'])
    expect(escapeSql(['a', 'b', 'c'], '"', true)).to.eql(['"a"', '"b"', '"c"'])
  })

  it('should escape object keys', () => {
    expect(escapeSql({ foo: 'bar' }, "'", true)).to.eql({ foo: "'bar'" })
    expect(escapeSql({ foo: 'bar' }, true)).to.eql({ foo: '"bar"' })
  })
})
