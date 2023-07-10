const { expect } = require('chai')
const { splitStringIntoChunks } = require('../')

describe('lib/splitStringIntoChunks', () => {
  it('should split right-hand side', () => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 3, ' ', false)).to.equal('A BCD EFG HIJ')
  })

  it('should split left-hand side', () => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 2, 'x', true)).to.equal('ABxCDxEFxGHxIJ')
  })

  it('should throw an error with invalid first argument', () => {
    expect(() => splitStringIntoChunks({})).to.throw()
    expect(() => splitStringIntoChunks(new Date())).to.throw()
    expect(() => splitStringIntoChunks(123)).to.throw()
  })

  it('should throw an error with invalid second argument', () => {
    expect(() => splitStringIntoChunks('foo', 'bar')).to.throw()
    expect(() => splitStringIntoChunks('foo', {})).to.throw()
    expect(() => splitStringIntoChunks('foo', 1.2)).to.throw()
    expect(() => splitStringIntoChunks('foo', 1).not.to.throw())
  })
})
