const expect = require('expect.js')
const intersection = require('../lib/intersection')

describe('lib/intersection', () => {
  it('should require at least two input arrays', (done) => {
    expect(intersection).withArgs([]).to.throwError()
    expect(intersection).withArgs([], []).not.to.throwError()
    done()
  })

  it('should accept only array inputs', (done) => {
    expect(intersection).withArgs([], []).not.to.throwError()
    expect(intersection).withArgs([], 'foo').to.throwError()
    expect(intersection).withArgs([], 1).to.throwError()
    expect(intersection).withArgs([], {}).to.throwError()
    done()
  })

  it('should get the intersection for each input', (done) => {
    const referenceArray = []
    const referenceObject = {}

    const arr1 = [
      'foo',
      'bar',
      referenceArray,
      referenceObject
    ]

    const arr2 = [
      'bar',
      referenceObject
    ]

    const arr3 = [
      referenceArray,
      'bar'
    ]

    expect(intersection(arr1, arr2)).to.eql(['bar', referenceObject])
    expect(intersection(arr2, arr3)).to.eql(['bar'])
    expect(intersection(arr1, arr3)).to.eql(['bar', referenceArray])
    expect(intersection(arr3, arr2, arr1)).to.eql(['bar'])

    done()
  })
})
