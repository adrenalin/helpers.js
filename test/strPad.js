const { expect } = require('chai')
const strPad = require('../lib/strPad')

describe('lib/strPad', () => {
  it('should pad string to the given length', (done) => {
    expect(strPad('foo', ' ', 5, true)).to.equal('  foo')
    expect(strPad('foo', ' ', 5, false)).to.equal('foo  ')
    done()
  })

  it('should force an empty filling for zero length fill', (done) => {
    expect(strPad('foo', '', 5, true)).to.equal('  foo')
    expect(strPad('foo', '', 5, false)).to.equal('foo  ')
    done()
  })

  it('should leave the input intact for zero length', (done) => {
    expect(strPad('foo', '', 0)).to.equal('foo')
    done()
  })

  it('should trim the output when padding exceeds the length', (done) => {
    expect(strPad('foo', '1234567', 4, true)).to.equal('7foo')
    expect(strPad('foo', '1234567', 4, false)).to.equal('foo1')
    done()
  })
})
