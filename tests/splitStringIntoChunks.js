const expect = require('expect.js')
const splitStringIntoChunks = require('../lib/splitStringIntoChunks')

describe('splitStringIntoChunks', () => {
  it('should split right-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 3, ' ', false)).to.be('A BCD EFG HIJ')
    done()
  })

  it('should split left-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 2, 'x', true)).to.be('ABxCDxEFxGHxIJ')
    done()
  })

  it('should throw an error with invalid first argument', (done) => {
    expect(splitStringIntoChunks).withArgs({}).to.throwError()
    expect(splitStringIntoChunks).withArgs(new Date()).to.throwError()
    expect(splitStringIntoChunks).withArgs(123).to.throwError()
    done()
  })

  it('should throw an error with invalid second argument', (done) => {
    expect(splitStringIntoChunks).withArgs('foo', 'bar').to.throwError()
    expect(splitStringIntoChunks).withArgs('foo', {}).to.throwError()
    expect(splitStringIntoChunks).withArgs('foo', 1.2).to.throwError()
    expect(splitStringIntoChunks).withArgs('foo', 1).not.to.throwError()
    done()
  })
})
