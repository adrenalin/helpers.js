const expect = require('expect.js')
const unique = require('../lib/unique')

describe('lib/unique', () => {
  it('should accept only an array', (done) => {
    expect(unique).withArgs('foo').to.throwError()
    expect(unique).withArgs(1).to.throwError()
    expect(unique).withArgs(new Date()).to.throwError()
    expect(unique).withArgs({ foo: 'bar' }).to.throwError()
    done()
  })

  it('should return unique string values', (done) => {
    expect(unique(['foo', 'bar', 'foo', 'bar'])).to.eql(['foo', 'bar'])
    done()
  })

  it('should return referrable objects as they were', (done) => {
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

    expect(res.length).to.be(3)
    expect(res).to.eql(['foo', 'bar', obj])
    done()
  })

  it('should do a quick sort-of-equal check for objects', (done) => {
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

    expect(res.length).to.be(3)
    expect(res).to.eql(['foo', 'bar', obj])
    done()
  })

  it('should allow forcing by-reference check for objects', (done) => {
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

    expect(res.length).to.be(4)
    expect(res).to.eql(['foo', 'bar', obj1, obj2])
    done()
  })
})
