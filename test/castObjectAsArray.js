const { expect } = require('chai')
const castObjectAsArray = require('../lib/castObjectAsArray')

describe('lib/castObjectAsArray', () => {
  it('should throw an error when casting others than plain objects', () => {
    expect(() => castObjectAsArray(1)).to.throw()
    expect(() => castObjectAsArray(true)).to.throw()
    expect(() => castObjectAsArray(null)).to.throw()
    expect(() => castObjectAsArray([])).to.throw()
    expect(() => castObjectAsArray('null')).to.throw()
    expect(() => castObjectAsArray({}).not.to.throw())
  })

  it('should return a flat array', () => {
    expect(castObjectAsArray({ 0: 'a', 1: 'b', 2: 'c' })).to.eql(['a', 'b', 'c'])
    expect(castObjectAsArray({ 1: 'a', 2: 'b', 3: 'c' })).to.eql(['a', 'b', 'c'])
  })

  it('should throw an error with string keys', () => {
    expect(() => castObjectAsArray({ foo: 'bar' })).to.throw()
  })

  it('should throw an error with intermittent keys', () => {
    expect(() => castObjectAsArray({ 0: 'a', 2: 'b' })).to.throw()
  })

  it('should throw an error when starting from an integer higher than 1', () => {
    expect(() => castObjectAsArray({ 2: 'a', 3: 'b' })).to.throw()
  })

  it('should not recurse without the flag', () => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        1: 'bar'
      }
    }

    const values = castObjectAsArray(obj)
    expect(values[0]).to.equal(obj[0])
    expect(values[1]).to.equal(obj[1])
  })

  it('should recurse with the flag', () => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        1: 'bar'
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values[0]).not.to.equal(obj[0])
    expect(values[0]).to.eql(['foo', 'bar'])

    expect(values[1]).not.to.equal(obj[1])
    expect(values[1]).to.eql(['foo', 'bar'])
  })

  it('should recurse with the flag, but keep if cannot recurse', () => {
    const obj = {
      0: {
        0: 'foo',
        1: 'bar'
      },
      1: {
        0: 'foo',
        2: 'bar'
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values[0]).to.eql(['foo', 'bar'])

    expect(values[1]).to.eql(obj[1])
    expect(values[1]).not.to.eql(['foo', 'bar'])
  })

  it('should recurse children even if parents are not sequential', () => {
    const obj = {
      foo: {
        0: 'foo',
        1: 'bar'
      },
      bar: {
        0: 'bar',
        key: {
          0: 'foo',
          1: 'bar'
        }
      }
    }

    const values = castObjectAsArray(obj, true)
    expect(values.foo).not.to.equal(obj.foo)
    expect(values.foo).to.eql(['foo', 'bar'])

    expect(values.bar).not.to.equal(obj.bar)
    expect(values.bar.key).to.eql(['foo', 'bar'])
  })

  it('should fail to convert a mixed object', () => {
    expect(() => castObjectAsArray({ 0: 'foo', 1: 'bar', foo: 'bar' })).to.throw()
  })

  it('should return an empty array for an empty object', () => {
    expect(castObjectAsArray({})).to.eql([])
  })
})
