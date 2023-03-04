const { expect } = require('chai')
const { isObject } = require('../')

class TestClass {
  constructor () {
    this.value = true
  }
}

describe('lib/isObject', () => {
  it('should return false for String', (done) => {
    expect(isObject('myString')).to.equal(false)
    done()
  })

  it('should return true for a plain Object', (done) => {
    expect(isObject({ param: 'value' })).to.equal(true)
    done()
  })

  it('should return false for Array', (done) => {
    expect(isObject(['a', 'b', 'c'])).to.equal(false)
    done()
  })

  it('should return false for Set', (done) => {
    expect(isObject(new Set([1, 2, 4]))).to.equal(false)
    done()
  })

  it('should return false for Date', (done) => {
    expect(isObject(new Date())).to.equal(false)
    done()
  })

  it('should return false for Undefined', (done) => {
    expect(isObject(undefined)).to.equal(false)
    done()
  })

  it('should return false for Null', (done) => {
    expect(isObject(null)).to.equal(false)
    done()
  })

  it('should return false for a class', (done) => {
    expect(isObject(TestClass)).to.equal(false)
    done()
  })

  it('should return false for a class instance', (done) => {
    const v = new TestClass()
    expect(isObject(v)).to.equal(false)
    done()
  })
})
