const { expect } = require('chai')
const { urlName } = require('../')

describe('lib/urlName', () => {
  it('should accept only a string', () => {
    expect(() => urlName('foo').not.to.throw())
    expect(() => urlName(1)).to.throw()
    expect(() => urlName(new Date())).to.throw()
    expect(() => urlName({ foo: 'bar' })).to.throw()
  })

  it('should not change lowercase ASCII-7 characters', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    expect(urlName(chars)).to.eql(chars)
  })

  it('should convert uppercase ASCII-7 characters to lowercase', () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    expect(urlName(chars)).to.eql('abcdefghijklmnopqrstuvwxyz0123456789')
  })

  it('should convert diacritics to base forms', () => {
    expect(urlName('èéêë')).to.eql('eeee')
    expect(urlName('ÈÉÊË')).to.eql('eeee')
    expect(urlName('ñ')).to.eql('n')
  })

  it('should convert spaces to underscore', () => {
    expect(urlName('A  B')).to.eql('a_b')
  })

  it('should replace all remaining characters excluding a-z, A-Z, 0-9, ., - and _', () => {
    expect(urlName('A  B&C!"D#0\'1.gif')).to.eql('a_b_c_d_0_1.gif')
  })

  it('should remove leading and trailing underscores', () => {
    expect(urlName('_abc_')).to.eql('abc')
  })
})
