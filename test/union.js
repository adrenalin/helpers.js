const { expect } = require('chai')
const { union } = require('../')

describe('lib/union', () => {
  it('should accept only arrays as arguments', () => {
    expect(() => union([1], 2)).to.throw()
    expect(() => union([1], [2]).not.to.throw())
  })

  it('should create a union of the values', () => {
    expect(union([1, 2], [2, 3])).to.eql([1, 2, 3])
    expect(union([1, 2, 3], [3, 5, 6], [3, 4, 7])).to.eql([1, 2, 3, 5, 6, 4, 7])
  })
})
