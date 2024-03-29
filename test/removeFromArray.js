const { expect } = require('chai')
const { removeFromArray } = require('../')

describe('lib/removeFromArray', () => {
  it('should reject other first arguments than an array', () => {
    expect(() => removeFromArray(1)).to.throw()
    expect(() => removeFromArray('1')).to.throw()
    expect(() => removeFromArray({})).to.throw()
    expect(() => removeFromArray(null)).to.throw()
    expect(() => removeFromArray([]).not.to.throw())
  })

  it('should not return the original array', () => {
    const source = []
    const result = removeFromArray(source)
    expect(source).not.to.equal(result)
  })

  it('should remove any given item from the source', () => {
    const referenceObject = {}
    const referenceArray = []

    const source = [
      null,
      true,
      false,
      1,
      '1',
      referenceArray,
      referenceObject
    ]

    expect(removeFromArray(source, null)).to.eql([true, false, 1, '1', referenceArray, referenceObject])
    expect(removeFromArray(source, true)).to.eql([null, false, 1, '1', referenceArray, referenceObject])
    expect(removeFromArray(source, false)).to.eql([null, true, 1, '1', referenceArray, referenceObject])
    expect(removeFromArray(source, 1)).to.eql([null, true, false, '1', referenceArray, referenceObject])
    expect(removeFromArray(source, '1')).to.eql([null, true, false, 1, referenceArray, referenceObject])
    expect(removeFromArray(source, referenceArray)).to.eql([null, true, false, 1, '1', referenceObject])
    expect(removeFromArray(source, referenceObject)).to.eql([null, true, false, 1, '1', referenceArray])
  })

  it('should remove multiple items from the source', () => {
    const referenceObject = {}
    const referenceArray = []

    const source = [
      null,
      true,
      false,
      1,
      '1',
      referenceArray,
      referenceObject
    ]

    expect(removeFromArray(source, null, true, false, 1, '1')).to.eql([referenceArray, referenceObject])
  })

  it('should remove the same item multiple times from the source', () => {
    const referenceObject = {}
    const referenceArray = []

    const source = [
      'foo',
      'foo',
      'bar',
      referenceArray,
      referenceArray,
      referenceObject
    ]

    expect(removeFromArray(source, 'foo')).to.eql(['bar', referenceArray, referenceArray, referenceObject])
    expect(removeFromArray(source, 'foo', 'bar', referenceArray)).to.eql([referenceObject])
  })
})
