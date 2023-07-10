const { expect } = require('chai')
const { isObject } = require('../')

class TestClass {
  constructor () {
    this.value = true
  }
}

describe('lib/isObject', () => {
  it('should return false for String', () => {
    expect(isObject('myString')).to.equal(false)
  })

  it('should return true for a plain Object', () => {
    expect(isObject({ param: 'value' })).to.equal(true)
  })

  it('should return false for Array', () => {
    expect(isObject(['a', 'b', 'c'])).to.equal(false)
  })

  it('should return false for Set', () => {
    expect(isObject(new Set([1, 2, 4]))).to.equal(false)
  })

  it('should return false for Date', () => {
    expect(isObject(new Date())).to.equal(false)
  })

  it('should return false for Undefined', () => {
    expect(isObject(undefined)).to.equal(false)
  })

  it('should return false for Null', () => {
    expect(isObject(null)).to.equal(false)
  })

  it('should return false for a class', () => {
    expect(isObject(TestClass)).to.equal(false)
  })

  it('should return false for a class instance', () => {
    const v = new TestClass()
    expect(isObject(v)).to.equal(false)
  })
})
