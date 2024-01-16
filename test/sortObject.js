const { expect } = require('chai')
const { sortObject } = require('../')

describe('lib/sortObject', () => {
  it('should return scalars as they were inserted', () => {
    expect(sortObject('foo')).to.equal('foo')
    expect(sortObject(1)).to.equal(1)
  })

  it('should sort a shallow object', () => {
    const source = { foo: 'bar', bar: 'foo' }
    const sorted = sortObject(source)

    expect(Object.keys(sorted)).to.eql(['bar', 'foo'])
    expect(sorted).not.to.equal(source)
    expect(sorted).to.eql(source)
  })

  it('should sort a deep object', () => {
    const source = {
      foo: 'bar',
      bar: 'foo',
      foobar: {
        foo: 'bar',
        bar: 'foo'
      }
    }
    const sorted = sortObject(source)

    expect(Object.keys(sorted)).to.eql(['bar', 'foo', 'foobar'])
    expect(Object.keys(sorted.foobar)).to.eql(['bar', 'foo'])

    expect(sorted).not.to.equal(source)
    expect(sorted).to.eql(source)
  })

  it('should sort a scalar array', () => {
    const source = [4, 3, 2, 1]
    const sorted = sortObject(source)

    expect(sorted).to.eql([1, 2, 3, 4])
  })

  it('should sort an object inside an array', () => {
    const source = [{ foo2: 'bar', bar2: 'foo' }, { foo1: 'bar', bar1: 'foo' }]
    const sorted = sortObject(source)

    expect(sorted).to.eql([
      {
        bar2: 'foo',
        foo2: 'bar'
      },
      {
        bar1: 'foo',
        foo1: 'bar'
      }
    ])
  })
})
