const expect = require('expect.js')
const strPad = require('../lib/strPad')

describe('lib/strPad', () => {
  it('should pad string to the given length', (done) => {
    expect(strPad('foo', ' ', 5, true)).to.be('  foo')
    expect(strPad('foo', ' ', 5, false)).to.be('foo  ')
    done()
  })

  it('should force an empty filling for zero length fill', (done) => {
    expect(strPad('foo', '', 5, true)).to.be('  foo')
    expect(strPad('foo', '', 5, false)).to.be('foo  ')
    done()
  })

  it('should leave the input intact for zero length', (done) => {
    expect(strPad('foo', '', 0)).to.be('foo')
    done()
  })

  it('should trim the output when padding exceeds the length', (done) => {
    expect(strPad('foo', '1234567', 4, true)).to.be('7foo')
    expect(strPad('foo', '1234567', 4, false)).to.be('foo1')
    done()
  })
})
