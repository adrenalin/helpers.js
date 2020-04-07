const expect = require('expect.js')
const copyObject = require('../lib/copyObject')

describe('copyObject', () => {
  it('should return primitive types as they are', (done) => {
    expect(copyObject(0)).to.be(0)
    expect(copyObject(null)).to.be(null)
    expect(copyObject(true)).to.be(true)
    expect(copyObject(undefined)).to.be(undefined)
    expect(copyObject('string')).to.be('string')

    done()
  })

  it('should create a shallow copy of the object', (done) => {
    const source = {
      foo: 'bar'
    }
    const target = copyObject(source)
    expect(target).not.to.be(source)
    expect(target).to.eql(source)
    done()
  })

  it('should create a deep copy of the object', (done) => {
    const source = {
      foo: {
        bar: true
      }
    }

    const target = copyObject(source)
    expect(target).not.to.be(source)
    expect(target.foo).not.to.be(source.foo)
    expect(target).to.eql(source)
    done()
  })

  it('should copy an array', (done) => {
    const source = [
      'foo',
      'bar'
    ]
    const target = copyObject(source)
    expect(target).not.to.be(source)
    expect(target).to.eql(source)
    done()
  })

  it('should recurse an array', (done) => {
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
    expect(target).not.to.be(source)
    expect(target).to.eql(source)

    expect(target[0]).not.to.be(source[0])
    expect(target[0]).to.eql(source[0])

    expect(target[1]).not.to.be(source[1])
    expect(target[1]).to.eql(source[1])

    expect(target[2]).not.to.be(source[2])
    expect(target[2]).to.eql(source[2])

    done()
  })

  it('should keep functions as they are', (done) => {
    const source = {
      callback: () => {
        return true
      }
    }
    const target = copyObject(source)
    expect(target).not.to.be(source)
    expect(target).to.eql(source)

    expect(target.callback()).to.be(true)

    done()
  })

  it('should copy dates', (done) => {
    const source = {
      date: new Date()
    }

    const target = copyObject(source)
    expect(target).not.to.be(source)
    expect(target).to.eql(source)
    expect(target.date).not.to.be(source.date)
    expect(target.date.getTime()).to.be(source.date.getTime())

    done()
  })
})
