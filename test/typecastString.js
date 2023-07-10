const { expect } = require('chai')
const { typecastString } = require('../')

describe('lib/typecastString', () => {
  it('should return the original value if not a string', () => {
    expect(typecastString(1)).to.equal(1)
    expect(typecastString(true)).to.equal(true)
    expect(typecastString(false)).to.equal(false)
    expect(typecastString(null)).to.equal(null)

    const obj = {}
    expect(typecastString(obj)).to.equal(obj)

    const date = new Date()
    expect(typecastString(date)).to.equal(date)
  })

  it('should return alphabetical string as it went', () => {
    expect(typecastString('myString')).to.equal('myString')
  })

  it('should return typecasted boolean values', () => {
    expect(typecastString('true')).to.equal(true)
    expect(typecastString('True')).to.equal(true)
    expect(typecastString('TRUE')).to.equal(true)

    expect(typecastString('false')).to.equal(false)
    expect(typecastString('False')).to.equal(false)
    expect(typecastString('FALSE')).to.equal(false)
  })

  it('should return typecasted null values', () => {
    expect(typecastString('null')).to.equal(null)
    expect(typecastString('Null')).to.equal(null)
    expect(typecastString('NULL')).to.equal(null)
    expect(typecastString('')).to.equal(null)
  })

  it('should return various number formats', () => {
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
  })

  it('should not typecast ISO dates', () => {
    expect(typecastString('2020-02-02')).to.equal('2020-02-02')
  })
})
