const { expect } = require('chai')
const getRandomString = require('../lib/getRandomString')

describe('lib/getRandomString', () => {
  it('should have a different output every time', (done) => {
    expect(getRandomString()).not.to.equal(getRandomString())
    done()
  })

  it('should give by default 8 characters', (done) => {
    const rval = getRandomString()
    expect(rval.length).to.equal(8)
    done()
  })

  it('should respect the given length', (done) => {
    expect(() => getRandomString(0)).to.throw()
    expect(() => getRandomString('a')).to.throw()

    expect(getRandomString(4).length).to.equal(4)
    done()
  })

  it('should randomize from the given character set', (done) => {
    expect(getRandomString(4, '!"#¤%"')).to.match(/^[!"#¤%"]{4}$/)
    expect(getRandomString(4, 'abcdefg')).not.to.match(/^[!"#¤%"]{4}$/)
    done()
  })
})
