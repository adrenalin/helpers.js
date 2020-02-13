const expect = require('expect.js')
const typecastString = require('../typecastString')

describe('typecastString', () => {
  it('should return the original value if not a string', (done) => {
    expect(typecastString(1)).to.be(1)
    expect(typecastString(true)).to.be(true)
    expect(typecastString(false)).to.be(false)
    expect(typecastString(null)).to.be(null)

    const obj = {}
    expect(typecastString(obj)).to.be(obj)

    const date = new Date()
    expect(typecastString(date)).to.be(date)

    done()
  })

  it('should return alphabetical string as it went', (done) => {
    expect(typecastString('myString')).to.be('myString')
    done()
  })

  it('should return typecasted boolean values', (done) => {
    expect(typecastString('true')).to.be(true)
    expect(typecastString('True')).to.be(true)
    expect(typecastString('TRUE')).to.be(true)

    expect(typecastString('false')).to.be(false)
    expect(typecastString('False')).to.be(false)
    expect(typecastString('FALSE')).to.be(false)

    done()
  })

  it('should return typecasted null values', (done) => {
    expect(typecastString('null')).to.be(null)
    expect(typecastString('Null')).to.be(null)
    expect(typecastString('NULL')).to.be(null)
    expect(typecastString('')).to.be(null)

    done()
  })

  it('should return various number formats', (done) => {
    expect(typecastString('1')).to.be(1)
    expect(typecastString('1.1')).to.be(1.1)
    expect(typecastString('1,1')).to.be(1.1)
    expect(typecastString('0.1')).to.be(0.1)
    expect(typecastString('0,1')).to.be(0.1)

    expect(typecastString('0')).to.be(0)

    expect(typecastString('-1')).to.be(-1)
    expect(typecastString('-1.1')).to.be(-1.1)
    expect(typecastString('-1,1')).to.be(-1.1)
    expect(typecastString('-.1')).to.be(-0.1)
    expect(typecastString('-,1')).to.be(-0.1)
    done()
  })
})
