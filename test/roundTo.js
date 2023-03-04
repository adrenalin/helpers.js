const { InvalidArgument } = require('@vapaaradikaali/errors')
const { expect } = require('chai')
const { roundTo } = require('../')

describe('lib/roundTo', () => {
  it('should accept only a numeric value as the first argument', () => {
    expect(() => roundTo('foo')).to.throw(InvalidArgument)
    expect(() => roundTo({})).to.throw(InvalidArgument)
    expect(() => roundTo('1')).not.to.throw()
    expect(() => roundTo(1)).not.to.throw()
  })

  it('should accept only an integer value as the second argument', () => {
    expect(() => roundTo(1, 'foo')).to.throw(InvalidArgument)
    expect(() => roundTo(1, 1.1)).to.throw(InvalidArgument)
    expect(() => roundTo(1, 0)).not.to.throw()
    expect(() => roundTo(1, 1)).not.to.throw()
    expect(() => roundTo(1, -1)).not.to.throw()
    expect(() => roundTo(1, '2')).not.to.throw()
  })

  it('should accept only "round", "floor" and "ceil" as the third optional argument', () => {
    expect(() => roundTo(1, 2, 'foo')).to.throw(InvalidArgument)
    expect(() => roundTo(1, 2, 'round')).not.to.throw()
    expect(() => roundTo(1, 2, 'floor')).not.to.throw()
    expect(() => roundTo(1, 2, 'ceil')).not.to.throw()
  })

  it('should round correctly', () => {
    // No precision
    expect(roundTo(1.23)).to.eql(1)

    // Precision defined
    expect(roundTo(1.23, 0)).to.eql(1)
    expect(roundTo(1.5, 0)).to.eql(2)
    expect(roundTo(1.2345, 2)).to.eql(1.23)
    expect(roundTo(123, -1)).to.eql(120)

    // Floor and ceil
    expect(roundTo(1.23, 0, 'ceil')).to.eql(2)
    expect(roundTo(1.83, 0, 'floor')).to.eql(1)
  })

  it('should accept "round", "floor" and "ceil" as the second argument and use 0 for precision', () => {
    expect(roundTo(1.2, 'ceil')).to.eql(2)
    expect(roundTo(1.8, 'floor')).to.eql(1)
  })
})
