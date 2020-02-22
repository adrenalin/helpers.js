const expect = require('expect.js')
const splitStringIntoChunks = require('../splitStringIntoChunks')

describe('splitStringIntoChunks', () => {
  it('should split right-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 3, ' ', false)).to.be('A BCD EFG HIJ')
    done()
  })

  it('should split left-hand side', (done) => {
    expect(splitStringIntoChunks('ABCDEFGHIJ', 2, 'x', true)).to.be('ABxCDxEFxGHxIJ')
    done()
  })
})
