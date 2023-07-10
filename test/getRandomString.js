const { expect } = require('chai')
const { getRandomString } = require('../')

describe('lib/getRandomString', () => {
  it('should have a different output every time', () => {
    expect(getRandomString()).not.to.equal(getRandomString())
  })

  it('should give by default 8 characters', () => {
    const rval = getRandomString()
    expect(rval.length).to.equal(8)
  })

  it('should respect the given length', () => {
    expect(() => getRandomString(0)).to.throw()
    expect(() => getRandomString('a')).to.throw()

    expect(getRandomString(4).length).to.equal(4)
  })

  it('should randomize from the given character set', () => {
    expect(getRandomString(4, '!"#¤%"')).to.match(/^[!"#¤%"]{4}$/)
    expect(getRandomString(4, 'abcdefg')).not.to.match(/^[!"#¤%"]{4}$/)
  })
})
