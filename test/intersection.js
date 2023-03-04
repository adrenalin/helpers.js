const { expect } = require('chai')
const { intersection } = require('../')

describe('lib/intersection', () => {
  it('should require at least two input arrays', (done) => {
    expect(() => intersection([])).to.throw()
    expect(() => intersection([], []).not.to.throw())
    done()
  })

  it('should accept only array inputs', (done) => {
    expect(() => intersection([], []).not.to.throw())
    expect(() => intersection([], 'foo')).to.throw()
    expect(() => intersection([], 1)).to.throw()
    expect(() => intersection([], {})).to.throw()
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
