const { expect } = require('chai')
const splitStringIntoChunks = require('../lib/splitStringIntoChunks')

describe('lib/splitStringIntoChunks', () => {
  it('should split right-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 3, ' ', false)).to.equal('A BCD EFG HIJ')
    done()
  })

  it('should split left-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 2, 'x', true)).to.equal('ABxCDxEFxGHxIJ')
    done()
  })

  it('should throw an error with invalid first argument', (done) => {
    expect(() => splitStringIntoChunks({})).to.throw()
    expect(() => splitStringIntoChunks(new Date())).to.throw()
    expect(() => splitStringIntoChunks(123)).to.throw()
    done()
  })

  it('should throw an error with invalid second argument', (done) => {
    expect(() => splitStringIntoChunks('foo', 'bar')).to.throw()
    expect(() => splitStringIntoChunks('foo', {})).to.throw()
    expect(() => splitStringIntoChunks('foo', 1.2)).to.throw()
    expect(() => splitStringIntoChunks('foo', 1).not.to.throw())
    done()
  })
})
