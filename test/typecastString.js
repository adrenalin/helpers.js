const { expect } = require('chai')
const { typecastString } = require('../')

describe('lib/typecastString', () => {
  it('should return the original value if not a string', (done) => {
    expect(typecastString(1)).to.equal(1)
    expect(typecastString(true)).to.equal(true)
    expect(typecastString(false)).to.equal(false)
    expect(typecastString(null)).to.equal(null)

    const obj = {}
    expect(typecastString(obj)).to.equal(obj)

    const date = new Date()
    expect(typecastString(date)).to.equal(date)

    done()
  })

  it('should return alphabetical string as it went', (done) => {
    expect(typecastString('myString')).to.equal('myString')
    done()
  })

  it('should return typecasted boolean values', (done) => {
    expect(typecastString('true')).to.equal(true)
    expect(typecastString('True')).to.equal(true)
    expect(typecastString('TRUE')).to.equal(true)

    expect(typecastString('false')).to.equal(false)
    expect(typecastString('False')).to.equal(false)
    expect(typecastString('FALSE')).to.equal(false)

    done()
  })

  it('should return typecasted null values', (done) => {
    expect(typecastString('null')).to.equal(null)
    expect(typecastString('Null')).to.equal(null)
    expect(typecastString('NULL')).to.equal(null)
    expect(typecastString('')).to.equal(null)

    done()
  })

  it('should return various number formats', (done) => {
    expect(typecastString('1')).to.equal(1)
    expect(typecastString('1.1')).to.equal(1.1)
    expect(typecastString('1,1')).to.equal(1.1)
    expect(typecastString('0.1')).to.equal(0.1)
    expect(typecastString('0,1')).to.equal(0.1)

    expect(typecastString('0')).to.equal(0)

    expect(typecastString('-1')).to.equal(-1)
    expect(typecastString('-1.1')).to.equal(-1.1)
    expect(typecastString('-1,1')).to.equal(-1.1)
    expect(typecastString('-.1')).to.equal(-0.1)
    expect(typecastString('-,1')).to.equal(-0.1)
    done()
  })

  it('should not typecast ISO dates', (done) => {
    expect(typecastString('2020-02-02')).to.equal('2020-02-02')
    done()
  })
})
