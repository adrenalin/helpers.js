const expect = require('expect.js')
const normalizeValue = require('../lib/normalizeValue')

describe('lib/normalizeValue', () => {
  it('should be a function', (done) => {
    expect(normalizeValue).to.be.a('function')
    done()
  })

  it('should raise an exception when the first argument is not numeric', (done) => {
    expect(normalizeValue).withArgs().to.throwException()
    expect(normalizeValue).withArgs({}).to.throwException()
    expect(normalizeValue).withArgs('abcd').to.throwException()
    expect(normalizeValue).withArgs(123).not.to.throwException()
    expect(normalizeValue).withArgs('123').not.to.throwException()
    done()
  })

  it('should accept an array of numbers for the first argument', (done) => {
    expect(normalizeValue).withArgs([]).not.to.throwException()
    expect(normalizeValue).withArgs([123]).not.to.throwException()
    expect(normalizeValue).withArgs(['123']).not.to.throwException()
    expect(normalizeValue).withArgs(['abcd']).to.throwException()
    done()
  })

  it('should raise an exception when the second argument is not numeric', (done) => {
    expect(normalizeValue).withArgs(1, {}).to.throwException()
    expect(normalizeValue).withArgs(1, 'abcd').to.throwException()

    expect(normalizeValue).withArgs(1).not.to.throwException()
    expect(normalizeValue).withArgs(123, 123).not.to.throwException()
    expect(normalizeValue).withArgs('123', '123').not.to.throwException()
    done()
  })

  it('should raise an exception when the third argument is not numeric', (done) => {
    expect(normalizeValue).withArgs(1, null, {}).to.throwException()
    expect(normalizeValue).withArgs(1, null, 'abcd').to.throwException()

    expect(normalizeValue).withArgs(1, null).not.to.throwException()
    expect(normalizeValue).withArgs(123, null, 1).not.to.throwException()
    expect(normalizeValue).withArgs('123', null, '123').not.to.throwException()
    done()
  })

  it('should normalize a value to the given constraints', (done) => {
    // Within constraints test
    expect(normalizeValue(1, 0, 2)).to.eql(1)

    // Minimum clipping test
    expect(normalizeValue(-1, 0, 1)).to.eql(0)

    // Maximum clipping test
    expect(normalizeValue(2, 0, 1)).to.eql(1)

    // No minimum given test
    expect(normalizeValue(-1, null, 1)).to.eql(-1)

    // No maximum given test
    expect(normalizeValue(1, 0)).to.eql(1)
    done()
  })

  it('should accept an array of numbers and normalize all of them', (done) => {
    expect(normalizeValue([-1, 0, 1, 2], 0, 1)).to.eql([0, 0, 1, 1])
    done()
  })
})
