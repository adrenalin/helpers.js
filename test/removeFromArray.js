const expect = require('expect.js')
const removeFromArray = require('../lib/removeFromArray')

describe('lib/removeFromArray', () => {
  it('should reject other first arguments than an array', (done) => {
    expect(removeFromArray).withArgs(1).to.throwError()
    expect(removeFromArray).withArgs('1').to.throwError()
    expect(removeFromArray).withArgs({}).to.throwError()
    expect(removeFromArray).withArgs(null).to.throwError()
    expect(removeFromArray).withArgs([]).not.to.throwError()
    done()
  })

  it('should not return the original array', (done) => {
    const source = []
    const result = removeFromArray(source)
    expect(source).not.to.be(result)
    done()
  })

  it('should remove any given item from the source', (done) => {
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
    done()
  })

  it('should remove multiple items from the source', (done) => {
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
    done()
  })

  it('should remove the same item multiple times from the source', (done) => {
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
    done()
  })
})
