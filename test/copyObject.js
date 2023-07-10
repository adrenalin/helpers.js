const { expect } = require('chai')
const { copyObject } = require('../')

describe('lib/copyObject', () => {
  it('should return primitive types as they are', () => {
    expect(copyObject(0)).to.equal(0)
    expect(copyObject(null)).to.equal(null)
    expect(copyObject(true)).to.equal(true)
    expect(copyObject(undefined)).to.equal(undefined)
    expect(copyObject('string')).to.equal('string')
  })

  it('should create a shallow copy of the object', () => {
    const source = {
      foo: 'bar'
    }
    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target).to.eql(source)
  })

  it('should create a deep copy of the object', () => {
    const source = {
      foo: {
        bar: true
      }
    }

    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target.foo).not.to.equal(source.foo)
    expect(target).to.eql(source)
  })

  it('should copy an array', () => {
    const source = [
      'foo',
      'bar'
    ]
    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target).to.eql(source)
  })

  it('should recurse an array', () => {
    const source = [
      {
        foo: 'bar'
      },
      {
        bar: ['foo', 'bar']
      },
      [
        'foo',
        'bar'
      ],
      'foo',
      'bar'
    ]

    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target).to.eql(source)

    expect(target[0]).not.to.equal(source[0])
    expect(target[0]).to.eql(source[0])

    expect(target[1]).not.to.equal(source[1])
    expect(target[1]).to.eql(source[1])

    expect(target[2]).not.to.equal(source[2])
    expect(target[2]).to.eql(source[2])
  })

  it('should keep functions as they are', () => {
    const source = {
      callback: () => {
        return true
      }
    }
    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target).to.eql(source)

    expect(target.callback()).to.equal(true)
  })

  it('should copy dates', () => {
    const source = {
      date: new Date()
    }

    const target = copyObject(source)
    expect(target).not.to.equal(source)
    expect(target).to.eql(source)
    expect(target.date).not.to.equal(source.date)
    expect(target.date.getTime()).to.equal(source.date.getTime())
  })
})
