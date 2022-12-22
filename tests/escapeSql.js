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

  it('should not escape true, false and null unless forced', (done) => {
    expect(escapeSql(true)).to.be('true')
    expect(escapeSql(false)).to.be('false')
    expect(escapeSql(null)).to.be('null')

    expect(escapeSql(true, "'", true)).to.be("'true'")
    expect(escapeSql(false, "'", true)).to.be("'false'")
    expect(escapeSql(null, "'", true)).to.be("'null'")

    done()
  })
})
