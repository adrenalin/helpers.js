const expect = require('expect.js')
const urlName = require('../lib/urlName')

describe('lib/urlName', () => {
  it('should accept only a string', (done) => {
    expect(urlName).withArgs('foo').not.to.throwError()
    expect(urlName).withArgs(1).to.throwError()
    expect(urlName).withArgs(new Date()).to.throwError()
    expect(urlName).withArgs({ foo: 'bar' }).to.throwError()
    done()
  })

  it('should not change lowercase ASCII-7 characters', (done) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    expect(urlName(chars)).to.eql(chars)
    done()
  })

  it('should convert uppercase ASCII-7 characters to lowercase', (done) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    expect(urlName(chars)).to.eql('abcdefghijklmnopqrstuvwxyz0123456789')
    done()
  })

  it('should convert diacritics to base forms', (done) => {
    expect(urlName('èéêë')).to.eql('eeee')
    expect(urlName('ÈÉÊË')).to.eql('eeee')
    expect(urlName('ñ')).to.eql('n')
    done()
  })

  it('should convert spaces to underscore', (done) => {
    expect(urlName('A  B')).to.eql('a_b')
    done()
  })

  it('should replace all remaining characters excluding a-z, A-Z, 0-9, ., - and _', (done) => {
    expect(urlName('A  B&C!"D#0\'1.gif')).to.eql('a_b_c_d_0_1.gif')
    done()
  })

  it('should remove leading and trailing underscores', (done) => {
    expect(urlName('_abc_')).to.eql('abc')
    done()
  })
})
