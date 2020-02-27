const expect = require('expect.js')
const getRandomString = require('../lib/getRandomString')

describe('getRandomString', () => {
  it('should have a different output every time', (done) => {
    expect(getRandomString()).not.to.be(getRandomString())
    done()
  })

  it('should give by default 8 characters', (done) => {
    const rval = getRandomString()
    expect(rval.length).to.be(8)
    done()
  })

  it('should respect the given length', (done) => {
    expect(getRandomString).withArgs(0).to.throwError()
    expect(getRandomString).withArgs('a').to.throwError()

    expect(getRandomString(4).length).to.be(4)
    done()
  })

  it('should randomize from the given character set', (done) => {
    expect(getRandomString(4, '!"#¤%"')).to.match(/^[!"#¤%"]{4}$/)
    expect(getRandomString(4, 'abcdefg')).not.to.match(/^[!"#¤%"]{4}$/)
    done()
  })
})
