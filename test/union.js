const expect = require('expect.js')
const union = require('../lib/union')

describe('lib/union', () => {
  it('should accept only arrays as arguments', (done) => {
    expect(union).withArgs([1], 2).to.throwError()
    expect(union).withArgs([1], [2]).not.to.throwError()
    done()
  })

  it('should create a union of the values', (done) => {
    expect(union([1, 2], [2, 3])).to.eql([1, 2, 3])
    expect(union([1, 2, 3], [3, 5, 6], [3, 4, 7])).to.eql([1, 2, 3, 5, 6, 4, 7])
    done()
  })
})
