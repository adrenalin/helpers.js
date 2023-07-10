const { expect } = require('chai')
const { unique } = require('../')

describe('lib/unique', () => {
  it('should accept only an array', () => {
    expect(() => unique('foo')).to.throw()
    expect(() => unique(1)).to.throw()
    expect(() => unique(new Date())).to.throw()
    expect(() => unique({ foo: 'bar' })).to.throw()
  })

  it('should return unique string values', () => {
    expect(unique(['foo', 'bar', 'foo', 'bar'])).to.eql(['foo', 'bar'])
  })

  it('should return referrable objects as they were', () => {
    const obj = {
      foo: 'bar'
    }

    const input = [
      'foo',
      'bar',
      obj,
      'foo',
      'bar',
      obj
    ]

    const res = unique(input)

    expect(res.length).to.equal(3)
    expect(res).to.eql(['foo', 'bar', obj])
  })

  it('should do a quick sort-of-equal check for objects', () => {
    const obj = {
      foo: 'bar'
    }

    const input = [
      'foo',
      'bar',
      obj,
      'foo',
      'bar',
      {
        foo: 'bar'
      }
    ]

    const res = unique(input)

    expect(res.length).to.equal(3)
    expect(res).to.eql(['foo', 'bar', obj])
  })

  it('should allow forcing by-reference check for objects', () => {
    const obj1 = {
      foo: 'bar'
    }

    const obj2 = JSON.parse(JSON.stringify(obj1))

    const input = [
      'foo',
      'bar',
      obj1,
      'foo',
      'bar',
      obj2
    ]

    const res = unique(input, true)

    expect(res.length).to.equal(4)
    expect(res).to.eql(['foo', 'bar', obj1, obj2])
  })
})
